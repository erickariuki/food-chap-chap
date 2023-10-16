import User from '../model/userModel.js'
import Post from '../model/postModel.js'

const createPost = async (req, res) => {
    try {
        const {postedBy, text, image} = req.body;

        if(!postedBy || !text) {
            return res.status(400).json ({ message: "PostedBy and text fields are required "});
        }

        const user = await User.findById(postedBy);
        if(!user) {
            return res.status(404).json ({ message: "User not found "});
        }

        if(user._id.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: "User not found"});
        }

        const maxLength = 500;
        if (text.length > maxLength) {
            return res.status(400).json({ error: `Text must be less than ${maxLength} characters`});
        }

        const newPost = new Post({text, image, postedBy});
        await newPost.save();

        res.status(201).json({ message: "Post created successfully", newPost });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error)
    }
}