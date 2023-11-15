import express from "express";
const router = express.Router();
import Auth from "../middleware/auth.js";
import { getUser, followUser, unfollowUser, updateProfilePic, searchUsers, listUsers }from "../controllers/userController.js";

router.get("/users",listUsers);
router.get("/:username", getUser);
router.put("/follow", Auth, followUser);
router.put("/unfollow", Auth, unfollowUser);
router.put("/updatepic", Auth, updateProfilePic);
router.post("/searchUsers", Auth, searchUsers);

export default router;