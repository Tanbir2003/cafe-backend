import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";
import {auth,authorize} from "../middlewares/auth.js";
import mongoose from "mongoose";
const SECRET = "sometext";
import{register,login,showUsers,updateUser,deleteUser,profile} from "../controllers/userController.js";


const app = express();
const Router = express.Router();
import userModel from "../models/userModel.js";
Router.post("/register", register)

Router.post("/login",login)
Router.get("/showusers",auth,authorize("admin"),showUsers);
Router.patch("/:id",auth,authorize("admin"),updateUser);
Router.delete("/:id",auth,authorize("admin"),deleteUser);
Router.get("/:id/profile",profile)


export default Router;