import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;
const userSchema = mongoose.Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        maxLength: 500
    },
    image: {
        type: String
    },
    likes: {
        // array of user ids
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: [],
    },
    replies: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            text: {
                type: String
            },
            userProfilePic: {
                type: String
            },
            username: {
                type: String
            }
        }
    ]
}, {
    timestamps: true
})

const Post = mongoose.model('Post', userSchema);

export default Post;