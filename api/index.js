import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!...');
  })
  .catch((err) => {
    console.log(err);
  });



const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your client URL
  credentials: true, // Allow cookies to be sent
}));

app.use(cookieParser());


const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, '/client/dist')));


 app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
 })



app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});




app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);



app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
