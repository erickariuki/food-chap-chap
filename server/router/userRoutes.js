import express from "express";
const router = express.Router();
import Auth from "../middleware/auth.js";
import { getUser, followUser, unfollowUser, updateProfilePic, searchUsers, listUsers }from "../controllers/userController.js";

router.get("/", Auth, listUsers);
router.get("/:id", Auth, getUser);
router.put("/follow/:id", Auth, followUser);
router.put("/unfollow", Auth, unfollowUser);
router.put("/updatepic", Auth, updateProfilePic);
router.post("/searchUsers", Auth, searchUsers);

export default router;