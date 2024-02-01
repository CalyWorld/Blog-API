import express, { Request, Response } from "express";
const router = express.Router();
import passport = require("passport");

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/user",
    failureRedirect: "/signin",
  }),
);
module.exports = router;
