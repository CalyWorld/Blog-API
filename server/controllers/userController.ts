import { Request, Response, NextFunction } from "express";
import User from "../models/user";
const asyncHandler = require("express-async-handler");

exports.getUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
      // console.log({ user_session: req.session });
      // console.log({ user_authenticated: req.isAuthenticated() });
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

exports.userLogOut = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log({ logout: req.user });
    // req.logOut((err) => {
    //   if (err) {
    //     return next(err);
    //   }
    //   res.redirect("/");
    // });
  },
);
