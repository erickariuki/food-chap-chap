import express from "express";
const router = express.Router();
import Auth from "../middleware/auth.js";
import {
  getAllPosts,
  getSubscribedPosts,
  createPost,
  updatePost,
  getMyPosts,
  likePost,
  unlikePost,
  commentOnPost,
  sharePost,
  Timeline,
  getUserProfile,
  deletePost
} from "../controllers/postControllers.js";

router.get("/", getAllPosts);
router.get("/getsubpost", Auth, getSubscribedPosts);
router.post('/createpost', Auth, createPost);
router.put('/updatepost/:id', Auth, updatePost);
router.get("/mypost", Auth, getMyPosts);
router.post("/:postId/like", Auth, likePost);
router.post("/:postId/unlike", Auth, unlikePost);
router.post("/comment", Auth, commentOnPost);
router.post("/:postId/share", Auth, sharePost);
router.delete("/deletepost/:id", Auth, deletePost);
router.get("/timeline/:userId", Timeline);
router.get("/UserProfile/:username", getUserProfile);

export default router;
