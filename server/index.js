import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConnect from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import requirementsRoutes from './routes/requirementsRoutes.js';
import offersRoutes from './routes/offersRoutes.js';
import requestRoutes from './routes/requestRoutes.js';

const app = express();
dotenv.config();
dbConnect();

app.use(express.json());
app.use(cors());

app.use('/api/v1' , userRoutes);
app.use('/api/v1/requirements' , requirementsRoutes);
app.use('/api/v1/offers' , offersRoutes);
app.use('/api/v1/requests' , requestRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})