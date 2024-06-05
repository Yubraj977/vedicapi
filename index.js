import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import connectDb from './helpers/Dbconfig.js'
import cookieParser from 'cookie-parser';
import productRoute from './routes/product.route.js'

dotenv.config();
connectDb(process.env.DATABASE_URL)
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use('/api/product',productRoute)
app.get('/', (req, res) => {
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