var express = require("express");
var app = express();
var mysql = require('mysql');

app.set('view engine', 'ejs'); // Set the template engine 
var bodyParser = require("body-parser") // call body parser module and make use of it
app.use(bodyParser.urlencoded({extended:true}));

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
   
       res.render('add')   
  
})


app.post('/add', function(req,res){
   var x = req.body.make
   var y = req.body.model
   var z = req.body.price
   var w = req.body.image
   
   let sql = 'insert into cars (make, model, price, image) values (?,?,?,?);';
   let query = db.query(sql,[x, y, z, w],(err,result) => {
       if(err) throw err;
       
       res.redirect('/')   
   });
    
})


// The next routes are for editing data


app.get('/edit/:xxxxxxx', function(req,res){
    let sql = 'SELECT * FROM cars WHERE id = ?';
    let query = db.query(sql,[req.params.xxxxxxx], (err,result) => {
        if(err) throw err;
        console.log(result);
        res.render('edit', {result})   
    });
     
 })



app.post('/edit/:id', function(req,res){
    var x = req.body.make
    var y = req.body.model
    var z = req.body.price
    var w = req.body.image
    
    let sql = 'UPDATE cars SET make = ?, model = ?, price = ?, image =? WHERE Id = ? ;';
    let query = db.query(sql,[x, y, z, w, req.params.id],(err,result) => {
        if(err) throw err;
        
        res.redirect('/')   
    });
     
 })




// **********************************  Code to here **************************

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0" , function(){
  console.log("New Full Demo is Live")
});
