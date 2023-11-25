import express from "express";
const router = express.Router();
import Auth from "../middleware/auth.js";
import { followUser, unfollowUser, updateProfilePic, searchUsers, listUsers, getUserPosts, getUserProfile }from "../controllers/userController.js";

router.get("/users",listUsers);
router.get("/getuserposts", getUserPosts);
router.put("/follow", Auth, followUser);
router.put("/unfollow", Auth, unfollowUser);
router.put("/updatepic", Auth, updateProfilePic);
router.post("/searchUsers", Auth, searchUsers);
router.get("/profile", Auth, getUserProfile);

export default router;