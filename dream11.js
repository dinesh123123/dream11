
// import dependancies in app.js fiel

const express=require("express");
const dream11=express();
const user_routes=require("./routes/user_routes");


//setup routes
dream11.use("/api",user_routes);


//error handler
dream11.use((err,req,res,next)=>{res.status(404).json({
        error:'bad request'})
 });


module.exports =dream11;