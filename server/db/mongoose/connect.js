const mongoose = require('mongoose')

async function connect(){
    try {
        await mongoose.connect('mongodb://localhost:27017/YadLeyadid');
    } catch(err) {
        console.log(err);
    }
}

connect();