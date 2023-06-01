const express = require('express')
const app = express()

app.get("/api",(req,res) =>{
    res.json({"user":["user1","user2","user3"]})
})

app.listen(8080,()=>console.log("server opened on port 8080"))