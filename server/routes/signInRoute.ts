import express, { Request, Response } from "express";
const router = express.Router();
import passport = require("passport");

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/signin",
  }),
);
module.exports = router;
