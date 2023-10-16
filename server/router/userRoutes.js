import express from 'express';
import { followUnFollowUser, updateUser } from '../controllers/userController.js';
import Auth from '../middleware/auth.js';

const router = express.Router();

router.post('/follow/:id', Auth, followUnFollowUser);
router.post('/update/:id', Auth, updateUser)

export default router;