import { Request, Response, NextFunction } from "express";
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
import User from "../models/user";
const bcrypt = require("bcryptjs");

exports.signUpPost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const existingUser = await User.findOne({ username: req.body.username });

    if (existingUser) {
      errors.errors.push({ msg: "Username is already taken" });
      return res.status(400).json({ errors: errors.array() });
    }

    bcrypt.hash(
      req.body.password,
      10,
      async (err: Error, hashedPassword: string) => {
        if (err) {
          return next(err);
        }

        const user = new User({
          username: req.body.username,
          password: hashedPassword,
        });

        try {
          await user.save();
          res.redirect("/");
        } catch (err) {
          return next(err);
        }
      },
    );
  },
);
