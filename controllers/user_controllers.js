// import dependancies in controllers js files
const User=require("../models/user_models");
const Otp=require("../models/user_otp");
const UserDetailsModel=require("../models/user_details");
const otpGenerator =require('otp-generator');


//create otp
 const User_Signup=async(req,res)=>{
 	const phone_no =req.body.phone_no;

 	try{
 		if(phone_no){
 			const user = await User.findOne({phone_no:phone_no});
 			if(!user){
 				const users=new User({phone_no:phone_no});
 				await users.save();
 				//otp generate
const OTP =otpGenerator.generate(4,{digits:true,upperCaseAlphabets: false, specialChars:false,lowerCaseAlphabets:false});
const otp =new Otp ({phone_no:phone_no,otp:OTP});
const result =await otp.save();          
res.status(200).send({result:true,msg:'otp send sucessfully',otp:result})
}else{
res.send({sucess:false,message:"You are allready Registered"})
}
 			}else{
 				res.send({sucess:false,message:"required parameters is phone_no"});
 			}

 		}
 		catch(error){
 			console.log(error.message)
 			res.status(400).json({sucess:false,message:"You are not Register",msg:error.message})
 		}
 	};


//create mobile number otp during login time
 const User_Login =async(req,res)=>{
 	const {phone_no} =req.body;

 	try{
 		if(phone_no ){
 			const user = await User.findOne({phone_no:phone_no});
 			if(user != null){
 				//otp generate
const OTP =otpGenerator.generate(4,{digits:true,upperCaseAlphabets: false, specialChars:false,lowerCaseAlphabets:false});
const otp =new Otp ({phone_no:phone_no,otp:OTP});
const result =await otp.save();
res.status(200).send({result:true,msg:'otp send sucessfully',otp:result})
}else{
res.send({sucess:false,message:"Firstly you go to Register page"})
}
 			}else{
 				res.send({sucess:false,message:" correct phone_no is required"});
 			}

 		}
 		catch(error){
 			console.log(error.message)
 			res.status(400).json({sucess:false,message:"Your are not login",msg:error.message})
 		}
 	};



// verify otp created api in nodejs
//verif otp
const verifyOtp =async(req,res)=>{
	const {phone_no,otp}=req.body;
	try{
		if(otp){
	const otpHolder =await Otp.find({otp})
	if(otpHolder.length>0){
		res.status(200).send({
			sucess:true,
			msg:"login sucessfully",
			data:otpHolder
		})
	}
	else{
		return res.status(201).send({sucess:true,msg:"your otp is worng"})
	}
}else{
	res.send({sucess:false,message:" required parameters is otp"});
}
}catch(error){
 			console.log(error.message)
 			res.status(400).json({sucess:false,message:"You try to again",msg:error.message})
 		}
};


// create usser details api
const adduserDetails=async(req,res)=>{
	const id=req.params.id;
	const {userId,user_name,Adhar_no}=req.body;

		const post=await UserDetailsModel.findOne({id:id});
		if(post){
				res.status(403).json({sucess:false,message:"You are allready filled data"});
		}else{

			if(userId && user_name && Adhar_no){
				try{
					const comment= new UserDetailsModel({
						userId:req.body.userId,
						user_name:req.body.user_name,
			            Adhar_no:req.body.Adhar_no,
					});
			const userdata= await comment.save();
	    
	  res.status(200).json({sucess:true,message:"data added",data:userdata});
}catch(error){
			res.status(500).json(error.message);

		}
}

else{
	res.send({sucess:false,message:"parameter required userId,user_name,Adhar_no"});
}

	}
	
};



module.exports ={
User_Signup,
User_Login,
verifyOtp,
adduserDetails

};