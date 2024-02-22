const jwt=require("jsonwebtoken");
const User=require("../models/userSchema")
const authentication=async(req,res,next)=>{
    console.log("middleware");
    try{
        const token=req.cookies.jwtoken;
        // const token=req.cookies.jwtoken;
        console.log(token);
        const verifyToken=jwt.verify(token,process.env.SECRET_KEY);
        const rootUser=await User.findOne({
            _id: verifyToken._id,
            "tokens.token": token,
          });
        if(!rootUser){
            return res.status(401).send("INVALID USER TOKEN ACCESS DENIED by lalit........");
        }
        req.token=token;
        req.rootUser=rootUser;
        req.userID=rootUser._id;
        // console.log(req.userID);
        next();
    }catch(err){
        res.status(401).send("INVALID USER TOKEN ACCESS DENIED........");
        console.log(err);
    }
}
module.exports=authentication;