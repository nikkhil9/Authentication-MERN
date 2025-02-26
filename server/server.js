import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";

import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from "./routes/userRoutes.js";
import userModel from "./models/userModel.js";

const app = express();
const port = process.env.PORT || 4000
connectDB();

const allowedOrigins = ['https://authenticate12.netlify.app/']

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
      origin: allowedOrigins,
      credentials: true,
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      allowedHeaders: "Content-Type,Authorization",
    })
  );



app.get('/' , (req,res)=>res.send("API Working fine" ));
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)


app.listen(port , ()=> console.log(`Server started on PORT :${port}`));
