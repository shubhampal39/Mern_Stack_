const express = require('express');
const User = require('../model/userSchema');
const router=express.Router();

router.get('/',(req,res)=>{
    res.send("Hello world from auth.js");
 })
 router.post('/register',(req,res)=>{
      console.log(req.body);  
    const {name,email,phone,work,password,cpassword} = req.body;
    console.log(name,email,phone,work,password,cpassword)
    if( !name || !email || !phone || !work || !password || !cpassword)
  {
       return res.status(422).json({error:"please filled the field properly"});
  }
  User.findOne({email:email})
  .then((userExist)=>{
      if(userExist){
          return res.status(200).json({error:"EMail already Exist"});
      }
       const user=new User({name,email,phone,work,password,cpassword});
       user.save().then(()=>{
           res.status(201).json({message:"user registred successfully"});
       }).catch((error)=>res.status(500).json({error:"failed to register"}));

    }).catch(err=>{console.log(err)});

})

module.exports=router;