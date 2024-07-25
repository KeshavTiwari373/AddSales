import express from 'express';
import mongoose from 'mongoose';
import protectedRoute from '../middleware/protectedResource.js';

const router = express.Router();
const PostModel = mongoose.model('PostModel');

router.post("/addsale", protectedRoute, async (req, res) => {
    const { productName, quantity, amount } = req.body;
    if (!productName || !quantity || !amount) {
        return res.status(400).json({ error: "One or more fields are empty" });
    }
    req.user.password = undefined;
    const postObj = new PostModel({ productName, quantity, amount, author: req.user });
    await postObj.save()
        .then((newPost) => {
            res.status(201).json({ post: newPost });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

router.get("/topsales", protectedRoute, async (req, res) => {
    try {
        const topSalesPosts = await PostModel.find({ author: req.user._id })
            .sort({ quantity: -1 })
            .limit(5)
            .exec();

        res.json(topSalesPosts);
    } catch (error) {
        console.error('Error occurred while fetching documents:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get("/totalrevenue", protectedRoute, async (req, res) => {
    try {
        const totalRevenueResult = await PostModel.aggregate([
            { $match: { author: req.user._id } },
            { $group: { _id: null, totalRevenue: { $sum: { $multiply: ["$quantity", "$amount"] } } } },
            { $project: { _id: 0, totalRevenue: 1 } }
        ]);

        const totalRevenue = totalRevenueResult.length > 0 ? totalRevenueResult[0].totalRevenue : 0;

        res.json(totalRevenue);
    } catch (error) {
        console.error('Error occurred while fetching total revenue:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
