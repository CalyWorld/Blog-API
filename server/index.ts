import express, { Request, Response, Application, NextFunction } from "express";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import createError from "http-errors";
import cookieParser from "cookie-parser";
import session from "express-session";
import path from "path";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import logger from "morgan";
import mongoose from "mongoose";
import UserModel from "./models/user";

// Load environment variables from .env file
dotenv.config();

const app: Application = express();
const port: number = parseInt(process.env.PORT || "8000");

mongoose.set("strictQuery", false);
require("dotenv").config();

const mongoDB: string = process.env.MONGODB_URI || "default_uri";
console.log(mongoDB);
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongoDB);
}
app.use(express.static(path.join(__dirname, "client", "dist")));
app.use(logger("dev"));
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

passport.use(
  new LocalStrategy(async (username: string, password: string, done) => {
    try {
      const user = await UserModel.findOne({ username: username });
      console.log(user);
      if (!user) {
        return done(null, false, { message: "Incorrect Username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect Password" });
      }
      return done(null, user);
    } catch (err) {
      console.error(err);
      return done(err);
    }
  }),
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

// Catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// Error handler
app.use(function (
  err: Error & { status?: number },
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(port, () => {
  console.log(`Server is live at http://localhost:${port}`);
});
