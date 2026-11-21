const redisClient = require("../config/redis");
const User=require("../models/user");
const validate= require("../utils/validator");
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken")


const register= async(req,res)=>{
    try{
        //validate the data
        validate(req.body);

        const {firstName,emailId,password}=req.body;

        req.body.password= await bcrypt.hash(password,10);
        req.body.role='user';

        const user= await User.create(req.body);

       const token= jwt.sign({_id:user._id, emailId:emailId},process.env.JWT_KEY,{expiresIn:3600});
       res.cookie('token',token,{expiresIn:"1h"}); 
       res.status(201).send("User Registered Successfully");

    }
    catch(err){
        res.status(400).send("ERROR : "+err);
    }

}

const login=async(req,res)=>{
    try{
        const {emailId,password}=req.body;
        if(!emailId || !password)
            throw new Error("INVALID CREDENTIALS");

        const user=await User.findOne({emailId});
        const match= bcrypt.compare(password,user.password);
 
        if(!match){
            throw new Error ("INVALID CREDENTIALS")
        }
        const token= jwt.sign({_id:user._id, emailId:emailId},process.env.JWT_KEY,{expiresIn:3600});
        res.cookie('token',token,{expiresIn:"1h"});
        res.status(200).send("LOGGED IN  SUCCESSFULLY");

    }
    catch(err){
        res.status(401).send("ERROR : "+err)

    }
}

const logout=async(req,res)=>{
    try{
        const {token}=req.cookies;
        //token blocklist me add kr denge redis meh till the expiry times
        //cookies ko clear kr denge   

        const payload=jwt.decode(token);
        
        await redisClient.set(`token:${token}`,'blocked');
        await redisClient.expireAt(`token:${token}`,payload.exp);

        res.cookie("token",null,{expires:new Date(Date.now())});
        res.send("LOGGED OUT SUCCESSFULLY");

    }
    catch(err){
        res.status(503).send("ERROR : "+err);
    }

}

module.exports={register,login,logout};