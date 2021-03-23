const mongoose = require('mongoose');
const express = require('express');
const dotenv=require('dotenv');
const app=express();

dotenv.config({path:'./config.env'});
require('./db/conn')
const User=require('./model/userSchema')
app.use(express.json());

PORT=process.env.PORT;

app.use(require('./router/auth'))
//middleware

const middleware =(req,res,next) =>{
  console.log("Hello my middelware!");
  next();
}

app.get('/',(req,res)=>{
   res.send("Hello world");
})

app.get('/about',middleware,(req,res)=>{
    res.send("Hello about");
 })
 app.get('/contact',(req,res)=>{
    res.cookie("jwtoken",'shubham');
    res.send("Hello contact");
 })

 app.get('/signin',(req,res)=>{
    res.send("Hello about");
 })
 app.get('/signup',(req,res)=>{
    res.send("Hello about");
 })


app.listen(PORT,()=>{
    console.log(`servern is running on ${PORT}`);
});

