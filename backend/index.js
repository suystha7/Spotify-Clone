import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
import fileUpload from "express-fileupload";
import { clerkMiddleware } from "@clerk/express";

import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";
import authRoutes from "./routes/auth.route.js";
import songRoutes from "./routes/user.route.js";
import albumRoutes from "./routes/album.route.js";
import statRoutes from "./routes/stat.route.js";
import connectDB from "./lib/db.js";

dotenv.config();

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT;

app.use(morgan("dev"));

app.use(express.json()); //to parse req.body
app.use(clerkMiddleware()); // will add auth to req obj => req.auth.userId
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB max file size
    },
  })
);

app.get("/api/users", userRoutes);
app.get("/api/auth", authRoutes);
app.get("/api/admin", adminRoutes);
app.get("/api/songs", songRoutes);
app.get("/api/albums", albumRoutes);
app.get("/api/stats", statRoutes);

// error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
