const captainModel=require('../models/captain.model');
const {validationResult}=require("express-validator");
const captainServices=require('../Services/captain.services')
const BlacklistToken = require('../models/blacklistToken.model');

module.exports.registerCaptain=async (req,res)=>{
     const error=validationResult(req);

     if(!error.isEmpty()){
        return res.status(404).json({errors:error.array()});
     }

     const {fullname,email,password,vehicle}=req.body;

     const isCaptainAlready=await captainModel.findOne({email});

     if(isCaptainAlready){
       return res.status(400).json({message:"captain already exist"})       
     }

     const hashPassword=await captainModel.hashPassword(password);
     
     const captain= await captainServices.createCaptain({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashPassword,
        color:vehicle.color,
        plate:vehicle.plate,
        vehicleType:vehicle.vehicleType,
        capacity:vehicle.capacity
     });

     const token=captain.getAuthToken();

     res.status(201).json({captain,token});
    
}

module.exports.loginCaptain= async(req,res)=>{

   const error=validationResult(req);

   if(!error.isEmpty()){
      return res.status(404).json({errors:error.array()});
   }

   const {email,password}=req.body;

   const captain=await captainModel.findOne({email}).select('+password');

   if(!captain){
      return res.status(401).json({message:"Invalid email and password"});
   }

   const isMatch= await captain.comparePassword(password);

   if(!isMatch){
      return res.status(401).json({message:"Invalid email and password"});
   }

   const token= captain.getAuthToken();

   res.cookie("token",token)

   res.status(200).json({token,captain});
}

module.exports.captainProfile= async(req,res,next)=>{

   res.status(200).json(req.captain);
}

module.exports.logoutCaptain=async(req,res)=>{

   res.clearCookie('token');

   const token=req.cookies.token || req.headers.authorization?.split(' ')[1]

   await BlacklistToken.findOne({token});

   res.status(200).json({message:'logged out'});
}