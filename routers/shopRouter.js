import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Category from '../models/categoryModel.js';
import Product from '../models/productModel.js';

const shopRouter = express.Router();

// GET ALL CATEGORIES & PRODUCTS

shopRouter.get('/', expressAsyncHandler(async (req, res) => {
    const categories = await Category.find({});
    const products = await Product.find({});
    const details = {categories, products};
    res.send(details);
}));



export default shopRouter;