import express from 'express';
import Product from '../models/productModel.js';
import data from '../data.js';

const router = express.Router();


// GET ALL PRODUCTS
export const getAllProducts = async (req, res) => {
    const products = await Product.find({});
    res.send(products);
};

// SEED PRODUCTS FROM DATA.JS
export const getSeedProducts = async (req, res) => {
    // Remove All Products
    await Product.deleteMany({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
};

// GET PRODUCT BY ID
export const getProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
       /*  const category = await Category.findById(product.category);
        product.category = category */
        res.send(product);
    } else {
        res.status(404).send({message: 'Product Not Found'});
    }
};

// Add Product
export const createProduct = async (req, res) => {

    const newProduct = req.body
    const product = new Product({ ...newProduct });
    // SAVE PRODUCT
    try {
        await product.save();
        res.send('Product Added');
    } catch (error) {
        res.status(403).send('Product Not Found');
    }

};

// Update Product
export const updateProduct = async (req, res) => {

    const { id } = req.params;
    const { name, image, price, description, category, availability, images, popular, related, minQtn, details } = req.body;
    const updatedProduct = {name, image, price, description, category, availability, images, popular, related, minQtn, details, _id: id };

    try {
        await Product.findByIdAndUpdate(id, updatedProduct, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        res.status(403).send('Product Not Update');
    }

}

// DELETE PRODUCT
export const deleteProdduct = async (req, res) => {

    const { id } = req.params;

    try {
        await Product.findByIdAndRemove( id )
        res.send('Product Deleted');
    } catch (error) {
        res.status(403).send('Product Not Deleted');
    }

};

export default router;