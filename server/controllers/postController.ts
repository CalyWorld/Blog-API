import { Request, Response, NextFunction } from "express";
import Post from "../models/post";
import { SuccessMsgResponse, SuccessResponse } from "../apiResponse";
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

//get all posts
exports.getAllPosts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const allPosts = await Post.find().populate("author").exec();
    res.json(allPosts);
    new SuccessResponse("Blog created successfully", allPosts).send(res);
  },
);

//get user post
exports.getUserPost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const postById = await Post.find({ author: req.params.id })
      .populate("author")
      .exec();
    if (postById === null) {
      console.log("no post by author");
    }
    res.json(postById);
    new SuccessResponse("Blog created successfully", postById).send(res);
  },
);

//get specific post and comments
exports.getPostById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const post = await Post.findById(req.params.id).populate("author").exec();

    if (!post) {
      console.log("No post found with the given ID");
      return res.status(404).json({ error: "No post found with the given ID" });
    }
    res.json(post);
    new SuccessResponse("Blog created successfully", post).send(res);
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
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        postDetail,
        {},
      );
      if (!updatedPost) {
        return null;
      }
      new SuccessResponse("Blog created successfully", updatedPost).send(res);
      console.log(updatedPost);
    }
  }),
];

//delete user post
exports.deletePostById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const deletePostById = await Post.findByIdAndRemove(req.params.id);
    new SuccessResponse("Blog created successfully", deletePostById).send(res);
  },
);
