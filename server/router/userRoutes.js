import express from 'express';
import { followUnFollowUser } from '../controllers/userController.js';
import Auth from '../middleware/auth.js';

const UserRouter = express.Router();

// UserRouter.get('/profile/:username', getUserProfile);
UserRouter.post('/follow/:id', Auth, followUnFollowUser);
// router.post('/update/:id', Auth, updateUser)

export default UserRouter;