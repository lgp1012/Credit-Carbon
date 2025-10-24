import express, { request, response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from "./routes/authRoutes.js"
import connectDB from './config/db.js';

dotenv.config();
const app = express();

app.use(cors());

app.use(express.json());

// Connect database
connectDB();

// Routes
app.use('/api/auth', authRoutes);

// Server listen in port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server starts at port: ${PORT}`);
})