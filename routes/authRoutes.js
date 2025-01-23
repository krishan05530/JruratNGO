const express = require("express");

const {signup, login} = require("../controllers/Auth");
const router = express.Router()

// Authentication routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/try", (req, res) => {
    res.send("Hello from try route");
});

module.exports = router

