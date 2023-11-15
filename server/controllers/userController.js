import User from "../model/User.model.js";
// import Post from "../model/postModel.js";
import mongoose from "mongoose";


// List all users
export async function listUsers(req, res) {
  try {
    const users = await User.find({}, "username, email"); // You can select the fields you want to include

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Get user by ID
export async function getUser(req, res) {
  try {
    const { username } = req.params;

    // Find the user in the database
    const user = await UserModel.findOne({ username: username });

    // Check if user exists
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    // Remove sensitive information from user
    const { password, sensitiveInfo, ...rest } = user.toJSON();

    return res.status(200).send(rest);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send({ error: "An error occurred" });
  }
}

export async function getFriends(req, res) {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => User.findById(friendId))
    );
    const friendList = friends.map(({ _id, username, profilePicture }) => ({
      _id,
      username,
      profilePicture,
    }));
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Update profile pic
export async function updateProfilePic(req, res) {
  try {
    const { profilePic } = req.body;
    const userId = req.user.userId;


    const user = await User.findByIdAndUpdate(userId, { profilePic }, { new: true });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Profile picture updated successfully", data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

//Follow another user
export async function followUser(req, res) {
  try {
    const followId = req.body.followId;
    const userId = req.user.userId; //when userId is not stored in the token

    //update user's following list
    const user = await User.findByIdAndUpdate(userId, { $push: { following: followId } }, { new: true });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    //update the follower's list
    await User.findByIdAndUpdate(followId, { $push: { following: userId } }, { new: true });

    res.status(200).json({ message: "User followed", data: user })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

//unfollow another user
export async function unfollowUser(req, res) {
  try {
    const unfollowId = req.body.unfollowId;
    const userId = req.user.userId; //when userId is not stored in the token

    //Remove the user from the followers list
    await User.findByIdAndUpdate(unfollowId, { $pull: { followers: userId } }, { new: true });

    //remove unfollowed user from users following list
    const user = await User.findByIdAndUpdate(userId, { $pull: { following: unfollowId } }, { new: true });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User unfollowed", data: user })

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

//search user
export async function searchUsers(req, res) {
  try {
    const { query } = req.body;

    // Create a regular expression pattern to search for usernames
    const userPattern = new RegExp("^" + query);

    // Find users whose usernames match the pattern
    const users = await User.find({ username: { $regex: userPattern } })
      .select("_id username");

    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

