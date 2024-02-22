const mongoose=require('mongoose');
const userQuestion=new mongoose.Schema({
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
    Name:{
        type:String
    }
});
const Question=mongoose.model('Question',userQuestion);
module.exports=Question;