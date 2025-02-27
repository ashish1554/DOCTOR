import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import connectCloudinary from './config/cloundinary.js';
import connectDB from './config/mongodb.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';
// const bcrypt = require('bcrypt');

//app
const app= express();
//port number
const port=process.env.PORT || 4000;
connectDB()
connectCloudinary()

//middlewares
app.use(express.json())


// app.use(cors())
app.use(cors({
  origin: ["https://doctor-frontend-sz9n.onrender.com",'http://localhost:5173','http://localhost:5174','https://doctor-admin-zpfq.onrender.com'],
  credentials: true
}));

//end point
app.use('/api/admin',adminRouter);
app.use('/api/doctor',doctorRouter);
app.use('/api/user',userRouter)
//localhost:4000/api/admin/add-doctor
app.get('/', (req, res) => {
  res.send('Hello from server!!')
});

app.listen(port,()=>{
    console.log("Server started at " + port)
});