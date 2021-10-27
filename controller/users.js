import express from 'express';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModal from "../models/userModel.js";
const secret = 'test';
const router = express.Router();

export const getSeedUsers = async (req, res) => {
        // Remove All Users
        // await User.remove({});

        // Create Users ( SEED ) from data.js 
        const createdUsers = await User.insertMany(data.users);

        // Display Created Users
        res.send({ createdUsers });
        
    
}


export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
      const oldUser = await UserModal.findOne({ email });
      if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });
      const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
      if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
      const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "24h" });
      res.status(200).json({ result: oldUser, token });
    } catch (err) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  
  export const signup = async (req, res) => {
    const { email, password, firstName, lastName, googleRequest } = req.body;
  
    try {
      const oldUser = await UserModal.findOne({ email });
  
      if (oldUser) {
        if (googleRequest) {
          return res.status(200).json({ message: "User already exists" });
        } else {
          return res.status(400).json({ message: "User already exists" });
        }
      }
  
      const hashedPassword = await bcrypt.hash(password, 12);
  
      const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
  
      const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "24h" } );
  
      res.status(201).json({ result, token });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      
      console.log(error);
    }
  };
  


export const listUsers = async (req, res) => {   
    try {
        const users = await UserModal.find()
        res.send(users);
    } catch (error) {    
        res.status(404).json({ message: error.message });

    }
}

export const addUser = async (req, res) => {
  const { email, password, name, googleRequest } = req.body;
  
  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) {
      if (googleRequest) {
        return res.status(200).json({ message: "User already exists" });
      } else {
        return res.status(400).json({ message: "User already exists" });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({ email, password: hashedPassword, name });

    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "24h" } );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
}

export const editUser = async (req, res) => {
    let hashedPassword = null;
    const { id } = req.params;
    const { name, email, password, isAdmin } = req.body;
    
    if (password) {
        hashedPassword = await bcrypt.hash(password, 12);
    }

    const updatedUser = { name, email, hashedPassword, isAdmin, _id: id };

    await UserModal.findByIdAndUpdate(id, updatedUser, { new: true });

    res.json({ message: "User updated successfully." });
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    await UserModal.findByIdAndRemove(id);

    res.status(201).send(`User Deleted`);
}

export const getUser = async (req, res) => {   
    const { id } = req.params;
    try {
        const user = await UserModal.findById(id, { password: 0 });
        res.status(200).json({data: user});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const editProfile = async (req, res) => {
    let hashedPassword = null;
    const { id } = req.params;
    const { name, email, avatar, password } = req.body;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 12);
    }
    const updatedUser = { name, email, avatar, hashedPassword, _id: id };
    try {
      const user = await UserModal.findByIdAndUpdate(id, updatedUser, { new: true, password: 0 });
      res.status(200).json({ data: user });
    } catch (error) {
      res.status(500).json(error)
    }
  }
  

export default router;