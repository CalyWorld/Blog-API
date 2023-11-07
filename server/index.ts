import express, { Application } from "express";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import path from "path";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import logger from "morgan";
import mongoose from "mongoose";
import User from "./models/user";
const userRouter = require("./routes/userRoute");
const postRouter = require("./routes/postRoute");
const commentRouter = require("./routes/commentRoute");
const signInRouter = require("./routes/signInRoute");
const signUpRouter = require("./routes/signUpRoute");

// Load environment variables from .env file
dotenv.config();

const app: Application = express();
const port: number = parseInt(process.env.PORT ?? "8000");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});

mongoose.set("strictQuery", false);
require("dotenv").config();

const mongoDB: string = process.env.MONGODB_URI ?? "default_uri";
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongoDB);
}
app.use(logger("dev"));
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

passport.use(
  new LocalStrategy(async (username: string, password: string, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect Username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect Password" });
      }
      return done(null, user);
    } catch (err) {
      console.log(err);
      return done(err);
    }
  }),
);

passport.serializeUser((user: any, done) => {
  console.log({ user: user });
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", userRouter);
app.use("/signin", signInRouter);
app.use("/signup", signUpRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.listen(port, () => {
  console.log(`Server is live at http://localhost:${port}`);
});

module.exports = app;
