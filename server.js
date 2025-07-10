import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const dbuser=encodeURIComponent(process.env.DBUSER);
const dbpass=encodeURIComponent(process.env.DBPASS);


mongoose.connect(`mongodb://localhost:27017/merncafe`).then(() => {
   app.listen(8080, () => {
   console.log("Server started");
 });
 });

// mongoose.connect(`mongodb+srv://${dbuser}:${dbpass}@cluster0.0wl8neg.mongodb.net/merncafe?retryWrites=true&w=majority&appName=Cluster0`)
// .then(() => {
//   app.listen(8080, () => {
//     console.log("Server started");
//   });
// });

app.use("/api/users",userRouter);