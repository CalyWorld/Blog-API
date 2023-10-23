import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import Post from "../models/post";
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.getAllPosts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const allPosts = await Post.find().exec();
    console.log({ posts: allPosts });
    res.json(allPosts);
  },
);

exports.getPostById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const postById = await Post.findById(req.params.id)
      .populate("author")
      .exec();
    if (postById === null) {
      console.log("no post by author");
    }
    res.json(postById);
  },
);

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
  body("imageUrl", "URL must not be empty").trim().isLength({ min: 1 }),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const getPostById = await Post.findById(req.params.id)
      .populate("author")
      .exec();
    if (!getPostById) {
      return null;
    }
    const postDetail = new Post({
      title: req.body.title,
      content: req.body.content,
      author: getPostById.author,
      publishedDate: Date.now(),
      isPublished: req.body.isPublished,
      imageUrl: req.body.imageUrl,
    });
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errors.array();
      res.json(postDetail);
    } else {
      await postDetail.save();
      res.redirect(`/post/${postDetail._id}`);
      console.log(postDetail);
    }
  }),
];
