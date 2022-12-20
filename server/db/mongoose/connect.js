const mongoose = require('mongoose')

mongoose.set('strictQuery', true);
async function connect(){
    try {
        await mongoose.connect('mongodb://localhost:27017/YadLeyadid');
        console.log("connected to YadLeyadid DB")
    } catch(err) {
        console.log(err);
        
    }
}

connect();