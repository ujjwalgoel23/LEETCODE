const axios = require('axios'); 

const getLanguageById = (lang)=>{
    const language={
        "c++":54,
        "java":62,
        "javascript":63
    }
    return language[lang.toLowerCase()];

}

const submitBatch = async(submissions)=>{
    const options={
    method:'POST',
    url:"https://api.onlinecompiler.io/api/judge0/submissions/batch",
    params:{
        base64_encoded:'true'
    },
    headers:{
        'x-rapidapi-key':'099b82a72a2283186674ed5c8c41a040',
        // 'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
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
        throw new Error("ERROR : "+err) 
    }
}
return await fetchData();
}

const waiting =async(timer)=>{
    setTimeout(()=>{
        return 1;
    },timer);

}

const submitToken = async(resultToken)=>{
    
    const options={
        method:'GET',
        url:"https://api.onlinecompiler.io/api/judge0/submissions/batch",
        params:{
            tokens:resultToken.join(","),
            base64_encoded:'true',
            fields:'*'
        },
        headers:{
            'x-rapidapi-key':'099b82a72a2283186674ed5c8c41a040',
            // 'x-rapidapi-host':""
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

