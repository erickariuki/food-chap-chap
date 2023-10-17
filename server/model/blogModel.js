import mangoose from 'mongoose';

const blogSchema = new mangoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: false,
    },
    image: {
        type: Buffer,
        required: false,
    },
    author: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        required: false,
    },
    dislikes: {
        type: Number,
        required: false,
    },
    comments: [commentSchema],
    replies: [replySchema],
});