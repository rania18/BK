import express from 'express';

import { getAllProducts, getSeedProducts, getProduct, createProduct, updateProduct, deleteProdduct} from '../controller/products.js' 

const router = express.Router();

router.get('/getProducts', getAllProducts);
router.get('/seed', getSeedProducts);
router.get('/:id', getProduct);
router.post('/add', createProduct);
router.patch('/edit/:id', updateProduct);
router.delete('/:id', deleteProdduct);

export default router;