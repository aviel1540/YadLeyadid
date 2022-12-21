const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    product_detail: {
        type: Schema.Types.ObjectId,
        ref: 'ProductDetailes'
    },
    loan_detailes : {
        type: Object,
        loan_by: {
            type: Schema.Types.ObjectId,
            ref: 'Client' 
        },
        loan_date: {
            type: Date,
            default: new Date(),
            validate(value){
                if(validator.isAfter(value.toString()))
                    throw new Error("Invalid date for 'Loan Date' , it is in the future !")
            }
        },
        return_date: {
            type: Date,
            validate(value){
                if(validator.isBefore(value.toString(),(this.begin_date).toString()))
                    throw new Error("Invalid date for 'Loan Date' , it is in the past !")
            }
        }
    }
})

const Product = mongoose.model('client-product', productSchema);
module.exports = Product;