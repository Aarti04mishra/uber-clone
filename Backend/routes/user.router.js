const express=require('express');
const router=express.Router();
const {body}=require('express-validator')
const userController=require("../controllers/user.controller");
const authMiddleware=require("../middlewares/auth.middleware")

router.post("/register",[
    body('email')
    .isEmail()
    .withMessage('Invalid Email'),
  
  body('fullname.firstname')
    .isLength({ min: 3 })
    .withMessage('First name must be at least 3 characters long.'),
  
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter.')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter.')
    .matches(/\d/)
    .withMessage('Password must contain at least one number.')
    .matches(/[@$!%*?&]/)
    .withMessage('Password must contain at least one special character.'),
],userController.registerUser)



router.post(
  "/login",
  [
    body('email')
      .isEmail()
      .withMessage('Invalid Email'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long.')
  ],
  userController.loginUser
);

router.get(
  "/profile",authMiddleware.authUser,userController.profileUser
)

router.get("/logout",authMiddleware.authUser,userController.logoutUser)


module.exports=router