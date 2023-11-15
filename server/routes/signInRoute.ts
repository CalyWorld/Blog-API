import express, { Request, Response } from "express";
const router = express.Router();
import passport = require("passport");

router.post("/", (req: Request, res: Response, next) => {
  passport.authenticate("local", (err: any, user: any, info: any) => {
    if (!user) {
      return res.redirect("/signin");
    }
    req.login(user, function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  })(req, res, next);
});
module.exports = router;
