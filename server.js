const express = require('express')
require("dotenv").config()//read .env file and make the value available to all through process.env 
// const dotenv = reuire("dotenv")
// dotenv.config()//process.env
const studentRoutes = require("./routes/studentRoutes")
const authRoutes = require("./routes/authRoutes")
const app = express()

app.use(express.json())

app.get('/',(req,res)=>{
    res.send("hello welcome ")
})

app.use('/students',studentRoutes)

app.use('/auth',authRoutes)

app.listen(3000,()=>{
    console.log("server running succesfully")
})