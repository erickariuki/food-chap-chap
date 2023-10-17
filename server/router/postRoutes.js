import express from 'express';
import { createPost, getPost, deletePost, likeUnlikePost, getFeedPosts } from '../controllers/postControllers.js';
import Auth from '../middleware/auth.js'

const postRouter = express.Router();

postRouter.get('/feed', Auth, getFeedPosts);
postRouter.get('/:id', getPost);
// postRouter.get("/user/:username", getUserPosts);
postRouter.post('/create', Auth, createPost);
postRouter.delete('/:id', Auth, deletePost);
postRouter.post('/like/:id', Auth, likeUnlikePost);
// postRouter.post('/reply/:id', Auth, replyToPost);

export default postRouter;