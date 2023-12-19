import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import roleRoute from './routes/role.js';
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js';
import cookieParser from 'cookie-parser';
import timeRoute from './routes/time.js';


import { startCronJob ,startCheck } from'./cronJob/cronJob.js'
const app = express();
dotenv.config();

app.use(express.json() );
app.use(cookieParser());
app.use(cors({
    credentials:true,
    origin: 'http://localhost:4200'
}
));
app.use("/api/role", roleRoute);
app.use("/api/auth", authRoute); 
app.use("/api/user", userRoute); 
app.use("/api/time", timeRoute); 



startCronJob(); 
startCheck(); 
// ให้เรียกใช้ฟังก์ชันตรวจสอบทุกๆวัน ก่อนเวลา 00:00 (เที่ยงคืน)


//error handler middleware
app.use((obj, req ,res ,next)=>{
    const statusCode = obj.status || 500;
    const message = obj.message || "Something went wrong";
    return res.status(statusCode).json({
        success:[200,201,204].some(a=> a=== obj.status) ? true : false,
        status:statusCode,
        message:message,
        data:obj.data 
        
    });
});
//db connect
const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("db connect")
    }catch(error){
        throw error;
    };
}



app.listen(8800, ()=>{
    connectMongoDB(); 
    console.log("connect")
});


