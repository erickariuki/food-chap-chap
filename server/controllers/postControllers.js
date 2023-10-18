import User from '../model/User.model.js'
import Post from '../model/postModel.js'

const createPost = async (req, res) => {
    try {
        let { text, image } = req.body;
        let postedBy = req.user.id; // Assuming req.user.id contains the ID of the authenticated user

        let newPost = new Post({
            postedBy,
            text,
            image
        });

        const post = await newPost.save();
        res.status(200).json(post);
    } catch (error) {
        console.error(error); // Log the error to the console for debugging
        return res.status(500).json("Internal error occurred");
    }
};

const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params._id)

        if(!post){
            return res.status(404).json ({ message: "Post not found "});
        }

        res.status(200).json({ post });
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};


const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params._id);
        if (!post){
            return res.status(404).json ({ message: "Post not found "});
        }

        if(post.postedBy.toString()!== req.user._id.toString()) {
            return res.status(401).json({ error: "Unauthorized to delete post"});
        }

        await Post.findByIdAndDelete(req.params._id);
         res.status(200).json({ message: "Post deleted successully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 

const likeUnlikePost = async (req, res) => {
    try {
        const {id:postId} = req.params;
        const userId = req.user._id;

        const post = await Post.findById(postId);

        if(!post) {
            return res.status(404).json ({ message: "Post not found "});
        }

        const userLikedPost = post.likes.includes(userId);
        if(userLikedPost) {
            //unlike post
            await Post.updateOne({_id:postId}, {$pull: {likes: userId}});
            res.status(200).json({ message: "Post unliked successfully" });
        } else {
            // like post
            post.likes.push(userId);
            await post.save();
            res.status(200).json({ message: "Post liked successfully"});
        }
    } catch (error) {
        res.status(500).json({ error: err.message });  
    }
    
}

const replyToPost = async (req, res) => {
    try {
        const {text} = req.body;
        const postId = req.params._id;
        const userProfilePic = req.user.userProfilePic
        const username = req.user.username

        if(!text) {
            return res.status(400).json({ message: "Text field is required"});
        }

        const post = await Post.findById(postId);
        if(!post) {
            return res.status(400).json({ message: "Post not found"});
        }

        const reply = {userId, text, userProfilePic, username}

        post.replies.push(reply);
        await post.save();

        res.status(200).json({ message: "Reply sent successfully", post });
    } catch (error) {
        res.status(500).json({message: error.messsage});
    }
}

const getFeedPosts = async (req,res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json ({ message: "User not found "});
        }

        const following = user.following;

		const feedPosts = await Post.find({ postedBy: { $in: following } }).sort({ createdAt: -1 });

		res.status(200).json(feedPosts);
    } catch (error) {
       res.staus(500).json({ message: error.message }); 
    }
}

const getUserPosts = async (req, res) => {
    const {username} = req.params;
    try {
        const user = await User.findOne({ username });
        if(!user) {
            return res.status(404).json({ error: 'User not found'});
        }

        const posts = await Post.find({ postedBy: user._id}).sort({ createdAt: -1 });

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export { createPost, getPost, deletePost, likeUnlikePost, getFeedPosts};