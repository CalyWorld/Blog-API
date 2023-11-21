import { Request, Response, NextFunction } from "express";
import Post from "../models/post";
import Comment from "../models/comment";
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

//get all posts
exports.getAllPosts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const allPosts = await Post.find().populate("author").exec();
    res.json(allPosts);
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
  },
);

//get specific post and comments
exports.getPostAndCommentsById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const [post, comments] = await Promise.all([
      Post.findById(req.params.id).populate("author").exec(),
      Comment.find({ post: req.params.id }).populate("author").exec(),
    ]);

    if (!post) {
      console.log("No post found with the given ID");
      return res.status(404).json({ error: "No post found with the given ID" });
    }

    res.json({ post, comments });
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
    const postDetail = new Post({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      publishedDate: req.body.publishedDate,
      isPublished: req.body.isPublished,
      imageUrl: req.body.imageUrl,
    });
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errors.array();
      res.json(postDetail);
    } else {
      await postDetail.save();
      res.redirect(`/posts/${postDetail._id}`);
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
    const postDetail = new Post({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      publishedDate: req.body.publishedDate,
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
      res.redirect(`/posts/${updatedPost._id}`);
      console.log(updatedPost);
    }
  }),
];

//delete user post
exports.deletePostById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log({ selectedUser: req.params.id });
    await Post.findByIdAndRemove(req.params.id);
    res.redirect("/posts");
  },
);
