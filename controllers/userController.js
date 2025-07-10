import express from "express";
import jwt from "jsonwebtoken";
const SECRET = "sometext";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import {auth, authorize} from "../middlewares/auth.js";


const register = async (req, res) => {
  try {
    const { firstname,lastname,email, password,role,status} = req.body;
    const hashedpwd = await bcrypt.hash(password, 10);
    const user = {
      firstname,
      lastname,
      role: role || "user",
      email,
      password: hashedpwd,
      status: status || "active"
    };
    const result = await userModel.create(user);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};



const login=async (req, res) => {
  try {
    const { firstname,lastname,email, password,role,status} = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (isMatch) {
        const userObj = {
          firstname: existingUser.firstname,
          lastname: existingUser.lastname,
          email: existingUser.email,
          role: existingUser.role,
          status: existingUser.status,
        };
        const token = jwt.sign(userObj, SECRET, { expiresIn: "1h" });
        res.status(200).json({ user: userObj, token });
      } else {
        res.status(400).json({ message: "Invalid Password" });
      }
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const showUsers=async(req,res)=>{
    try{
        const result=await userModel.find();
      res.status(200).json(result);

    }
    catch(err){

    }
}

const updateUser=async(req,res)=>{
  try{
    const id=req.params.id;
  const body=req.body;
  const result=await userModel.findByIdAndUpdate(id,body);
  res.status(200).json(result);

  }catch(err){
    console.log(err);
    res.status(500).json({message:"Something went wrong"});
  }
  
}

const deleteUser=async(req,res)=>{
  try{

    const id=req.params.id;
  const result=await userModel.findByIdAndDelete(id);
  res.status(200).json(result);
  }catch(err){
    console.log(err);
    res.status(500).json({message:"Something went wrong"});
  }
};

const profile=async(req,res)=>{
   try{
  const id = req.params.id;
  const result = await userModel.findOne({ _id: id });
  }catch(err){
  console.log(err);
  res.status(500).json({ message: "Something went wrong" });
}};

export { register, login, showUsers, updateUser, deleteUser, profile };