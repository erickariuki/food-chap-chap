import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
    },
    pic: {
        type: String,
        
    },
    likes: [
        {
            type: ObjectId,
            ref: 'User',
        },
    ],
    replies: [
        {
            userId: {
                type: ObjectId,
                ref: 'User',
            },
            text: String,
            userProfilePic: String, // Assuming you store the user's profile picture URL here
            username: String, // Assuming you store the user's username here
        },
    ],
    postedBy: {
        type: ObjectId,
        ref: 'User'
    },
}, { timestamps: true });


const Post = mongoose.model('Post', postSchema);

export default Post;

