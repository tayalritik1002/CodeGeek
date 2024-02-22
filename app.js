const express=require('express');
const app=express();
const cookieparser=require('cookie-parser');
const router=express();
app.use(express.json());
app.use(require('./router/auth'));
app.use(cookieparser());
app.use(require('./router/question'));
require('./db/conn');
app.get('/',(req,res)=>{
   res.send("Hello From the server side");  
})
app.listen(5000,()=>{
    console.log("Listening to the port 5000.....");
})