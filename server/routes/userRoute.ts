import express from "express";
const userController = require("../controllers/userController");
const router = express.Router();
router.get("/", userController);
router.post("/", userController);
