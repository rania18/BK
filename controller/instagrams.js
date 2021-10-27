import express from 'express';
import data from '../data.js';
import Instagram from '../models/instagramModel.js';

const router = express.Router();

export const getAllInstagram = async (req, res) => {
    const instagrams = await Instagram.find({});
    res.send(instagrams);
};

export const getSeedInstagram = async (req, res) => {
    // Remove All Instagrams
    // await Instagram.remove({});
    const createdInstagrams = await Instagram.insertMany(data.instagram);
    res.send({ createdInstagrams });
};

export const getInstagram = async (req, res) => {
    const instagram = await Instagram.findById(req.params.id);
    if (instagram) {
        res.send(instagram);
    } else {
        res.status(404).send({message: 'Instagram Link Not Found'});
    }
};

export default router;