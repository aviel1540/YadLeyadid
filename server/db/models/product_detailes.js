const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productDetailesSchema = new Schema({
    SN: {
        type: String,
        trim: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})

const ProductDetailes = mongoose.model('products', productDetailesSchema);
module.exports = ProductDetailes;