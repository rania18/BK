import express from 'express';
import Blog from '../models/blogModel.js';
import data from '../data.js';

const router = express.Router();

// GET ALL CATEGORY
export const getAllBlogs = async (req, res) => {
    const blogs = await Blog.find({});
    res.send(blogs);
};

export const getSeedBlog = async (req, res) => {
     // Remove All Blogs
     await Blog.deleteMany({});
     const createdBlogs = await Blog.insertMany(data.blog);
     res.send({ createdBlogs });
};

export const getBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
        res.send(blog);
    } else {
        res.status(404).send({message: 'Blog Not Found'});
    }
};

export default router;