const express = require('express')
const cors = require("cors")
require("dotenv").config()
const userRoutes = require("./routes/userRoute")
const authRoutes = require('./routes/authRoutes')
const eventRoutes = require('./routes/eventRoute')
const registartionRoute = require('./routes/registrationRoute')
const reportRoute=require('./routes/reportRoute')
const db= require("./config/db")
const app = express()
app.use(cors())
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

app.use('/registrations',registartionRoute)

app.use('/reports',reportRoute)

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`server running successfully ${PORT}`)
})