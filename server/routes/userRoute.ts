const express = require("express");
import { Request, Response, NextFunction } from "express";
const router = express.Router();
const asyncHandler = require("express-async-handler");
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  //   if (req.isAuthenticated()) {
  //     next();
  //   } else {
  //     res.status(401).json({ message: "User not authenticated" });
  //   }
  // },
  console.log("get_user", req.isAuthenticated());
  console.log("Session: ", req.session);
  console.log("get_User", req.user);
  // async (req: Request, res: Response) => {
  //   const user = req.user;
  //   try {
  //     if (user) {
  //       res.json(user);
  //     } else {
  //       res.status(404).json({ message: "User not found" });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     res.status(500).json({ message: "Internal Server Error" });
  //   }
});

module.exports = router;
