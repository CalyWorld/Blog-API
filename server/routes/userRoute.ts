const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
router.get("/", userController.getUser);
router.post("/signin", userController.signInPost);
router.post("/signup", userController.signUpPost);
module.exports = router;
