const express=require('express');
const Problem = require('../models/problem');
const adminMiddleware = require('../middleware/adminMiddleware');
const problemRouter= express.Router();
const createProblem=require("../controllers/userProblem")

//requires admin access
problemRouter.post("/create",adminMiddleware,createProblem);
// problemRouter.patch("/:id",adminMiddleware,updateProblem);
// problemRouter.delete("/:id",adminMiddleware,deleteProblem);

// //does not requires admin access
// problemRouter.get("/:id",fetchProblem);
// problemRouter.get("/",getAllProblem);
// problemRouter.get("/user",solvedAllProblembyUser );


module.exports= problemRouter;