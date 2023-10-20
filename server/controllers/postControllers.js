import Post from "../model/postModel.js";

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
    const { title, body, pic } = req.body;
    if (!title || !body || !pic) {
        return res.status(422).json({ error: "Please add all the fields" });
    }

    // Set the postedBy field based on the authenticated user
    req.body.postedBy = req.user._id;

    try {
        const post = await Post.create({
            title,
            text: body,
            image: pic,
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
        res.json(result);
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
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(422).json({ error: "Invalid request" });
    }
}

export async function commentOnPost(req, res) {
    const comment = {
        userId: req.user._id,
        text: req.body.text,
        userProfilePic: req.user.profilePic,
        username: req.user.username
    };
    try {
        const result = await Post.findByIdAndUpdate(
            req.body.postId,
            { $push: { replies: comment } },
            { new: true }
        )
            .populate("comments.postedBy", "_id name")
            .populate("postedBy", "_id name");
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(422).json({ error: "Invalid request" });
    }
}

export async function deletePost(req, res) {
    try {
        const post = await Post.findOne({ _id: req.params.postId })
            .populate("postedBy", "_id");
        if (!post) {
            return res.status(422).json({ error: "Post not found" });
        }
        if (post.postedBy._id.toString() === req.user._id.toString()) {
            await post.remove();
            res.json(post);
        } else {
            res.status(401).json({ error: "Unauthorized request" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}