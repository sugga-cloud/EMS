import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import apiRouter from './routers/apiRouter.js';
import fileUpload from 'express-fileupload';

dotenv.config();

// Connect to the database
connectDB();

const server = express();
server.use(fileUpload({
  useTempFiles:true,
}));
// Middleware
server.use(cors({
  origin:"http://localhost:5173",
  credentials: true}));
server.use(cookieParser());
server.use(express.json()); // For parsing JSON request bodies

// API Routes
server.use("/api", apiRouter);

// Default route
server.get("/", (req, res) => {
  res.status(200).json({ message: "hi" });
});

// Error handling middleware (optional, but recommended)
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
server.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
