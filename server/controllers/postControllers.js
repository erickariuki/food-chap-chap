import Post from "../model/postModel.js";

export async function getAllPosts (req, res) {
    Post.find()
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        .sort("-createdAt")
        .then(posts => {
            res.json({ posts });
        })
        .catch(err => {
            console.log(err);
        });
};

export async function getSubscribedPosts (req, res) {
    Post.find({ postedBy: { $in: req.user.following } })
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        .sort("-createdAt")
        .then(posts => {
            res.json({ posts });
        })
        .catch(err => {
            console.log(err);
        });
};
export async function createPost (req, res) {
    const { title, body, pic } = req.body;
    if (!title || !body || !pic) {
        return res.status(422).json({ error: "Please add all the fields" });
    }

    // Set the postedBy field based on the authenticated user
    req.body.postedBy = req.user._id;

    const post = new Post({
        title,
        text: body,
        image: pic,
        postedBy: req.body.postedBy
    });

    post.save()
        .then(result => {
            res.json({ post: result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        });
};


export async function getMyPosts (req, res) {
    Post.find({ postedBy: req.user._id })
        .populate("postedBy", "_id name")
        .then(mypost => {
            res.json({ mypost });
        })
        .catch(err => {
            console.log(err);
        });
};

export async function likePost (req, res) {
    Post.findByIdAndUpdate(req.body.postId, {
        $push: { likes: req.user._id }
    }, {
        new: true
    }).exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: err });
        } else {
            res.json(result);
        }
    });
};

export async function unlikePost (req, res) {
    Post.findByIdAndUpdate(req.body.postId, {
        $pull: { likes: req.user._id }
    }, {
        new: true
    }).exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: err });
        } else {
            res.json(result);
        }
    });
};

export async function commentOnPost (req, res) {
    const comment = {
        userId: req.user._id,
        text: req.body.text,
        userProfilePic: req.user.profilePic,
        username: req.user.username
    };
    Post.findByIdAndUpdate(req.body.postId, {
        $push: { replies: comment }
    }, {
        new: true
    })
        .populate("comments.postedBy", "_id name")
        .populate("postedBy", "_id name")
        .exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err });
            } else {
                res.json(result);
            }
        });
};

export async function deletePost (req, res) {
    Post.findOne({ _id: req.params.postId })
        .populate("postedBy", "_id")
        .exec((err, post) => {
            if (err || !post) {
                return res.status(422).json({ error: err });
            }
            if (post.postedBy._id.toString() === req.user._id.toString()) {
                post.remove()
                    .then(result => {
                        res.json(result);
                    }).catch(err => {
                        console.log(err);
                    });
            }
        });
};
