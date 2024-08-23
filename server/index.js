import express from "express";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/user.routes.js";
import blogRouter from "./routes/blog.routes.js";
import cors from "cors"
// import router from "./routes/user.routes.js";
const app = express();

configDotenv();
app.use(express.json());
app.use()

app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));

app.listen(5000, () => console.log("server is running 5000"));
