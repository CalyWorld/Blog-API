import { Request, Response, NextFunction } from "express";
import Comment from "../models/comment";
const asyncHandler = require("express-async-handler");
import { SuccessMsgResponse, SuccessResponse } from "../apiResponse";
const { body, validationResult } = require("express-validator");

exports.getAllComments = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const allComments = await Comment.find().exec();
    res.json(allComments);
    new SuccessResponse("Blog created successfully", allComments).send(res);
  },
);

//get user comment
exports.getCommentById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const commentById = await Comment.find({ post: req.params.id })
      .populate("author")
      .exec();
    if (commentById === null) {
      console.log("no comment from post");
    }
    res.json(commentById);
    new SuccessResponse("Blog created successfully", commentById).send(res);
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
      new SuccessResponse("Blog created successfully", newComment).send(res);
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
      const updatedComment = await Comment.findByIdAndUpdate(
        req.params.id,
        commentDetail,
        {},
      );
      new SuccessResponse("Blog created successfully", updatedComment).send(
        res,
      );
    }
  }),
];

//delete user comment
exports.deleteCommentById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const deleteCommentById = await Comment.findByIdAndRemove(req.params.id);
    new SuccessResponse("Blog created successfully", deleteCommentById).send(
      res,
    );
  },
);
