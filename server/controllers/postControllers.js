import Post from "../model/postModel.js";
import User from '../model/User.model.js'
import multer from 'multer';

// // Check File Type
// function checkFileType(file, cb){
//     // Allowed ext
//     const filetypes = /jpeg|jpg|png|gif/;
//     // Check ext
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     // Check mime
//     const mimetype = filetypes.test(file.mimetype);

//     if(mimetype && extname){
//       return cb(null,true);
//     } else {
//       cb('Error: Images Only!');
//     }
// }

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
  // if (!req.file) {
  //   return res.status(422).json({ error: "Please upload an image" });
  // }

  // Set the postedBy field based on the authenticated user
  req.body.postedBy = req.user._id;

  try {
    const post = await Post.create({
      title,
      text: body,
      // image: req.file.path,  // Save the file path in the database
      postedBy: req.body.postedBy
    });
    res.json({ post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function updatePost(req, res) {
  const { title, body } = req.body;

  // Check if an image file is uploaded
  // if (!req.file) {
  //   return res.status(422).json({ error: "Please upload an image" });
  // }

  // Set the postedBy field based on the authenticated user
  req.body.postedBy = req.user._id;

  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title,
        text: body,
        // image: req.file ? req.file.path : post.image,  // Update the file path in the database if a new file is uploaded
        postedBy: req.body.postedBy
      },
      { new: true }
    );
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

  // Validate the postId
  if (!postId) {
    return res.status(400).json({ error: 'Invalid postId' });
  }

  try {
    // Validate the post ID
    const existingPost = await Post.findById(postId);
    if (!existingPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Create a new comment object with user information
    const comment = {
      text: text,
      postedBy: req.user._id,
      userProfilePic: req.user.profilePicture, // Assuming 'profilePicture' is the field in your User model for the user's profile picture
      username: req.user.username,
    };

    // Add the comment to the post's comments array
    existingPost.comments.push(comment);
    await existingPost.save();

    // Populate the user information in the comments
    await existingPost
      .populate('comments.postedBy', '_id username') // Assuming 'postedBy' is the field in your comment schema for the user reference
      .execPopulate();

    // Return the updated post with populated comments and user information
    res.json(existingPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

//   export async function deletePost(req, res) {
//     try {
//         const postId = req.params.postId;
//         const post = await Post.findOne({ _id: postId }).populate("postedBy", "_id");

//         if (!post) {
//             return res.status(404).json({ error: "Post not found" });
//         }

//         // Ensure the post has a valid 'postedBy' field before comparing IDs
//         if (!post.postedBy || !post.postedBy._id) {
//             return res.status(500).json({ error: "Invalid post data" });
//         }

//         // Check if the current user is the creator of the post
//         if (post.postedBy._id.toString() === req.user._id.toString()) {
//             await post.remove();
//             return res.status(200).json({ message: "Post deleted successfully" });
//         } else {
//             return res.status(401).json({ error: "Unauthorized request" });
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: "Internal Server Error" });
//     }
// }

export async function Timeline(req, res) {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ postedBy: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ postedBy: friendId });
      })
    );
    const timelinePosts = userPosts.concat(...friendPosts);
    res.status(200).json(timelinePosts);
  } catch (err) {
    res.status(500).json(err);
  }
};

export async function getUserProfile(req, res) {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      res.status(404).json("User not found");
      return;
    }
    const posts = await Post.find({ postedBy: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

export async function deletePost(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json("Post not found");
      return;
    }
    if (String(post.postedBy) === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("The post has been deleted");
    } else {
      res.status(403).json("You can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

