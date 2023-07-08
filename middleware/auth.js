import User from "../models/user.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    let {token } = req.cookies;

if(!token){ return next(new ErrorHandler("Please Login first", 400));}

const decodedUserId = jwt.verify(token, process.env.JWT_KEY)

req.user = await User.findById(decodedUserId._id);

next();

}

export default isAuthenticated;