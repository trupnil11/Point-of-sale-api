const mysql = require('mysql');
const connection = mysql.createConnection({
    //create connection
    host: 'localhost',
    user : 'root',
    password: '',
    database: "pos"

});
module.exports = connection;
