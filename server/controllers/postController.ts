import { Request, Response, NextFunction } from "express";
import Post from "../models/post";
import { SuccessMsgResponse, SuccessResponse } from "../apiResponse";
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

//get all posts
exports.getAllPosts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const allPosts = await Post.find().populate("author").exec();
    new SuccessResponse("Blog created successfully", allPosts).send(res);
  },
);

//get user post with status
exports.getUserPostWithStatus = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const postById = await Post.find({
      author: req.params.id,
      isPublished: req.params.status,
    })
      .populate("author")
      .exec();
    if (postById === null) {
      return new SuccessMsgResponse("no post by user").send(res);
    }
    new SuccessResponse("user post gotten successfully", postById).send(res);
  },
);
//get specific post and comments
exports.getPostById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const postById = await Post.findById(req.params.id)
      .populate("author")
      .exec();

    if (!postById) {
      return new SuccessMsgResponse(
        "specific post not gotten succesfully",
      ).send(res);
    }
    new SuccessResponse("specific blog post gotten succesfully", postById).send(
      res,
    );
  },
);

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
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { title, content, author, publishedDate, isPublished, imageUrl } =
      req.body;
    const postDetail = new Post({
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
    } else {
      await postDetail.save();
      new SuccessResponse("Blog created successfully", postDetail).send(res);
    }
  }),
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
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { title, content, author, publishedDate, isPublished, imageUrl } =
      req.body;
    const postDetail = new Post({
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
    } else {
      await Post.findByIdAndUpdate(req.params.id, postDetail, {});
      return new SuccessMsgResponse("Blog updated successfully").send(res);
    }
  }),
];

//delete user post
exports.deletePostById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await Post.findByIdAndRemove(req.params.id);
    return new SuccessMsgResponse("Blog deleted successfully").send(res);
  },
);
