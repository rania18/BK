import express from 'express';

import { getAllCategorys, getSeedCategorys, getCategory, creatCategory, updatCategory, deleteCategory } from '../controller/categorys.js'

const router = express.Router();

router.get('/', getAllCategorys);
router.get('/seed', getSeedCategorys);
router.get('/:id', getCategory);
router.post('/add', creatCategory);
router.post('/edit/:id', updatCategory);
router.delete('/:id', deleteCategory);

export default router;