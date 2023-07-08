import express from "express";
import userRoutes from "./routes/users.js";
import cookieParser from "cookie-parser";
import { config } from "dotenv";

config({
    path: "./config.env"
});

import dbConnection from "./config/dbConfig.js";
import cors from "cors";
import { errorMiddleware } from "./middleware/error.js";

dbConnection();

const app = express();


app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
    methods:["GET", "HEAD", "OPTIONS", "POST", "PUT", "DELETE" ]
}))

app.use("/api/v1/user", userRoutes)

// View Engine
app.set("view engine", "ejs")

app.get("/", (req, res)=>{
res.send("APP IS WORKING")
})

app.listen(process.env.PORT, ()=>{
    console.log(`App listening on ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})

app.use(errorMiddleware)