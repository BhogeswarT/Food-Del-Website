import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"



// app config
const app = express()
const port = 4000

//middleware
app.use(express.json())  //when we get request from fronend to backend,it will be passed by it.
app.use(cors()) //using this we can access backend from frontend

//db connection
connectDB();

app.get("/",(req,res)=>{
    res.send("API working")
})

//to run express server
app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})

