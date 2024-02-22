const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    questions: [
        {
          id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question',
            required: true,
          },
        },
      ],
    tokens:[
       {
          token:
          {
            type:String,
            required:true
         }
       }
    ],
    image:{
      url:{
        type:String,
      default:'https://i.imgur.com/6NKPrhO.png'
      },
      filename:{
        type:String,
        default:"nullll"
      }
    }
});
userSchema.methods.generateToken=async function(){
 try{
   const token=jwt.sign({_id:this._id},process.env.SECRET_KEY);
   this.tokens=this.tokens.concat({token:token});
   await this.save();
   console.log(token);
   return token;
 }catch(err){
    console.log(err);
 }
}
userSchema.pre('save',async function(next){
    console.log("bcrypting password.....");
    if(this.isModified('password'))
    {
        console.log("Hoga incrypt");
        this.password=await bcrypt.hash(this.password,12);
        this.cpassword=await bcrypt.hash(this.cpassword,12);
    }
    next();
})
const User=mongoose.model('User',userSchema);
module.exports=User;