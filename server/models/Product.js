const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        product_id: {
            type: String,
            trim: true,
            required: true
        },
        place: {
            type: String,
            enum: ['מושאל','במחסן','בתיקון'],
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