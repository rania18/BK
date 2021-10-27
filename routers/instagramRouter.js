import express from 'express';

import { getAllInstagram, getSeedInstagram, getInstagram } from '../controller/instagrams.js';

const router = express.Router();

router.get('/', getAllInstagram);
router.get('/seed', getSeedInstagram);
router.get('/:id', getInstagram);

export default router;