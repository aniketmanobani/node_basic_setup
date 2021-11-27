import express from "express";
import route from "./routes/auth.js";
import dotenv from 'dotenv'
import mongoose from "mongoose";
import bodyParser from 'body-parser';
const app = express();
dotenv.config();

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true },

  () => console.log("db connected")
);


//middlewares
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use("/api", route);


app.listen(8000, () => console.log("server started"));
