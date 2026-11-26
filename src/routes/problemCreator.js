const express=require('express');
const Problem = require('../models/problem');
const adminMiddleware = require('../middleware/adminMiddleware');
const userMiddleware=require("../middleware/userMiddleware");
const problemRouter= express.Router();

const {createProblem,updateProblem,deleteProblem,fetchProblem,getAllProblem,}=require("../controllers/userProblem");

//requires admin access
problemRouter.post("/create",adminMiddleware,createProblem);
problemRouter.put("/update/:id",adminMiddleware,updateProblem);
problemRouter.delete("/delete/:id",adminMiddleware,deleteProblem);

// //does not requires admin access
problemRouter.get("/problemById/:id",fetchProblem);
problemRouter.get("/getAllProblem",getAllProblem);
problemRouter.get("/problemSolvedByUser",solvedAllProblembyUser );


module.exports= problemRouter;