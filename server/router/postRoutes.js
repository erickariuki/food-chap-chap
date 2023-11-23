// postRoutes.js
import express from "express";
const router = express.Router();
import Auth from "../middleware/auth.js";
import passport from 'passport'; // Import passport for session-based authentication
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

// Update routes to use Passport.js for session-based authentication
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
router.get("/timeline/:userId", Auth, Timeline);
router.get("/UserProfile/:username", Auth, getUserProfile);

// Passport.js route for Google OAuth2 login
router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login'],
  })
);

// Passport.js callback route after Google has authenticated the user
router.get(
  '/auth/google/redirect',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login', // You can redirect to an error page or handle it as needed
  })
);

export default router;
