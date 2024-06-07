import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import connectDb from './helpers/Dbconfig.js'
import cookieParser from 'cookie-parser';
import productRoute from './routes/product.route.js'
import BlogRoute from './routes/blog.route.js'
import authRoute from './routes/auth.route.js'
import userRoute from './routes/user.route.js'
import cors from 'cors'
import { checkAuth } from './middlewares/jwt.middleware.js';
dotenv.config();
connectDb(process.env.DATABASE_URL)
const app = express()

const allowedOrigins = [
  'https://vedichoneyproduct.com',
  'http://localhost:5173',
]
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use('/api/product',productRoute)
app.use('/api/blog',BlogRoute)
app.use('/api/auth',authRoute)
app.use('/api/user',checkAuth,userRoute)
app.post('/', (req, res) => {
  res.send('Hello World!')
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})