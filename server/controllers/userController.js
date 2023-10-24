import User from "../model/User.model.js";
import Post from "../model/postModel.js";


export async function getUser (req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
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

export async function followUser (req, res) {
    try {
        const followId = req.body.followId;
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { $push: { following: followId } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the follower's followers list
        await User.findByIdAndUpdate(
            followId,
            { $push: { followers: req.user._id } },
            { new: true }
        );

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export async function unfollowUser (req, res) {
    User.findByIdAndUpdate(
        req.body.unfollowId,
        {
            $pull: { followers: req.user._id }
        },
        {
            new: true
        },
        (err, result) => {
            if (err) {
                return res.status(422).json({ error: err });
            }
            User.findByIdAndUpdate(
                req.user._id,
                {
                    $pull: { following: req.body.unfollowId }
                },
                { new: true }
            )
                .select("-password")
                .then(result => {
                    res.json(result);
                })
                .catch(err => {
                    return res.status(422).json({ error: err });
                });
        }
    );
};

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
