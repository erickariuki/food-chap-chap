// Import required modules and controllers
import express from 'express';
import { createPost, getPost, deletePost, likeUnlikePost, getFeedPosts } from '../controllers/postControllers.js';
import Auth from '../middleware/auth.js';

const postRouter = express.Router();

// Routes with authentication middleware
postRouter.post('/create', Auth, createPost); // Create a new post
postRouter.get('/:postId', Auth, getPost); // Get a specific post
postRouter.delete('/:postId', Auth, deletePost); // Delete a post
postRouter.post('/like/:postId', Auth, likeUnlikePost); // Like/unlike a post
postRouter.get('/feed', Auth, getFeedPosts); // Get posts from users followed by the current user

export default postRouter;