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
const post_1 = __importDefault(require("../models/post"));
const apiResponse_1 = require("../apiResponse");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
//get all posts
exports.getAllPosts = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allPosts = yield post_1.default.find().populate("author").exec();
    new apiResponse_1.SuccessResponse("Blog created successfully", allPosts).send(res);
}));
//get user post with status
exports.getUserPostWithStatus = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const postById = yield post_1.default.find({
        author: req.params.id,
        isPublished: req.params.status,
    })
        .populate("author")
        .exec();
    if (postById === null) {
        return new apiResponse_1.SuccessMsgResponse("no post by user").send(res);
    }
    new apiResponse_1.SuccessResponse("user post gotten successfully", postById).send(res);
}));
//get specific post and comments
exports.getPostById = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const postById = yield post_1.default.findById(req.params.id)
        .populate("author")
        .exec();
    if (!postById) {
        return new apiResponse_1.SuccessMsgResponse("specific post not gotten succesfully").send(res);
    }
    new apiResponse_1.SuccessResponse("specific blog post gotten succesfully", postById).send(res);
}));
//create user post
exports.createPost = [
    body("title", "Title must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("content", "Content must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("isPublished", "isPublished should be a boolean").isBoolean(),
    asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { title, content, author, publishedDate, isPublished, imageUrl } = req.body;
        const postDetail = new post_1.default({
            title: title,
            content: content,
            author: author,
            publishedDate: publishedDate,
            isPublished: isPublished,
            imageUrl: imageUrl,
        });
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            errors.array();
            res.json(postDetail);
        }
        else {
            yield postDetail.save();
            new apiResponse_1.SuccessResponse("Blog created successfully", postDetail).send(res);
        }
    })),
];
//update  post
exports.updatePost = [
    body("title", "Title must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("content", "Content must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("isPublished", "isPublished should be a boolean").isBoolean(),
    asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { title, content, author, publishedDate, isPublished, imageUrl } = req.body;
        const postDetail = new post_1.default({
            title: title,
            content: content,
            author: author,
            publishedDate: publishedDate,
            isPublished: isPublished,
            imageUrl: imageUrl,
            _id: req.params.id,
        });
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            errors.array();
            res.json(postDetail);
        }
        else {
            yield post_1.default.findByIdAndUpdate(req.params.id, postDetail, {});
            return new apiResponse_1.SuccessMsgResponse("Blog updated successfully").send(res);
        }
    })),
];
//delete user post
exports.deletePostById = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield post_1.default.findByIdAndRemove(req.params.id);
    return new apiResponse_1.SuccessMsgResponse("Blog deleted successfully").send(res);
}));
