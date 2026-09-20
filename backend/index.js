// import express from 'express';
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import courseRoute from "./routes/courseRoute.js";
// import cors from "cors";
// import http from "http";
// import bodyParser from 'body-parser';
// import cookieParser from 'cookie-parser';
// cors configuration at timestamp : 3:57:00

const express = require ("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const http = require('http');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const courseRoute= require('./routes/courseRoute');
const userRoute = require('./routes/userRoute');
const fileUpload =require("express-fileupload");

const cloudinary = require('cloudinary').v2;


const app = express();
dotenv.config();
const port = process.env.PORT;
console.log(process.env.API_KEY);

const DB_URI = process.env.MONGO_URI;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: "/tmp/",
}));



        //cloudinary configuration
        // cloudinary.config({
        //     Cloud_name: process.env.Cloud_name,
        //     API_Key: process.env.API_Key,
        //     API_Secret: process.env.API_Secret
        
        // });

app.use("/api/courseroute", courseRoute);
app.use("/api/userroute", userRoute);

(async () => {
    try{

        console.log("connecting...");
       
        await mongoose.connect(DB_URI);
        console.log("connected to MONGODB");

    } catch(error) {
        console.log(error);
    }

})();



// app.get('/', (req,res) => {
//     res.send("Welcome to Course-app-backend");
// })

app.listen(port, () => {
    console.log(`Listening on port ${port} ...`);
})