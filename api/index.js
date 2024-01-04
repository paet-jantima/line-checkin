const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const roleRoute = require('./routes/role.js');
const authRoute = require('./routes/auth.js');
const userRoute = require('./routes/user.js');
const cookieParser = require('cookie-parser');
const timeRoute = require('./routes/time.js');

const { startCronJob, startCheck } = require('./cronJob/cronJob.js');

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    //origin: 'https://line-checkin.vercel.app',
    origin: 'http://localhost:4200/'
}));

app.use("/api/role", roleRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/time", timeRoute);

startCronJob();
startCheck();

app.use((obj, req, res, next) => {
    const statusCode = obj.status || 500;
    const message = obj.message || "Something went wrong";
    return res.status(statusCode).json({
        success: [200, 201, 204].some(a => a === obj.status) ? true : false,
        status: statusCode,
        message: message,
        data: obj.data
    });
});

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("db connect")
    } catch (error) {
        throw error;
    };
}

app.listen(8800, () => {
    connectMongoDB();
    console.log("connect")
});
