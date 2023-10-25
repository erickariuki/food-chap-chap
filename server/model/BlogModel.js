import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
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
    // comments: [commentSchema],
    // replies: [replySchema],
});

// export const Blog = mongoose.model("Blog", blogSchema);
 const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);
 export default Blog;