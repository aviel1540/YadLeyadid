const Product = require('../models/Product');
const escape = require('escape-html');
const {
  addSlashes,
  validateEmail,
  isLengthUsername,
  isLengthPassword,
} = require("../utils/validation/validation");

const productCtrl = {
    addProduct: async(req,res) => {
        const productId = escape(req.body.product_id);
        const place = escape(req.body.place);
        let product;
        try {
            if ( 
                !productId ||
                !place
            ) {
                return res.status(400).json({ message: "יש למלא את כל השדות"})
            }
            const checkProductId = addSlashes(productId);
            const checkPlace = addSlashes(place);

            const productIdFound = await Product.findOne({ productId: checkProductId});
            if(productIdFound){
                return res.status(400).json({ message: "מזהה קיים במערכת"});
            }
            product = new Product({
                product_id: checkProductId,
                place: checkPlace
            })
            await product.save();
            res.status(201).json({product});
        }catch(err) {
            return res.status(401).json({message: err.message});
        }
    }
}

module.exports = productCtrl;