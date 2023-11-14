import { Request, Response, NextFunction } from "express";
import User from "../models/user";
const asyncHandler = require("express-async-handler");

exports.getUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.params.user) {
      const username = req.params.user;
      try {
        const user = await User.findOne({ username: username }).exec();
        res.json({ username: user?.username, password: user?.password });
      } catch (err) {
        console.log(err);
      }
    } else {
      res.status(401).json({ message: "User not authenticated" });
    }
  },
);
