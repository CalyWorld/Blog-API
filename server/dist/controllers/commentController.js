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
const comment_1 = __importDefault(require("../models/comment"));
const asyncHandler = require("express-async-handler");
const apiResponse_1 = require("../apiResponse");
const { body, validationResult } = require("express-validator");
exports.getAllComments = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allComments = yield comment_1.default.find().exec();
    new apiResponse_1.SuccessResponse("Blog created successfully", allComments).send(res);
}));
//get user comment
exports.getCommentById = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const commentById = yield comment_1.default.find({ post: req.params.id })
        .populate("author")
        .exec();
    if (commentById === null) {
        console.log("no comment from post");
    }
    new apiResponse_1.SuccessResponse("Blog created successfully", commentById).send(res);
}));
//create user comment
exports.createComment = [
    body("content", "Content must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const commentDetail = new comment_1.default({
            content: req.body.content,
            author: req.body.author,
            post: req.body.post,
            commentDate: req.body.commentDate,
        });
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            errors.array();
            res.json(commentDetail);
        }
        else {
            yield commentDetail.save();
            new apiResponse_1.SuccessMsgResponse("comment created successfully").send(res);
        }
    })),
];
//update user comment
exports.updateComment = [
    body("content", "Content must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const commentDetail = new comment_1.default({
            content: req.body.content,
            author: req.body.author,
            post: req.body.post,
            commentDate: req.body.commentDate,
            _id: req.params.id,
        });
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            errors.array();
            res.json(commentDetail);
        }
        else {
            const updatedComment = yield comment_1.default.findByIdAndUpdate(req.params.id, commentDetail, {});
            new apiResponse_1.SuccessMsgResponse("comment updated successfully").send(res);
        }
    })),
];
//delete user comment
exports.deleteCommentById = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield comment_1.default.findByIdAndRemove(req.params.id);
    new apiResponse_1.SuccessMsgResponse("comment deleted successfully").send(res);
}));
