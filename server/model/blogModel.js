import mangoose from 'mongoose';

const blogSchema = new mangoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
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
        defaultValue: 0,
        required: false,
    },
    dislikes: {
        type: Number,
        defaultValue: 0,
        required: false,
    },
    // comments: [commentSchema],
    // replies: [replySchema],
});

export const Blog = mangoose.model("Blog", blogSchema);