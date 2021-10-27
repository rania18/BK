import express from 'express';


import { getAllBlogs, getSeedBlog, getBlog } from '../controller/blogs.js'
const router = express.Router();

router.get('/', getAllBlogs); 
router.get('/seed', getSeedBlog);
router.get('/:id', getBlog);

export default router;