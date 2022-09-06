import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";

dotenv.config();
const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Successfully conncected to database");
  })
  .catch((err) => console.log(err.message));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
