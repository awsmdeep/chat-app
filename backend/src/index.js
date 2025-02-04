import express from "express"
import authRoutes from "./routes/auth.route.js"
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser"
import messageRouter from "./routes/message.route.js"
import cors from "cors"

dotenv.config()

const app=express();
const port=process.env.PORT;
app.use(express.json())
app.use(cookieParser())
app.use(cors(
    {origin:"http://localhost:5173",
    credentials:true}
))
app.use("/api/auth",authRoutes)
app.use("/api/message",messageRouter)



app.listen(port,()=>{
    console.log(`server running at port number ${port}`)
    connectDB()
    
})