import express from "express";

const app = express();

app.get("/",(req,res)=>{
    res.send("chatting")
});

app.listen(5000,()=>{
    console.log("http server running on port:5000")
})
