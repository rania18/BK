import mongoose from 'mongoose';

const sliderSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    description2: { type: String },
    button: { type: String },
    buttonLink: { type: String },
    image: { type: String },
}, {
    timestamps: true,
});

const Slider = mongoose.model('Slider', sliderSchema);

export default Slider;