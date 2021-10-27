import express from 'express';

import { getAllCategories, getSeedCategories, getCategory, creatCategory, updatCategory, deleteCategory } from '../controller/categorys.js'

const router = express.Router();

router.get('/', getAllCategories);
router.get('/seed', getSeedCategories);
router.get('/:id', getCategory);
router.post('/add', creatCategory);
router.patch('/edit/:id', updatCategory);
router.delete('/:id', deleteCategory);

export default router;