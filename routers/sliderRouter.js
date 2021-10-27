import express from 'express';

import { getAllSliders, getSeedSlider } from '../controller/Sliders.js';

const router = express.Router();

router.get('/', getAllSliders);
router.get('/seed', getSeedSlider);

export default router;