import express from 'express';
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const UserModel = mongoose.model('UserModel');

// Ensure JWT_SECRET is defined
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

router.post("/signup", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        if (!firstName || !lastName || !password || !email) {
            return res.status(400).json({ error: "One or more fields are empty" });
        }

        const userInDB = await UserModel.findOne({ email: email });
        if (userInDB) {
            return res.status(409).json({ error: "User already registered with this email" });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const newUser = new UserModel({ firstName, lastName, email, password: hashedPassword });
        await newUser.save();
        
        res.status(201).json({ result: "User SignUp Successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
        if (!password || !email) { 
            return res.status(400).json({ error: "Please provide valid email and password." });
        }
  
        const userInDB = await UserModel.findOne({ email: email });
        if (!userInDB) {
            return res.status(401).json({ error: "Unauthorized" });
        }
  
        const didMatch = await bcryptjs.compare(password, userInDB.password);
        if (didMatch) {
            const jwtToken = jwt.sign({ _id: userInDB._id }, JWT_SECRET, { expiresIn: '1h' });
            const userInfo = { email: userInDB.email, firstName: userInDB.firstName, lastName: userInDB.lastName };
  
            res.status(200).json({ result: { token: jwtToken, user: userInfo } });
        } else {
            res.status(401).json({ error: "Unauthorized" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
