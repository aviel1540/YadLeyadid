const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const productRefSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        type: String
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: BigInt,
        required: true
    },
    loan_date: {
        type: Date,
        default: new Date(),
        validate(value){
            if(validator.isAfter(value.toString()))
                throw new Error("Invalid date for 'Loan Date' , it is in the future !")
        }
    }
})

module.exports = productRefSchema;