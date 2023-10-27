import User from "../model/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ENV from "../config.js";


//Register a new user
export async function registerUser (req, res) {
  try {
    const { name, username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const hasPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      username,
      email,
      password: hasPassword,
      profilePic: "",
      followers: [],
      following: [],
    });

    await newUser.save();

    const token = jwt.sign({userId: newUser._id},
      ENV.JWT_SECRET);
      res.status(200).json({ message: "User registered successfully", token  });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
  }
}

//Login registered user
export async function loginUser(req, res){
  try {
    const {email, password} = req.body;

    //Find user by email
    const user = await User.findOne({email});
    if(!user) {
      return res.status(404).json({error: "User not found"});
    }

    //Compare provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if(!passwordMatch) {
      return res.status(401).json({error: "Invalid credentials"});
    }

    //create a token for user authentication
    const token = jwt.sign({userId: user._id}, ENV.JWT_SECRET);

    res.status(200).json({message: "User logged in successfully", token});

  } catch (error){
    console.error(error);
    res.status(500).json({error: "Internal Server Error"});
  }
}

//Update profile pic
export async function updateProfilePic(req, res){
  try {
    const { profilePic } = req.body;
    const userId = req.user.userId;


    const user = await User.findByIdAndUpdate(userId, {profilePic}, { new: true});
    if(!user){
      return res.status(404).json({error: "User not found"});
    }

    res.status(200).json({message: "Profile picture updated successfully", data: user});
  } catch (error){
    console.error(error);
    res.status(500).json({error: "Internal Server Error"});
  }
}

//Follow another user
export async function followUser(req, res){
  try {
    const followId = req.body.followId;
    const userId = req.user.userId; //when userId is not stored in the token

    //update user's following list
    const user = await User.findByIdAndUpdate(userId, {$push: {following: folowId}}, {new: true});

    if(!user){
      return res.status(404).json({error: "User not found"});
    }

    //update the follower's list
    await User.findByIdAndUpdate(followId, {$push: {following: userId}}, {new: true});

    res.status(200).json({ message: "User followed", data: user})
  } catch(error){
    console.error(error);
    res.status(500).json({error: "Internal Server Error"});
  }
}

//unfollow another user
export async function unfollowUser(req, res){
  try {
    const unfollowId = req.body.unfollowId;
    const userId = req.user.userId; //when userId is not stored in the token
    
    //Remove the user from the followers list
    await User.findByIdAndUpdate(unfollowId, { $pull: { followers: userId} }, {new: true});

    //remove unfollowed user from users following list
    const user = await User.findByIdAndUpdate(userId, {$pull: {following: unfollowId}}, {new: true});

    if(!user){
      return res.status(404).json({error: "User not found"});
    }

    res.status(200).json({ message: "User unfollowed", data: user})

  } catch(error){
    console.error(error);
    res.status(500).json({error: "Internal Server Error"});
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





