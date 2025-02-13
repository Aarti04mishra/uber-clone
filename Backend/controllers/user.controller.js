const userModel=require('../models/user.model');
const {validationResult}=require("express-validator")
const userServices=require("../Services/user.services");
const BlacklistToken = require('../models/blacklistToken.model');

module.exports.registerUser=async (req,res)=>{
     const error=validationResult(req);

     if(!error.isEmpty()){
        return res.status(404).json({errors:error.array()});
     }

     const {fullname,email,password}=req.body;

      const isUserAlready=await userModel.findOne({email});
     
      if(isUserAlready){
          return res.status(400).json({message:"captain already exist"})       
      }

     const hashPassword=await userModel.hashPassword(password);
     
     const user= await userServices.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashPassword
     });

     const token=user.getAuthToken();

     res.status(201).json({user,token});

}

module.exports.loginUser=async(req,res)=>{
   const error=validationResult(req);

   if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    

   const {email,password} = req.body;

   const user= await userModel.findOne({email}).select('+password');

   if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
   
   const isMatch= await user.comparePassword(password);

   if(!isMatch){
      return res.status(401).json({ message: "Invalid Password" });
   }

   const token=user.getAuthToken();

   res.cookie("token",token)



   res.status(200).json({ user, token });

}

module.exports.profileUser = async(req,res)=>{
    
   res.status(200).json(req.user);
}


module.exports.logoutUser= async(req,res)=>{

   res.clearCookie('token');

   const token=req.cookies.token || req.headers.authorization?.split(' ')[1];

   await BlacklistToken.create({token});

   res.status(200).json({message:'logged out'})

}