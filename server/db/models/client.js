const mongoose = require('mongoose');
const validator = require('validator');
const ProductRefSchema = require('/product_ref.js')

const Schema = mongoose.Schema;

const clientSchema = new Schema({
    client_id : {
        type: String,
        trim: true,
        required: true
    },
    first_name: {
        type: String,
        trim: true,
        required: true
    },
    last_name: {
        type: String,
        trim: true,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    payment_type: {
        type: String,
        required: true
    },
    product_list: [{
        type: ProductRefSchema,
    }]

})

const Client = mongoose.model('clients', clientSchema);
module.exports = Client