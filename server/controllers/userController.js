import User from '../model/UserModel.js';

const followUnFollowUser = async () => {
    try {
        const { id } = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);

        if(id === req.user._id) return res.status(400).json({ message: "You cannot follow/unfollow yourself"});

        if(!userToModify || !currentUser) return res.status(400).json({ message: "user not found" });

        const isFollowing = currentUser.following.includes(id);

        if(isFollowing) {

        }else {
            
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log ("")
    }
}

export { signupUser };