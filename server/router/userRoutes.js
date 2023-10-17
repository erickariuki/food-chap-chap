import express from 'express';
import { followUnFollowUser } from '../controllers/userController.js';
import Auth from '../middleware/auth.js';

const UserRouter = express.Router();

UserRouter.use(Auth); // Applying authentication middleware to all routes below

// POST route to follow/unfollow a user
UserRouter.post('/follow/:id', followUnFollowUser);

// PUT route to update user profile
// UserRouter.put('/update', updateUser);

export default UserRouter;
