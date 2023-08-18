import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
// auth
app.use(cookieParser());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

// routes
import userRouter from "./routes/userRouter.js";
app.use('/', userRouter);

import AuthRoute from "./routes/AuthRoute.js";
app.use('/', AuthRoute);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})
