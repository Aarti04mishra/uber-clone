const express=require('express');
const router=express.Router();
const {body}=require('express-validator');
const captainController=require('../controllers/captain.controller');
const authMiddleware=require("../middlewares/auth.middleware")

router.post("/register",[
       body('email')
        .isEmail()
        .withMessage('Invalid Email'),
      
      body('fullname.firstname')
        .isLength( {min: 3 })
        .withMessage('First name must be at least 3 characters long.'),
      
      body('password')
        .isLength( {min: 8 })
        .withMessage('Password must be at least 8 characters long.')
        .matches(/[a-z]/)
        .withMessage('Password must contain at least one lowercase letter.')
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least one uppercase letter.')
        .matches(/\d/)
        .withMessage('Password must contain at least one number.')
        .matches(/[@$!%*?&]/)
        .withMessage('Password must contain at least one special character.'),

      body('vehicle.color').isLength({min:3}).withMessage('Color must be atleast 3 characters long'),
      body('vehicle.plate').isLength({min:3}).withMessage('Plates must be atleast 3 characters long'),
      body('vehicle.capacity').isInt({min:2}).withMessage('Capacity must be atleast more than 1'),
      body('vehicle.vehicleType').isIn(['Car','Auto','Motorcycle']).withMessage('Invalid Vehicle Type')


],captainController.registerCaptain);


router.post("/login", [
  body('email')
    .isEmail()
    .withMessage('Invalid Email'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.')
],captainController.loginCaptain);

router.get("/profile",authMiddleware.authCaptain,captainController.captainProfile);

router.get("/logout",authMiddleware.authCaptain,captainController.logoutCaptain)



module.exports=router