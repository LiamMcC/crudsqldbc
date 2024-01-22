var express = require("express");
var app = express();
var mysql = require('mysql');

app.set('view engine', 'ejs'); // Set the template engine 


// ******************************** Start of SQL **************************************** //
// First we need to tell the application where to find the database
const db = mysql.createConnection({
host: '127.0.0.1',
    user: 'root',
    port: '3306',
    password: 'Root',
    database: 'liam'
 });

// Next we need to create a connection to the database

db.connect((err) =>{
     if(err){
        console.log("go back and check the connection details. Something is wrong.")
    } 
     else{
        console.log('Looking good the database connected')
    }
})


// **********************************  Code from here **************************
app.get('/', function(req,res){
    let sql = 'SELECT * FROM cars';
    let query = db.query(sql, (err,result) => {
        if(err) throw err;
        console.log(result);
        res.render('home', {result})   
    });
    
})



app.get('/add', function(req,res){
    let sql = 'insert into cars ( make, model, image, price) values ("Nissan", "Skyline", "supra.jpg", 200000)';
    let query = db.query(sql, (err,result) => {
        if(err) throw err;
        console.log(result);
        res.redirect( '/')   
    });
   
    
    
})


app.get('/car/:id', function(req,res){
    let sql = 'SELECT * FROM cars where Id = ?';
    let query = db.query(sql,[req.params.id], (err,result) => {
        if(err) throw err;
        console.log(result);
        res.render('home', {result})   
    });
    
})


app.get('/delete/:id', function(req,res){
    let sql = 'DELETE FROM cars where Id = ?';
    let query = db.query(sql,[req.params.id], (err,result) => {
        if(err) throw err;
        console.log(result);
        res.redirect('/')   
    });
    
})





// **********************************  Code to here **************************

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0" , function(){
  console.log("New Full Demo is Live")
});