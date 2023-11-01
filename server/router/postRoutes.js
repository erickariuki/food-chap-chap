import express from "express";
const router = express.Router();
import Auth from "../middleware/auth.js";
import { getAllPosts, Timeline, getSubscribedPosts, createPost, getUserProfile,getMyPosts, likePost, unlikePost, commentOnPost, deletePost } from "../controllers/postControllers.js";
// import { upload } from '../middleware/upload.js';


router.get("/",  getAllPosts);
router.get("/getsubpost", Auth, getSubscribedPosts);
router.post('/createpost', Auth,  createPost);
router.get("/mypost", Auth, getMyPosts);
router.put("/like", Auth, likePost);
router.put("/unlike", Auth, unlikePost);
router.put("/comment", Auth, commentOnPost);
router.delete("/deletepost/:id", Auth, deletePost);
router.get("/timeline/:userId", Timeline)
router.get("/UserProfile/:username", getUserProfile)


export default router;
