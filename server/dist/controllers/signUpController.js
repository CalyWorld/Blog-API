"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const user_1 = __importDefault(require("../models/user"));
const bcrypt = require("bcryptjs");
exports.signUpPost = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const existingUser = yield user_1.default.findOne({ username: req.body.username });
    if (existingUser) {
        errors.errors.push({ msg: "Username is already taken" });
        return res.status(400).json({ errors: errors.array() });
    }
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return next(err);
        }
        const user = new user_1.default({
            username: req.body.username,
            password: hashedPassword,
        });
        try {
            yield user.save();
            res.redirect("/");
        }
        catch (err) {
            return next(err);
        }
    }));
}));
