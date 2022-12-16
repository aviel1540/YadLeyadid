const sql = require('./dbConnection.js');

const Product = product => {
    this.name = product.name;
    this.serial = product.serial;
    this.quantity = product.quantity;
}