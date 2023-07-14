import User from "../models/user.js";
import bcrypt from "bcrypt";
import ErrorHandler from "../middleware/error.js";
import { setToken } from "../utils/token.js";

export const getMyProfile = (req, res, next) => {
  let { token } = req.cookies;

  res.status(200).json({
    success: true,
    message: "Found user profile",
    user: req.user,
    token,
  });
};

export const logoutUser = (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      maxAge: 0,
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message: "successfuly logged out",
    });
};

export const loginUser = async (req, res, next) => {
  try {
    let { token } = req.cookies;

    if (token) {
      return next(new ErrorHandler("User is already logged in", 401));
    }

    const { email, password } = req.body;

    let userFound = await User.findOne({ email }).select("+password");

    if (!userFound) {
      return next(new ErrorHandler("Invalid email or password", 404));
    }

    let comparedPassword = await bcrypt.compare(password, userFound.password);

    if (!comparedPassword) {
      return next(new ErrorHandler("Invalid password", 404));
    }

    setToken(userFound, res, "user logged in successfully", 200, "/");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const registerUser = async (req, res, next) => {
  try {
    let { token } = req.cookies;

    if (token) {
      return next(new ErrorHandler("User is already logged in", 401));
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(new ErrorHandler("Enter all the fields", res));
    }

    let findUser = await User.findOne({ email });

    if (findUser) return next(new ErrorHandler("Email already in use", 400));

    let hashedPassword = await bcrypt.hash(password, 10);

    let user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    setToken(user, res, "user created successfully", 201, "/");
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const changeMyProfile = async (req, res, next) => {
 
try {
  
  const { name, oldPass, newPass, cnfNewPass } = req.body;

  if (!oldPass || !newPass || !cnfNewPass) {
    return next(new ErrorHandler("Enter all the fields", 400));
  }

  let userFound = await User.findById(req.user._id).select("+password");

  let comparedPassword = await bcrypt.compare(oldPass, userFound.password);

  if (!comparedPassword) {
    return next(new ErrorHandler("Old Password is Incorrect", 404));
  }

  if (newPass !== cnfNewPass) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }

  if(oldPass == newPass){
    return next(new ErrorHandler("New Password cannot be same as old password", 400));
  }

  let newHashedPassword = await bcrypt.hash(newPass, 10);

  await User.updateOne(
    { _id: userFound._id },
    {
      $set: {
        name,
        password: newHashedPassword,
      },
    }
  );

  res.status(204).json({
      success: true,
      message: "Profile updated successfully",
    });



} catch (error) {
  next(error);
  console.log(error);
  
}


};
