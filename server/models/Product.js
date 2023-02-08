const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        middleName: {
            type: String,
            trim: true,
            required: true
        },
        loan_by: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }
)

const Product = mongoose.model('product', productSchema);
module.exports = Product;