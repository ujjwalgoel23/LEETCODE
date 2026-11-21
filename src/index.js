const express=require('express');
const app= express();
require('dotenv').config();
const main=require("./config/db");
const cookieParser = require('cookie-parser');


app.use(express.json());
app.use(cookieParser());



main()
.then(async ()=>{
    console.log("DB CONNECTED SUCCESSFULLY");

    app.listen(process.env.PORT,()=>{
    console.log("Listening at "+process.env.PORT )
});
})
.catch(err=>console.log("ERROR OCCURRED : "+err));
