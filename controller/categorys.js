import express from 'express';
import Category from '../models/categoryModel.js';
import Product from '../models/productModel.js';
import data from '../data.js';

const router = express.Router();

// GET ALL CATEGORY
export const getAllCategories = async (req, res) => {
    const categories = await Category.find({});
    res.send(categories);
};

// SEED CATEGORIES FROM DATA.JS
export const getSeedCategories = async (req, res) => {
    // Remove All Categories
    await Category.deleteMany({});
    // Insert Many from data.js
    const createdCategories = await Category.insertMany(data.categories);
    res.send({ createdCategories });
};

// GET CATEGORY BY ID
export const getCategory = async (req, res) => {
    const listCategories = await Category.find({});
    const category = listCategories.find(cat => cat._id === req.params)
    const products = await Product.find({category: req.params.id});
    if (category) {
        // category.products = await Product.find({category: req.params.id});
        res.send([category, products, listCategories]);
    } else {
        res.status(404).send({message: 'Category Not Found'});
    }
};

// Add Category
export const creatCategory = async (req, res) => {
    const newCategory = req.body
    const category = new Category({ ...newCategory });
    try {
        const result = await category.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(501).send(error);
    }
};

// Update Category
export const updatCategory = async (req, res) => {
    const { id } = req.params;
    const { title, image, parentId } = req.body;
    const updatedCategory = { title, image, parentId, _id: id };

    try {
        await Category.findByIdAndUpdate(id, updatedCategory, { new: true });
        res.json(updatedCategory);
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
};

// DELETE CATEGORY
export const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        await Category.findByIdAndRemove( id )
        res.send('Category Deleted');
    } catch (error) {
        res.status(403).send('Category Not Deleted');
    }

};

export default router;