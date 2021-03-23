const express = require('express');
const jwt=require('jsonwebtoken');
const User = require('../model/userSchema');
const router=express.Router();
const bcrypt = require('bcryptjs')

router.get('/', (req,res)=>{
    res.send("Hello world from auth.js");
 })
// only promise 
//  router.post('/register',(req,res)=>{
//       console.log(req.body);  
//     const {name,email,phone,work,password,cpassword} = req.body;
//     console.log(name,email,phone,work,password,cpassword)
//     if( !name || !email || !phone || !work || !password || !cpassword)
//   {
//        return res.status(422).json({error:"please filled the field properly"});
//   }
//   User.findOne({email:email})
//   .then((userExist)=>{
//       if(userExist){
//           return res.status(200).json({error:"EMail already Exist"});
//       }
//        const user=new User({name,email,phone,work,password,cpassword});
//        user.save().then(()=>{
//            res.status(201).json({message:"user registred successfully"});
//        }).catch((error)=>res.status(500).json({error:"failed to register"}));

//     }).catch(err=>{console.log(err)});
// })

//async function

router.post('/register',async (req,res)=>{
  const {name,email,phone,work,password,cpassword} = req.body;
  console.log(name,email,phone,work,password,cpassword)
  if( !name || !email || !phone || !work || !password || !cpassword)
  {return res.status(422).json({error:"please filled the field properly"});}
 try{
  const userExist= await User.findOne({email:email})
    if(userExist){ 
        return res.status(422).json({error:"Email already Exist"});
    }
    else if(password!=cpassword)
    {
        return res.status(422).json({error:"Password are not matching"});
    }
    else{   
    const user=new User({name,email,phone,work,password,cpassword});
    res.status(201).json({message:"user registred successfully"});
    }
}
catch(error){
  console.log(error)
}

})


router.post('/signin',async (req,res) => {
    try{
       const {email,password} =req.body;
       if(!email ||!password){
           return res.status(400).json({error:"Please fill data"})
       }

       const userLogin= await User.findOne({email:email});
       if(userLogin)
       {
        const isMatach= await bcrypt.compare(password,userLogin.password)
        const token=await userLogin.generateToken();
        console.log(token);
    
        res.cookie("jwtoken",token,{
            expires:new Date(Date.now()+25892000000),
            httpOnly:true
            });
    
            if(!isMatach)
            {
                res.status(400).json({error:"user error"});
            }
            else{
                res.json({message:"User Signin successfully"})
            }
       }
       else{
          res.status(400).json({error:"Invalid Credentials"})
       }
    }
    catch(error){
         console.log(error)
    }
})

module.exports=router;