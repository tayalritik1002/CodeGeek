const express=require('express');
const authentication = require('../middleware/authentication');
const app=express();
const router=express.Router();
const Question=require('../models/userquestion');
const User = require('../models/userSchema');
const Publicques=require('../models/publicQuestion');
app.use(express.json());
const multer  = require('multer');
const {storage}=require('../cloudinary/imageupload');
const upload = multer({storage})
router.post('/QuestionData',authentication,async (req,res)=>{
    console.log("Verify Page");
    const user=req.userID;
    const userdetail=await User.findById({_id:user});
    console.log(userdetail);
    res.send(userdetail);
    try{
        // const quest=new Question(req.body);
        // const createques=await quest.save();
        // console.log(createques);
        // console.log("hi");
        // console.log(user);
        if(!user)return res.status(404).send('User Not Found');
        // console.log(quest._id);
        // user.questions.push({id:createques._id});
        // console.log("because");
        // await user.save();
        // console.log(createques);
    }catch(e){
        // console.log("catch");
        res.status(404).send("User Not Login");
    }
})
router.post('/questionsave',authentication,async (req,res)=>{
    const user=await User.findById(req.userID);
    // const Name=user.name;
    if(!user)return res.status(404).send('User Not Found');
    const {QuestionName,QuestionTag,QuestionUrl,QuestionSource,Name}=req.body;
    if(!QuestionName&&!QuestionTag&&!QuestionUrl&&!QuestionSource){
        return res.status(422).json({message:"User Fill the form Correctly"});
    }
    try{
        const quesdetail=new Question({QuestionName,QuestionTag,QuestionUrl,QuestionSource,Name});
        console.log(quesdetail);
        const questionsaved=await quesdetail.save();
        user.questions.push({id:questionsaved._id});
        await user.save();
        // console.log(userone);
        res.status(200).json({message:"Question Added Succesfully"});
    }catch(err){
        res.status(422).send("Error Occured");
        console.log(err);
    }
})
router.get('/QuestionShow',authentication,async(req,res)=>{
     const user=req.userID;
     const userdetail=await User.findById({_id:user});
     console.log(userdetail);
     if(!user) res.status(400).send("No user find");
     const user_data= await User.findById(user);
    //  console.log(user_data.questions);
    let questionObj =[];
     for(let i=0; i<user_data.questions.length; i++)
     {
        //  console.log(user_data.questions[i].id);
         const question_data= await Question.findById(user_data.questions[i].id);
         questionObj = [...questionObj,question_data];
     }
    //  console.log(user_data.firstname);
    questionObj.push(user_data.firstname);
    //  console.log(questionObj);
     res.status(200).send(questionObj);
     
})
router.get('/Test',authentication,async(req,res)=>{
    const user=await User.findById({_id:req.userID});
    // console.log(user);
    res.send(user);
})
// router.post('/profileimage',authentication,async(req,res)=>{
//     const userdet=await User.findById({_id:req.userID});
//     console.log(req.body);
//     console.log(req.file)
//     // userdet.image=req.file.path.toString();
//     res.send(userdet);
//     console.log("Image Data Showing");
//     // const user=await User.findOne(userinfo.email);
//     console.log(userdet);
//     // userdet.image.url=req.file.path
//     // await userdet.save()
// })
router.post('/publicquessave',async(req,res)=>{
    const {QuestionName,QuestionTag,QuestionUrl,QuestionSource,Like,Dislike,Name}=req.body;
    if(!QuestionName&&!QuestionTag&&!QuestionUrl&&!QuestionSource){
        return res.status(422).json({message:"User Fill the form Correctly"});
    }
    const publicques=new Publicques({QuestionName,QuestionTag,QuestionUrl,QuestionSource,Like,Dislike,Name});
    const publicdet=await publicques.save();
    res.status(200).json({message:"Added Successfully"});
    // console.log(publicdet);
})
router.post('/public/:id',async(req,res)=>{
    try
    {
        console.log(req.params.id);
        // res.json({message:"success"});
        const publicuser=await Question.findById(req.params.id);
        console.log(publicuser.Name);
        const newpubuser=new Publicques({QuestionName:publicuser.QuestionName,QuestionTag:publicuser.QuestionTag,QuestionUrl:publicuser.QuestionUrl,QuestionSource:publicuser.QuestionSource,Name:publicuser.Name});
        const pubuser =await newpubuser.save()
        res.send(pubuser);
        console.log(pubuser);
    }
    catch(e){
        console.log(e);
    }
}
)
router.get('/showpublic',async(req,res)=>{
    try
    {
        const alldata=await Publicques.find()
        // console.log(alldata)
        res.send(alldata);
    }
    catch(e)
    {
        console.log("HIIIIIIII HELLLLOOOOO");
    }
})
router.put('/like/:id',async(req,res)=>{
    try{
       const userquestionlike=await Publicques.findById({_id:req.params.id});
       console.log(userquestionlike.Like);
       userquestionlike.Like++;
       res.send(userquestionlike);
       await userquestionlike.save();
    //    console.log(userquestionlike.Like);
    }catch(e){
        console.log(e);
    }
})
router.put('/dislike/:id',async(req,res)=>{
    try{
       const userquestionlike=await Publicques.findById({_id:req.params.id});
       console.log(userquestionlike.Like);
        userquestionlike.Dislike++;
        await userquestionlike.save();
        console.log(userquestionlike.Dislike);
       res.send(userquestionlike);
    }catch(e){
        console.log(e);
    }
})
router.post('/profileimage',upload.single('image'),authentication,async(req,res)=>{
    const user=await await User.findById(req.userID);
    user.image.url=req.file.path;
    user.image.filename=req.file.filename;
    console.log(req.body,req.file);
    res.send(req.file);
    await user.save();
})
module.exports=router