import express from "express";
const router = express.Router();
import Auth from "../middleware/auth.js";
import { getAllPosts, getSubscribedPosts, createPost, getMyPosts, likePost, unlikePost, commentOnPost, deletePost } from "../controllers/postControllers.js";

router.get("/allpost", Auth, getAllPosts);
router.get("/getsubpost", Auth, getSubscribedPosts);
router.post("/createpost", Auth, createPost);
router.get("/mypost", Auth, getMyPosts);
router.put("/like", Auth, likePost);
router.put("/unlike", Auth, unlikePost);
router.put("/comment", Auth, commentOnPost);
router.delete("/deletepost/:postId", Auth, deletePost);

export default router;
