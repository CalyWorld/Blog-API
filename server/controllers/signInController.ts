const passport = require("passport");

exports.signInPost = [
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/signin",
  }),
];
