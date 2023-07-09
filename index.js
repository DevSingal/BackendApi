import express from "express";
import userRoutes from "./routes/users.js";
import navigationRoutes from "./routes/navigation.js"; 
import cookieParser from "cookie-parser";
import path from "path";
import { config } from "dotenv";

config({
    path: "./config.env"
});

import dbConnection from "./config/dbConfig.js";
import cors from "cors";
import { errorMiddleware } from "./middleware/error.js";

dbConnection();

const app = express();

app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
    methods:["GET", "HEAD", "OPTIONS", "POST", "PUT", "DELETE" ]
}))

app.use("/api/v1/user", userRoutes)
app.use(navigationRoutes)

// View Engine
app.set("view engine", "ejs")

app.listen(process.env.PORT, ()=>{
    console.log(`App listening on ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})

app.use(errorMiddleware)