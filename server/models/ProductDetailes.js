const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productDetailesSchema = new Schema({
    serialNumber: {
        type: String,
        trim: true,
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    quantity: {
        type: Number,
        trim: true,
        required: true
    }
})

const ProductDetailes = mongoose.model('products', productDetailesSchema);
module.exports = ProductDetailes;