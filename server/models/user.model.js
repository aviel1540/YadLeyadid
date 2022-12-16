const Connection = require('./dbConnection.js');
const User = function(user) {
    this.name = user.name;
    this.address = user.address;
    this.phone = user.phone;
    this.methods_of_payment = user.methods_of_payment;
    this.payment_sum = user.payment_sum;
    this.isAdmin = user.isAdmin;
}
User.showAll = () => {
    try{
        Connection.query('SELECT * from user', function(error,results,fields){
            if(!error){
                console.log(results);
            }
            else{
                console.log(error);
            }
        })
        connect.end()
    }catch(err) {
        console.log(err);
    }
}