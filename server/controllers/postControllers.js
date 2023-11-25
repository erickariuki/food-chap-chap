import Post from "../model/postModel.js";
import User from '../model/User.model.js'
import multer from 'multer';
import querystring from "querystring";



export async function getAllPosts(req, res, next) {
  try {
    const posts = await Post.find()
      .populate("postedBy", "_id name")
      .populate("comments.postedBy", "_id name")
      .sort("-createdAt");
    res.json(posts);
  } catch (error) {
    next(error);
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

export async function createPost(req, res, next) {
  const { title, body, pic } = req.body;
 
  req.body.postedBy = req.user._id;
 
  try {
    const post = await Post.create({
      title,
      body, // Change 'text' to 'body' to match your schema
      pic,  // Add 'pic' field to match your schema
      postedBy: req.body.postedBy
    });
    res.json({ post });
  } catch (error) {
    next(error, 'you cant');
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
  const postId = req.params.postId;

  try {
    // Check if the user is authenticated using Passport session
    if (!req.isAuthenticated()) {
      return res.status(403).json({ error: 'Access denied. User not authenticated.' });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.likes.includes(req.user._id)) {
      return res.status(400).json({ error: 'You have already liked this post' });
    }

    post.likes.push(req.user._id);
    await post.save();
    res.status(200).json({ message: 'Post liked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


export async function unlikePost(req, res) {
  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (!post.likes.includes(req.user._id)) {
      return res.status(400).json({ error: 'You have not liked this post yet' });
    }

    post.likes = post.likes.filter(userId => userId.toString() !== req.user._id.toString());
    await post.save();
    res.status(200).json({ message: 'Post unliked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function commentOnPost(req, res) {
  const { postId, text } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const comment = {
      text,
      postedBy: req.user._id,
      userProfilePic: req.user.profilePicture, // Assuming 'profilePicture' is the field in your User model for the user's profile picture
      username: req.user.username,
    };

    post.comments.push(comment);
    await post.save();
    
    // Populate the user information in the comments
    await post.populate('comments.postedBy', '_id username').execPopulate();

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function commentOnComment(req, res) {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  const { text } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const comment = post.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    const newComment = {
      text,
      postedBy: req.user._id,
      likes: [], // Initialize likes array for the new comment
    };

    comment.comments.push(newComment);
    await post.save();

    // Populate the user information in the comments
    await post
      .populate('comments.postedBy', '_id username') // Assuming 'postedBy' is the field in your comment schema for the user reference
      .execPopulate();

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function sharePost(req, res) {
  const postId = req.params.postId;
  const { platform } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const postUrl = `http://localhost:3000/post/${postId}`; // Replace with your actual frontend URL

    let shareUrl;
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/share?url=${encodeURIComponent(postUrl)}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(postUrl)}`;
        break;
      // Add more cases for other social media platforms if needed
      default:
        return res.status(400).json({ error: 'Invalid platform' });
    }

    res.status(200).json({ shareUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

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

export async function getDrafts(req, res) {
  try {
    const drafts = await Post.find({ postedBy: req.user._id, isDraft: true })
      .populate("postedBy", "_id name")
      .populate("comments.postedBy", "_id name")
      .sort("-createdAt");

    res.status(200).json(drafts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}