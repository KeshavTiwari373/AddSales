import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Connecting to MongoDB through Mongoose
mongoose.connect(process.env.MONGODB_URL, {
});

mongoose.connection.on('connected', () => {
    console.log("DB Connected");
});

mongoose.connection.on('error', (err) => {
    console.log("Error in DB Connection: ", err);
});

// Import models with correct paths and extensions
import './models/user_model.js';
import './models/post_model.js';

app.use(cors());
app.use(express.json());

// Import and use routes with correct paths and extensions
import userRoute from './routes/user_route.js';
import postRoutes from './routes/post_routes.js';

app.use(userRoute);
app.use(postRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});
