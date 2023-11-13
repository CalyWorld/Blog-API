import express, { Request, Response } from "express";
const router = express.Router();
import passport = require("passport");

router.post("/", (req: Request, res: Response, next) => {
  passport.authenticate("local", (user: any) => {
    console.log(user);
    const username = user.username;
    if (!user) {
      return res.redirect("/signin");
    }
    req.login(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.redirect("/" + username);
    });
  })(req, res, next);
});
module.exports = router;
