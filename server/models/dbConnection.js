const mysql = require('mysql');


const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB
});

// connection.connect(function(err) {
//  if(err) console.log(err);
//  connection.query('SELECT * from Product', function(error,results,fields){
//     if(!error){
//         console.log(results);
//     }
//     else{
//         console.log(error);
//     }
// })
// });


connection.connect(error => {
    if(error) throw error;
    
    console.log("successfully connected to YadLeyadid DB !");
    return connection;
});


module.exports = connection;