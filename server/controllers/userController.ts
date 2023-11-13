import { Request, Response, NextFunction } from "express";
const asyncHandler = require("express-async-handler");

exports.getUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.params.username) {
      const username = req.params.username;
      res.json({ username: username });
      console.log("getting user", username);
    } else {
      res.status(401).json({ message: "User not authenticated" });
    }
  },
);
