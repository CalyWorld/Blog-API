import { Request, Response, NextFunction } from "express";
const asyncHandler = require("express-async-handler");

exports.getUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
      res.json({ username: req.user });
      console.log("getting user", req.user);
    } else {
      res.status(401).json({ message: "User not authenticated" });
    }
  },
);
