import Post from "../model/postModel.js";
import multer from 'multer';

// Set storage engine
const storage = multer.diskStorage({
    destination: './uploads/',  // Set the destination folder for uploaded files
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
  
  // Initialize multer middleware
  const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },  // Limit file size to 5MB (adjust as needed)
});
export async function getAllPosts(req, res) {
    try {
        const posts = await Post.find()
            .populate("postedBy", "_id name")
            .populate("comments.postedBy", "_id name")
            .sort("-createdAt");
        res.json({ posts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function getSubscribedPosts(req, res) {
    try {
        const posts = await Post.find({ postedBy: { $in: req.user.following } })
            .populate("postedBy", "_id name")
            .populate("comments.postedBy", "_id name")
            .sort("-createdAt");
        res.json({ posts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function createPost(req, res) {
    const { title, body } = req.body;
  
    // Check if an image file is uploaded
    if (!req.file) {
      return res.status(422).json({ error: "Please upload an image" });
    }
  
    // Set the postedBy field based on the authenticated user
    req.body.postedBy = req.user._id;
  
    try {
      const post = await Post.create({
        title,
        text: body,
        image: req.file.path,  // Save the file path in the database
        postedBy: req.body.postedBy
      });
      res.json({ post });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function getMyPosts(req, res) {
    try {
        const mypost = await Post.find({ postedBy: req.user._id })
            .populate("postedBy", "_id name");
        res.json({ mypost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function likePost(req, res) {
    try {
        const result = await Post.findByIdAndUpdate(
            req.body.postId,
            { $push: { likes: req.user._id } },
            { new: true }
        );
        res.status(200).json({ result: "Liked Successfully" });
    } catch (error) {
        console.error(error);
        res.status(422).json({ error: "Invalid request" });
    }
}

export async function unlikePost(req, res) {
    try {
        const result = await Post.findByIdAndUpdate(
            req.body.postId,
            { $pull: { likes: req.user._id } },
            { new: true }
        );
        res.status(200).json({ result: "Unliked Successfully" });
    } catch (error) {
        console.error(error);
        res.status(422).json({ error: "Invalid request" });
    }
}

export async function commentOnPost(req, res) {
    // Extract relevant data from the request body
    const { postId, text } = req.body;
  
    // Validate the post ID
    const existingPost = await Post.findById(postId);
    if (!existingPost) {
      return res.status(404).json({ error: "Post not found" });
    }
  
    // Create a new comment object with user information
    const comment = {
      userId: req.user._id,
      text: text,
      userProfilePic: req.user.pic,
      username: req.user.username,
    };
  
    try {
      // Update the post with the new comment
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { $push: { replies: comment } },
        { new: true } // Returns the modified document
      )
        .populate("replies.userId", "_id username") // Populate the user information in replies
        .populate("postedBy", "_id username");
  
      // Return the updated post with populated comments and user information
      res.json(updatedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }


  export async function deletePost(req, res) {
    try {
        const postId = req.params.postId;
        const post = await Post.findOne({ _id: postId }).populate("postedBy", "_id");

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        // Ensure the post has a valid 'postedBy' field before comparing IDs
        if (!post.postedBy || !post.postedBy._id) {
            return res.status(500).json({ error: "Invalid post data" });
        }

        // Check if the current user is the creator of the post
        if (post.postedBy._id.toString() === req.user._id.toString()) {
            await post.remove();
            return res.status(200).json({ message: "Post deleted successfully" });
        } else {
            return res.status(401).json({ error: "Unauthorized request" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


  