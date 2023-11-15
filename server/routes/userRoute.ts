const express = require("express");
import { Request, Response } from "express";
import User from "../models/user";
const router = express.Router();
const asyncHandler = require("express-async-handler");
router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      const username = req.user;
      try {
        res.json(username);
      } catch (err) {
        console.log(err);
      }
    }
  }),
);

module.exports = router;
