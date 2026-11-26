const axios = require('axios');
const submissions=require("../controllers/userProblem"); 

const getLanguageById = (lang)=>{
    const language={
        "c++":54,
        "java":62,
        "javascript":63
    }
    return language[lang.toLowerCase()];

}
const waiting =async(timer)=>{
    setTimeout(()=>{
        return 1;
    },timer);

}

const submitBatch = async(submissions)=>{
    const options={
    method:'POST',
    url:"https://judge0-ce.p.rapidapi.com/submissions/batch",
    params:{
        base64_encoded:'false'
    },
    headers:{
        'x-rapidapi-key':'b7055c95acmsh34946e84e4e6f61p1448adjsn7ebce46cd253',
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
        'Content-Type':'application/json'
    },
    data:{
        submissions
    }
};

async function fetchData(){
    try{
        const response=await axios.request(options);
        return response.data;
    }
    catch(err){
        throw new Error("ERROR in submitBatch : "+err);
    }
}
return await fetchData();
}



const submitToken = async(resultToken)=>{
    
    const options={
        method:'GET',
        url:"https://api.onlinecompiler.io/api/judge0/submissions/batch",
        params:{
            tokens:resultToken.join(","),
            base64_encoded:'false',
            fields:'*'
        },
        headers:{
            'x-rapidapi-key':'0d06a704a2msha80d5bafcf3f455p1d5167jsn8e6166b29a91',
             'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
        }
    };
    async function fetchData(){
    try{
        const response=await axios.request(options);
        return response.data;
    }
    catch(err){
        throw new Error("ERROR : "+err) 
    }
}
while(true){
const result= await fetchData();

const IsResultObtained= result.submissions.every((r)=>r.status_id>2);

if(IsResultObtained>2)
    return result.submissions;

await waiting(1000);

}

}


module.exports={getLanguageById,submitBatch,submitToken};

