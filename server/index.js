import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConnect from './config/database.js';
import requirementsRoutes from './routes/requirementsRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
dotenv.config();
dbConnect();

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use('/api/v1' , userRoutes);
app.use('/api/v1/requirements' , requirementsRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})