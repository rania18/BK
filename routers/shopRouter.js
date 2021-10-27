import express from 'express';

import { getAllShops } from '../controller/shops.js'
const router = express.Router();

// GET ALL CATEGORIES & PRODUCTS
router.get('/', getAllShops);

export default router;