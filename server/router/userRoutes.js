import express from 'express';
import { followUnFollowUser } from '../controllers/userController.js';
import Auth from '../middleware/auth.js';

const router = express.Router();

router.post('/follow/:id', Auth, followUnFollowUser);

export default router;