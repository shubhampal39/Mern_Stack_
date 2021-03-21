const mongoose = require('mongoose');
const express = require('express');
// const db= require('./config/connection')
const app=express();

const db='mongodb+srv://shubhampal:shubhampal@cluster0.ta48e.mongodb.net/mearnstack?retryWrites=true&w=majority';

mongoose.connect(db,{
   useNewUrlParser: true,
   useCreateIndex:true,
   useUnifiedTopology:true,
   useFindAndModify:false
}).then(()=>{
   console.log(`connected to mongodb`);

}).catch((err)=> console.log(err));


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
    res.send("Hello contact");
 })

 app.get('/signin',(req,res)=>{
    res.send("Hello about");
 })
 app.get('/signup',(req,res)=>{
    res.send("Hello about");
 })

port=4000;

app.listen(port,()=>{
    console.log(`servern is running on ${port}`)
});

