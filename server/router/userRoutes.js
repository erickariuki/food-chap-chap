import express from "express";
const router = express.Router();
import Auth from "../middleware/auth.js";
import { getUser, getAllUsers, createUser, followUser, unfollowUser, updateProfilePic, searchUsers }from "../controllers/userController.js";

router.get("/:id", Auth, getUser);
router.get("/users", Auth, getAllUsers);
router.post("/users", Auth, createUser);
router.put("/follow/:id", Auth, followUser);
router.put("/unfollow", Auth, unfollowUser);
router.put("/updatepic", Auth, updateProfilePic);
router.post("/search-users", Auth, searchUsers);

export default router;