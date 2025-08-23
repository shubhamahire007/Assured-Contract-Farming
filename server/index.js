import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/userRoutes.js';
import dbConnect from './config/database.js';

const app = express();
dotenv.config();
dbConnect();

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use('/api/v1' , router)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})