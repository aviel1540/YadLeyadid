const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    idTeuda:{
        type: String,
        trim: true,
        required: true,
        uniqe: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
        
    },
    email: {
        type: email,
        trim: true,
        required: true,
        uniqe: true

    },
    phone: {
        type: String,
        trim: true,
        required: true
    },
    address: {
        type: String,
        trim: true,
        required: true
    },
    paymentType: {
        type: String,
        trim: true,
        required: true
    },
    isAdmin: {
        type: Boolean,
        trim: true,
        default: false
    },
    productList: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]

})

const User = mongoose.model('users', userSchema);
module.exports = User