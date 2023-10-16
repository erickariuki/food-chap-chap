import User from '../model/User.model.js';

const followUnFollowUser = async () => {
    try {
        const { id } = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);

        if(id === req.user._id.toString()) return res.status(400).json({ message: "You cannot follow/unfollow yourself"});

        if(!userToModify || !currentUser) 
            return res.status(400).json({ message: "user not found" });

        const isFollowing = currentUser.following.includes(id);

        if(isFollowing) {
            // unfollow user
            // Modify current user following, modify followers of userToModify
            await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
            await User.findByIdAndUpdate(id, { $pull : { followers: req.user._id } });
            res.status(200).json({ message: "User unfollowed successfully"})
        }else {
            // follow user
            await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
            await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
            res.status(200).json({ message: "User followed successfully"})
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log ("Error in followUnFollowUser:", error.message);
    }
    // const updateUser = async (req, res) => {
    //     const { name, email, username, password, profilepic, bio} = req.body;
    //     const userId = req.user._id;
    //     try {
            
    //     } catch (error) {
    //         res.status(500).json({ message: error.message});
    //         console.log ("Error in updateUser:", error.message);
    //     }
    // }
    const getUserProfile = async (req, res) => {
        const {username} = req.params;
        try {
            const user = await User.findOne({username}).select('password').select('updatedAt');
            if (!user) return res.status(400).json({ message: "User not found"});

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
            console.log ("Error in getUserProfile:", error.message);
        }
    }
}

export { followUnFollowUser, getUserProfile };