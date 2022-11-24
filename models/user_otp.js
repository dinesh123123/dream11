const mongoose = require('mongoose');

const otpSchema =mongoose.Schema({
	phone_no:{type:Number,
		required:true
	},
	otp:{
		type:String,
		required:true
	},
	createdAt:{
		type:Date,
		default:Date.now,
		index:{expires:600}
	},
},{timestamps:true});

module.exports =Otp=mongoose.model('Otp',otpSchema);