const express=require("express");
const app=express();

require('dotenv').config();
const PORT = process.env.PORT || 4000;

//cookie-parser
const cookeParser = require("cookie-parser");
app.use(cookeParser());

// app.use(express.json());

app.use(express.json());

//route import and mount
const user=require("./routes/user");
app.use("/api/v1",user);

//activate
app.listen(PORT,()=>{
    console.log(`App is running at at ${PORT}`);
});