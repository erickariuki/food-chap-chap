import UserModel from '../model/User.model.js';

export async function followUnFollowUser(req, res) {
    try {
        const { id } = req.params; // User ID to follow/unfollow
        const { userId } = req.user; // User ID of the authenticated user

        const userToFollow = await UserModel.findById(id);
        if (!userToFollow) {
            return res.status(404).json({ error: 'User not found' });
        }

        const currentUser = await UserModel.findById(userId);
        if (!currentUser) {
            return res.status(404).json({ error: 'Authenticated user not found' });
        }

        // Check if the authenticated user is already following the target user
        const isFollowing = currentUser.following.includes(id);

        if (isFollowing) {
            // User is already following, unfollow them
            currentUser.following = currentUser.following.filter(followedUserId => followedUserId.toString() !== id);
            userToFollow.followers = userToFollow.followers.filter(followerId => followerId.toString() !== userId);
        } else {
            // User is not following, follow them
            currentUser.following.push(id);
            userToFollow.followers.push(userId);
        }

        // Save the changes to the database
        await currentUser.save();
        await userToFollow.save();

        return res.status(200).json({ message: isFollowing ? 'Unfollowed successfully' : 'Followed successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
    // const updateUser = async (req, res) => {
    //     const { name, email,                                                                                 = req.us    er._id;
    //     try {
            
    //     } catch (error) {
    //         res.status(500).json({ message: error.message});
    //         console.log ("Error in updateUser:", error.message);
    //     }
    // }
    // const getUserProfile = async (req, res) => {
    //     const {username} = req.params;
    //     try {
    //         const user = await User.findOne({username}).select('password').select('updatedAt');
    //         if (!user) return res.status(400).json({ message: "User not found"});

    //         res.status(200).json(user);
    //     } catch (error) {
    //         res.status(500).json({ message: error.message });
    //         console.log ("Error in getUserProfile:", error.message);
    //     }
    // }

