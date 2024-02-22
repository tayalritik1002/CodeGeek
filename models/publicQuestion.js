const mongoose=require('mongoose');
const publicQues=new mongoose.Schema({
    QuestionName:{
        type:String,
        required:true
    },
    QuestionTag:{
        type:String,
        required:true
    },
    QuestionUrl:{
        type:String,
        required:true
    },
    QuestionSource:{
        type:String,
        required:true
    },
    Like:{
        type:Number,
        default:0
    },
    Dislike:{
        type:Number,
        default:0
    },
    Name:{
        type:String,
    }
});
const Publicques=mongoose.model('Publicques',publicQues);
module.exports=Publicques;