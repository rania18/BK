import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    description: String ,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    availability: String,
    images: [String],
    popular: Boolean,
    related: [String],
    minQtn: Number,
    countInStock: Number,
    minStock: Number,
    width: String,
    height: String,
    matter: String,
    delay: String,
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

export default Product;