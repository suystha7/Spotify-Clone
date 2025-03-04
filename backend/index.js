import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

import userRoutes from "./routes/user.route.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(morgan("dev"));

app.get("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
