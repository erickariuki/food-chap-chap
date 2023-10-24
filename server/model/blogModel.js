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
        required: true,
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
    // comments: [commentSchema],
    // replies: [replySchema],
});

export const Blog = mangoose.model("Blog", blogSchema);