const {getLanguageById,submitBatch,submitToken}=require("../utils/problemUtility");
const Problem=require('../models/problem');


const createProblem=async (req,res)=>{
          
    const { title,description,difficulty,tags,
        visibleTestCases,hiddenTestCases,startCode,
        referenceSolution,problemCreator} = req.body;

        try{

            for(const {completeCode,language} of referenceSolution){

                const languageId= getLanguageById(language);
                 const submissions = visibleTestCases.map((testcase)=>({
                    source_code:completeCode,
                    language_id:languageId,
                    stdin:testcase.input,
                    expected_output:testcase.output
            
                 }));
                   
                 const submitResult= await submitBatch(submissions);

                 const resultToken=submitResult.map((value)=>value.token);

                const testResult = await submitToken(resultToken);

                for(const test of testResult){
                    if(test.status_id!=3){
                      return res.status(400).send("ERROR OCCURRED");
                    }

                }

            }

            const userProblem = await Problem.create({
                ...req.body,
                problemCreator:req.result._id
            })
            res.status(201).send("Problem Solved Successfully");

        }
        catch(err){
         res.status(400).send("ERROR : "+err);
        }

     
        

       
} // done

const updateProblem=async(req,res)=>{
    const {id}=req.params;

     const { title,description,difficulty,tags,
        visibleTestCases,hiddenTestCases,startCode,
        referenceSolution,problemCreator} = req.body;

        try{

            if(!id){
                return res.status(400).send("INVALID ID FIELD");
            }

            const exists=await Problem.findById(id);
            if(!exists){
                return res.status(404).send("ID is Not Present in Server");
            }

             for(const {completeCode,language} of referenceSolution){

                const languageId= getLanguageById(language);
                 const submissions = visibleTestCases.map((testcase)=>({
                    source_code:completeCode,
                    language_id:languageId,
                    stdin:testcase.input,
                    expected_output:testcase.output
            
                 }));
                   
                 const submitResult= await submitBatch(submissions);

                 const resultToken=submitResult.map((value)=>value.token);

                const testResult = await submitToken(resultToken);

                for(const test of testResult){
                    if(test.status_id!=3){
                      return res.status(400).send("ERROR OCCURRED");
                    }

                }

            }

            const FinalProblem =await Problem.findByIdAndUpdate(id,{...req.body},{runValidators:true, new:true});

            res.status(200).send(FinalProblem);

        }
        catch(err){
            res.status(500).send("ERROR : "+err);
        }


} //done

const deleteProblem=async(req,res)=>{
    const {id}=req.params;

    try{
          if(!id){
                return res.status(400).send("INVALID ID FIELD");
            }

            const exists=await Problem.findById(id);
            if(!exists){
                return res.status(404).send("ID is Not Present in Server");
            }

            const deletedProblem=await Problem.findByIdAndDelete(id);
            if(!deletedProblem){
                return res.status(404).send("Problem is Missing");
            }

            res.status(200).send("SUCCESSFULLY DELETED");

    }
    catch(error){
        res.status(500).send("ERROR : "+error);
        
    }

} //done

const fetchProblem=async(req,res)=>{

}

const getAllProblem=async(req,res)=>{

}

const solvedAllProblembyUser =async(req,res)=>{

}

module.exports={createProblem,updateProblem,deleteProblem,fetchProblem,getAllProblem,solvedAllProblembyUser};