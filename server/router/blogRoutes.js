// blog routes
import express from 'express';
import  { createBlog, getAllBlog, getBlog, updateBlog, deleteBlog} from "../controllers/blogController.js"

const blogRouter = express.Router();

// Creating a new Blog
blogRouter.post("/blogs", createBlog);

// Get all Blogs
blogRouter.get("/blogs", getAllBlog);

// Get a Blog by ID
blogRouter.get("/blogs/:_id", getBlog);

// Update a Blog by ID
blogRouter.put("/blogs/:_id", updateBlog);

// Delete a Blog by ID
blogRouter.delete("/blogs/:_id", deleteBlog);

export default blogRouter;