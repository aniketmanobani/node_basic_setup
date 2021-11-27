import express from 'express';
import RegisterController from '../controllers/RegisterController.js';
import LoginController from '../controllers/LoginController.js';
import HomeController from '../controllers/HomeController.js';
import verify from '../routes/verifyToken.js'

//
const route=express.Router();

route.post("/register",RegisterController)
route.post("/login",LoginController)
route.post("/post",verify,HomeController)


export default route;