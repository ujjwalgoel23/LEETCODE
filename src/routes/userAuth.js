const express=require('express');
const authRouter= express.Router();
const {register,login,logout}=require("../controllers/userAuthent")
const userMiddleware=require("../middleware/userMiddleware")

//register
authRouter.post("/register",register);

//login
authRouter.post("/login",login);

//logout
authRouter.post("/logout",userMiddleware,logout);

//getProfile
// authRouter.get("/getProfile",getProfile);


module.exports=authRouter;