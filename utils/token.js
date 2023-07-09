
import jwt from "jsonwebtoken";

export const setToken = (user, res, message, statusCode = 200,redirectPath = "/" )=>{
    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
    res
      .status(statusCode)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 *1000 ,
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
      }).redirect(redirectPath)

      
      
}
      // .json({
      //   success:true,
      //   message,
      // })