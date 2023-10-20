import mongoose from 'mongoose';
const { Schema, ObjectId } = mongoose;

const commentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    postedBy: {
        type: ObjectId,
        ref: 'User'
    }
});

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        
    },
    photo: {
        type: String,
    },
    likes: [{
        type: ObjectId,
        ref: 'User'
    }],
    comments: [commentSchema], // Use the commentSchema as a subdocument
    postedBy: {
        type: ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

export default Post;
