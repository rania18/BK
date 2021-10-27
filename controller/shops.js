import express from 'express';

import Category from '../models/categoryModel.js';
import Product from '../models/productModel.js';

const router = express.Router();

export const getAllShops = async (req, res) => {
    const categories = await Category.find({});
    const products = await Product.find({});
    const details = {categories, products};
    res.send(details);
};

export default router;