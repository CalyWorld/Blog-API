import { Request, Response, NextFunction } from "express";
import userModel from "../models/user";
const bcrypt = require("bcryptjs");
const passport = require("passport");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.get_user = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // const user = req.user;
    const user = await userModel.find().exec();
    console.log({ user: user });
    res.json(user);
    // res.send("Welcome to Express & TypeScript Server");
  },
);

exports.signin_post = [
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/signin",
  }),
];

exports.signup_post = [
  body("username", "Username must not be empty and must be a valid email")
    .trim()
    .isLength({ min: 1 })
    .isEmail()
    .normalizeEmail(),
  body("password", "Password must not be empty").trim().isLength({ min: 5 }),
  body("confirmPassword", "Password doesn't match").custom(
    (value: string, { req }: { req: Request }) => {
      if (value !== req.body.password) {
        throw new Error("passwords don't match");
      }
      return true;
    },
  ),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const userInput = {
      username: req.body.username,
      password: req.body.password,
    };
    console.log(userInput);
    const errors = validationResult(req);
    const existingUser = await userModel.findOne({
      username: userInput.username,
    });
    if (existingUser) {
      errors.errors.push({ msg: "Username is already taken" });
    }
    if (!errors.isEmpty()) {
      errors.array();
      res.json(userInput);
    }
    bcrypt.hash(
      req.body.password,
      10,
      async (err: Error, hashedPassword: string) => {
        if (err) {
          return next(err);
        } else {
          const user = new userModel({
            username: req.body.username,
            password: hashedPassword,
          });
          try {
            res.json(await user.save());
            res.redirect("/");
          } catch (err) {
            return next(err);
          }
        }
      },
    );
  }),
];
