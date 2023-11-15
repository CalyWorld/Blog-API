import express, { Request, Response, NextFunction, Application } from "express";
const asyncHandler = require("express-async-handler");
const router = express.Router();
router.get(
  "/",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.logout((err) => {
        if (err) {
          return next(err);
        }
        res.json(null);
      });
    } catch (err) {
      console.log(err);
    }
  }),
);
module.exports = router;
