import express from "express";
import isAuthenticated from "../middleware/auth.js";
import { changeMyProfile, getMyProfile, loginUser, logoutUser, registerUser } from "../controller/user.js";

const router = express.Router();


router.post("/register", registerUser).get((req, res) => { res.render("register") })

router.post("/login", loginUser).get((req, res) => { res.render("login") })

router.get("/logout",isAuthenticated,  logoutUser) 

router.get("/profile",  isAuthenticated, getMyProfile )

router.put("/profile/change",isAuthenticated, changeMyProfile)

export default router;
