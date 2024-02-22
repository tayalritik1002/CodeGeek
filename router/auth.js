const express=require('express');
const bcrypt=require('bcryptjs');
const multer  = require('multer');
const {storage}=require('../cloudinary/imageupload');
const upload = multer({dest:'./upload'})
const router=express.Router();
const User=require('../models/userSchema');
const authentication=require("../middleware/authentication");
var userinfo={};
router.post('/signup',async(req,res)=>{
    const {firstname,lastname,email,password,cpassword}=req.body;
    if(!firstname||!lastname||!email||!password||!cpassword)
    {
        return res.status(422).json({error:"Fill The Form Correctly"});
    }
    const userfound=await User.findOne({email:email});
    if(userfound)
    {
        return res.status(422).json({error:"User Already Register"});
    }
    const user=new User({firstname,lastname,email,password,cpassword});
    //bcrypt here
    const usersave=await user.save();
    console.log("Yessss");
    userinfo={
        ...usersave
    };
    if(usersave)
    {
        return res.status(201).json({message:"Successfully Registered"});
    }
    else{
        return res.status(422).json({message:"Error Occurred"});
    }
})
//signin
router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password)
    {
      res.status(422).json({message:"Fill The Details Correctly"});
    }
    const user=await User.findOne({email:email});
    if(!user)
    {
        res.status(422).json({message:"User Not Registered"});
    }
    else
    {
       const isMatch=await bcrypt.compare(password,user.password);
       let token=await user.generateToken();
       console.log("token=",token);
       res.cookie("jwtoken",token,{
           expires:new Date(Date.now()+25892000000),
           httpOnly:true
       });
       console.log(isMatch);
       if(isMatch)
       {
            //    res.send(token);
            //    res.header('x-auth-token',token)
         res.status(200).json({message:"SIGNIN SUCCESSFULLY"});
       }
       else
       {
         res.status(401).json({message:"INVALID CREDENTIAL"});
       }
    }
})
router.get('/logout',(req,res)=>{
    console.log("SIGNING OUT");
    res.clearCookie('jwtoken',{path:'/'});
    res.status(200).send("User Logout");
})
router.get('/',(req,res)=>{
    res.send("Sending from router side");
})
module.exports=router