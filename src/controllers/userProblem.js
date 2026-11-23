const getLanguageById=require("../utils/problemUtility");


const createProblem=async (req,res)=>{

    const {title,description,difficulty,tags,
        visibleTestCases,hiddenTestCases,startCode,
        referenceSolution,problemCreator} = req.body;

        try{
            for(const {completeCode,language} of referenceSolution){

                const languageId= getLanguageById(language);

                 const submissions = visibleTestCases.map((input,output)=>({
            source_code:completeCode,
            language_id:languageId,
            stdin:input,
            expected_output:output
        }));



        

            }

        }
        catch(err){
         res.send("ERROR : "+err);
        }

     
        

       
}