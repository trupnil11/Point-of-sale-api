var http = require('http');
const express = require('express');
const apiRoute = require('./routes/api');
const app = express();
const mySQL = require('./helpers/config');


const bodyParser = require('body-parser');

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

//connection check
mySQL.connect((err)  => {
    if(err){
        throw err;
    }
    console.log("Database Connected Successfully");
})


app.use( '/api/', apiRoute )

app.listen( 5566, ()=>{
    console.log( "Server listen on 5566" )
} );
