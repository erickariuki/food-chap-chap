// blog controller
import express, { application } from 'express';
import Blog from '../models/blogModel';

// CRUD opertions for Blog Model

// Create a new Blog

app.post("/blogs", async (req, res) => {
    try {
    const { title, content, image, author } = req.body;

    if(!title || !content || !image || !author) {
        return res.status(400).json({ message: "All fields are required"});
    }

    const blog = new Blog({ title, content, image, author });
    await blog.save();
    return res.status(200).json({ message: "Blog created successfully", blog });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message });
    }
});

//Get all Blogs

app.get("/blogs", async (req, res) => {
    try {
        const blogs = await Blog.find({});
        return res.status(200).json({ blogs });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Get a Blog by ID
app.get("/blogs/:_id", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params._id);
        if(!blog) {
            return res.status(404).json({ message: "Blog not found"});
        }
        return res.status(200).json({ blog });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Update a Blog by ID