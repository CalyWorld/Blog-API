"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
//get all posts
router.get("/", postController.getAllPosts);
//create a post
router.post("/create", postController.createPost);
//get user post with status
router.get("/user/post/:id/:status", postController.getUserPostWithStatus);
//get a specific post
router.get("/:id", postController.getPostById);
//edit a specific post
router.put("/:id/update", postController.updatePost);
//delete a post
router.delete("/:id/delete", postController.deletePostById);
module.exports = router;
