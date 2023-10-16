import express from 'express';
import { createPost } from '../controllers/postController.js';
import Auth from '../middleware/auth.js'

const postRouter = express.Router();

postRouter.post('/create', Auth, createPost)

export default postRouter;