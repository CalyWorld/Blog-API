import { Request, Response, NextFunction } from "express";
import Comment from "../models/comment";
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.getAllComments = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const allComments = await Comment.find().exec();
    console.log({ comments: allComments });
    res.json(allComments);
  },
);

//get user comment
exports.getCommentById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const comment = await Comment.find({ post: req.params.id })
      .populate("author")
      .exec();
    if (comment === null) {
      console.log("no comment from post");
    }
    res.json(comment);
  },
);

//create user comment
exports.createComment = [
  body("content", "Content must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const commentDetail = new Comment({
      content: req.body.content,
      author: req.body.author,
      post: req.body.post,
      commentDate: req.body.commentDate,
    });
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errors.array();
      res.json(commentDetail);
    } else {
      const newComment = await commentDetail.save();
      res.redirect(`/comments/${newComment._id}`);
    }
  }),
];

//update user comment
exports.updateComment = [
  body("content", "Content must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const commentDetail = new Comment({
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
    } else {
      await Comment.findByIdAndUpdate(req.params.id, commentDetail, {});
    }
  }),
];

//delete user comment
exports.deleteCommentById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await Comment.findByIdAndRemove(req.params.id);
  },
);
