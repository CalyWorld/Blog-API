"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const signUpController = require("../controllers/signUpController");
router.post("/", signUpController.signUpPost);
module.exports = router;
