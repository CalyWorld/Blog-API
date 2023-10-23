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

exports.getCommentById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const commentById = await Comment.findById(req.params.id)
      .populate("post")
      .populate("author")
      .exec();
    if (commentById === null) {
      console.log("no comment from post");
    }
    res.json(commentById);
  },
);

exports.createComment = [
  body("content", "Content must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const getcommentById = await Comment.findById(req.params.id)
      .populate("post")
      .exec();
    if (!getcommentById) {
      return null;
    }
    const commentDetail = new Comment({
      content: req.body.content,
      author: getcommentById.author,
      post: getcommentById.post,
      commentDate: Date.now(),
    });
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errors.array();
      res.json(commentDetail);
    } else {
      await commentDetail.save();
      //this should go to the post where the comment is being made
      res.redirect(`/post`);
      console.log(commentDetail);
    }
  }),
];

exports.updateComment = [
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("content", "Content must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("isPublished", "isPublished should be a boolean").isBoolean(),
  body("imageUrl", "URL must not be empty").trim().isLength({ min: 1 }),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const getcommentById = await Comment.findById(req.params.id)
      .populate("post")
      .exec();
    if (!getcommentById) {
      return null;
    }
    const commentDetail = new Comment({
      content: req.body.content,
      author: getcommentById.author,
      post: getcommentById.post,
      commentDate: Date.now(),
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
      if (!updatedComment) {
        return null;
      }
      //this should go to the post where the comment is being made
      res.redirect(`/comment/${updatedComment._id}`);
      console.log(updatedComment);
    }
  }),
];

exports.deleteCommentById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log({ selectedComment: req.params.id });
    await Comment.findByIdAndRemove(req.params.id);
    //this should go to the post where the comment is being made
    res.redirect("/post");
  },
);
