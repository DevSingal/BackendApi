
import express from "express";

const router  = express.Router();

router.get("/", (req, res) => {

    let {token } = req.cookies;

    res.render("home", {token});
});

router.get("/about", (req, res) => {
    res.render("about");
});

router.get("/contact", (req, res) => {
    res.render("contact");
});

router.get("/login", (req, res) => {
    res.render("login");
});



export default router;