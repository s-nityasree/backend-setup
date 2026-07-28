const express = require('express')
require("dotenv").config()
const userRoutes = require("./routes/userRoute")
const authRoutes = require('./routes/authRoutes')
const eventRoutes = require('./routes/eventRoute')
const db= require("./config/db")
const app = express()

app.use(express.json())


app.get('/',async(req,res)=>{
    try{
        const [rows] = await db.query("SELECT 1 AS message")
        res.json({
            success:true,
            message:"Database connected succesfully",
            data:rows
        });
    }
    catch(error){
        console.log("error in connecting db",error)

        res.status(500).json({
            sucess:false,
            message:"data base connection failed"
        })
    }
})

app.use("/users",userRoutes);

app.use('/auth',authRoutes);

app.use('/events',eventRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`server running successfully ${PORT}`)
})