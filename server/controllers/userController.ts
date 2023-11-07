import { Request, Response, NextFunction } from "express";
const asyncHandler = require("express-async-handler");

exports.getUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    res.json(user);
    console.log("getting user", user);
  },
);
