import express from 'express';
import { followUnFollowUser, getUserProfile } from '../controllers/userController.js';
import Auth from '../middleware/auth.js';

const router = express.Router();

router.get('/profile/:username', getUserProfile);
router.post('/follow/:id', Auth, followUnFollowUser);
// router.post('/update/:id', Auth, updateUser)

export default router;