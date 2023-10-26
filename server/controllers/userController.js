import User from "../model/User.model.js";
import Post from "../model/postModel.js";



export async function getUser(req, res) {
      const { userId, username } = req.query;
      try {
        const user = userId
          ? await User.findById(userId)
          : await User.findOne({ username: username });
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
      } catch (err) {
        res.status(500).json(err);
      }
    };
  
    export async function getFriends(req, res) {
      try {
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
          user.followings.map((friendId) => User.findById(friendId))
        );
        const friendList = friends.map(({ _id, username, profilePicture }) => ({
          _id,
          username,
          profilePicture,
        }));
        res.status(200).json(friendList);
      } catch (err) {
        res.status(500).json(err);
      }
    };
  
    export async function followUser(req, res) {
      const { id } = req.params;
      const { userId } = req.body;
      if (userId !== id) {
        try {
          const user = await User.findById(id);
          const currentUser = await User.findById(userId);
          if (!user.followers.includes(userId)) {
            await user.updateOne({ $push: { followers: userId } });
            await currentUser.updateOne({ $push: { followings: id } });
            res.status(200).json("user has been followed");
          } else {
            res.status(403).json("you already follow this user");
          }
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("you can't follow yourself");
      }
    };
  
    export async function unfollowUser(req, res) {
      const { id } = req.params;
      const { userId } = req.body;
      if (userId !== id) {
        try {
          const user = await User.findById(id);
          const currentUser = await User.findById(userId);
          if (user.followers.includes(userId)) {
            await user.updateOne({ $pull: { followers: userId } });
            await currentUser.updateOne({ $pull: { followings: id } });
            res.status(200).json("user has been unfollowed");
          } else {
            res.status(403).json("you don't follow this user");
          }
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("you can't unfollow yourself");
      }
    };
  
export async function updateUserById (req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

// export async function followUser (req, res) {
//     try {
//         const followId = req.body.followId;
//         const user = await User.findByIdAndUpdate(
//             req.user._id,
//             { $push: { following: followId } },
//             { new: true }
//         );

//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         // Update the follower's followers list
//         await User.findByIdAndUpdate(
//             followId,
//             { $push: { followers: req.user._id } },
//             { new: true }
//         );

//         res.json(user);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// export async function unfollowUser (req, res) {
//     User.findByIdAndUpdate(
//         req.body.unfollowId,
//         {
//             $pull: { followers: req.user._id }
//         },
//         {
//             new: true
//         },
//         (err, result) => {
//             if (err) {
//                 return res.status(422).json({ error: err });
//             }
//             User.findByIdAndUpdate(
//                 req.user._id,
//                 {
//                     $pull: { following: req.body.unfollowId }
//                 },
//                 { new: true }
//             )
//                 .select("-password")
//                 .then(result => {
//                     res.json(result);
//                 })
//                 .catch(err => {
//                     return res.status(422).json({ error: err });
//                 });
//         }
//     );
// };

export async function updateProfilePic (req, res) {
    User.findByIdAndUpdate(
        req.user._id,
        { $set: { profilePic: req.body.pic } },
        { new: true },
        (err, result) => {
            if (err) {
                return res.status(422).json({ error: "pic cannot be updated" });
            }
            res.json(result);
        }
    );
};

export async function searchUsers (req, res) {
    let userPattern = new RegExp("^" + req.body.query);
    User.find({ username: { $regex: userPattern } })
        .select("_id username")
        .then(users => {
            res.json({ users });
        })
        .catch(err => {
            console.log(err);
        });
};

