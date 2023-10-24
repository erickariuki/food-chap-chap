import express from "express";
const router = express.Router();
import Auth from "../middleware/auth.js";
import { getUser, followUser, unfollowUser, updateProfilePic, searchUsers }from "../controllers/userController.js";

router.get("/:id", Auth, getUser);
router.put("/follow", Auth, followUser);
router.put("/unfollow", Auth, unfollowUser);
router.put("/updatepic", Auth, updateProfilePic);
router.post("/search-users", Auth, searchUsers);

export default router;