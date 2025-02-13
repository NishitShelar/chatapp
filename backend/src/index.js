import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import {connectDB} from "./lib/db.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT;

//middleware
app.use(express.json()); //parse json
app.use(cookieParser()); //parse cookies
app.use(cors({
    origin: "https://localhost:5173",
    credentials: true,
}));

//routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
    connectDB();
});