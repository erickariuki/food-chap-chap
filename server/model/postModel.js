import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const commentSchema = new mongoose.Schema({
    text: {
      type: String,
      required: true
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User' // Assuming 'User' is the model name for the user schema
    }
  });

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

    comments: [commentSchema]
}, { timestamps: true });


const Post = mongoose.model('Post', postSchema);

export default Post;

