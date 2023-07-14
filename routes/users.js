import express from "express";
import isAuthenticated from "../middleware/auth.js";
import { getMyProfile, loginUser, logoutUser, registerUser } from "../controller/user.js";

const router = express.Router();


router.post("/register", registerUser).get((req, res) => { res.render("register") })

router.post("/login", loginUser).get((req, res) => { res.render("login") })

<<<<<<< HEAD
router.get("/logout",isAuthenticated,  logoutUser) 
=======
router.get("/logout", isAuthenticated, logoutUser) 
>>>>>>> 2786fd793dd3c383e951c78e41f3ea2fa8ae8a7d

router.get("/profile",  isAuthenticated, getMyProfile )

export default router;
