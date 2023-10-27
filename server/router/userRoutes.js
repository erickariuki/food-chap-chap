import express from "express";
import Auth from "../middleware/auth.js";
import { registerUser, loginUser, updateProfilePic, followUser, unfollowUser, searchUsers } from "../controllers/userController.js";

const userRouter = express.Router();
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.put("/follow/:id", Auth, followUser);
userRouter.put("/unfollow", Auth, unfollowUser);
userRouter.put("/updatepic", Auth, updateProfilePic);
userRouter.post("/search-users", Auth, searchUsers);

export default userRouter;