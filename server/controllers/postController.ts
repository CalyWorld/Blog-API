import { Request, Response, NextFunction } from "express";
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

//update user post
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
      res.redirect(`/post/${updatedPost._id}`);
      console.log(updatedPost);
    }
  }),
];

//delete user post
exports.deletePostById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log({ selectedUser: req.params.id });
    await Post.findByIdAndRemove(req.params.id);
    res.redirect("/post");
  },
);
