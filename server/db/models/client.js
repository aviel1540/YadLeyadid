const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const clientSchema = new Schema({
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
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]

})

const Client = mongoose.model('clients', clientSchema);
module.exports = Client