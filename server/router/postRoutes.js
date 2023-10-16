import express from 'express';
import { createPost, getPost } from '../controllers/postController.js';
import Auth from '../middleware/auth.js'

const postRouter = express.Router();

postRouter.get('/', getPost)
postRouter.post('/create', Auth, createPost)

export default postRouter;