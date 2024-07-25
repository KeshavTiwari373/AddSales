import pkg from 'jsonwebtoken';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { verify } = pkg;
const UserModel = mongoose.model('UserModel');

const protectedResource = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "User not logged in" });
    }
    const token = authorization.replace("Bearer ", "");
    verify(token, process.env.JWT_SECRET, async (error, payload) => {
        if (error) {
            return res.status(401).json({ error: "User not logged in" });
        }
        const { _id } = payload;
        try {
            const dbUser = await UserModel.findById(_id);
            if (!dbUser) {
                return res.status(401).json({ error: "User not found" });
            }
            req.user = dbUser;
            next();
        } catch (err) {
            console.error('Error fetching user:', err);
            return res.status(500).json({ error: "Internal server error" });
        }
    });
};

export default protectedResource;
