// Create user Schema
const mongoose =require("mongoose");
const userSchema=mongoose.Schema({

phone_no:{
           type:Number,
           unique:true,
           required:true
},

Types:{
           type:Boolean,
           default:0
},
},{timestaps:true});

module.exports=User=mongoose.model('User',userSchema);