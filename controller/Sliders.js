import express from 'express';
import data from '../data.js';
import Slider from '../models/SliderModel.js';

const router = express.Router();

export const getAllSliders = async (req, res) => {
    const sliders = await Slider.find({});
    res.send(sliders);
};

export const getSeedSlider = async (req, res) => {
    // Remove All Products
    await Slider.remove({});
    const createdSliders = await Slider.insertMany(data.sliders);
    res.send({ createdSliders });
};

export default router;