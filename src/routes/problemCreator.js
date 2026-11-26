const express=require('express');
const Problem = require('../models/problem');
const adminMiddleware = require('../middleware/adminMiddleware');
const userMiddleware=require("../middleware/userMiddleware");
const problemRouter= express.Router();

const {createProblem,updateProblem,deleteProblem,getProblemById,getAllProblem,solvedAllProblembyUser}=require("../controllers/userProblem");

//requires admin access
problemRouter.post("/create",adminMiddleware,createProblem);
problemRouter.put("/update/:id",adminMiddleware,updateProblem);
problemRouter.delete("/delete/:id",adminMiddleware,deleteProblem);

//  requires user access
problemRouter.get("/problemById/:id",userMiddleware,getProblemById);
problemRouter.get("/getAllProblem",userMiddleware,getAllProblem);
problemRouter.get("/problemSolvedByUser",userMiddleware,solvedAllProblemByUser );


module.exports= problemRouter;