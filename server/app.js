const dotenv = require("dotenv");
var bodyParser = require('body-parser');

const mongoose = require("mongoose");
const express = require("express");
dotenv.config({path:"./config.env"});

const app = express();
app.use(bodyParser.json());
const server = '0.0.0.0:27017'; // REPLACE WITH YOUR DB SERVER
//linking router file
app.use(require("./router/auth"));
//connecting to mongoose
require('./db/conn.js');

const PORT = process.env.PORT;
// const User = require("./model/userSchema");


//middelWare (when user try to open about page it comes.

// function middleware(req, res, next){
//   console.log("hello middleware");
//   next();
// };



// app.get("/", function(req, res){
//   res.send("Hello world!");
// });

// app.get("/about", function(req, res){
//   console.log("hello to about");
//   res.send("this about me");
// });

app.get("/contact", function(req, res){
  // res.cookie("Test","disha");
  res.send("contact me");
});

app.get("/register", function(req, res){
  res.send("register here");
});

app.get("/login", function(req, res){
  res.send("login to ur account");
});

app.listen(PORT, function(){
  console.log("server is running on port 3000");
});
