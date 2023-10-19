const passport = require("passport");

exports.signin_post = [
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/signin",
  }),
];
