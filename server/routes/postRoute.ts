const express = require("express");
const router = express.Router();
const postController = require("../models/post");

//get all posts
router.get("/", postController.getAllPosts);
//get a specific post
router.get("/post/:id", postController.getPostById);
//create a post
router.post("/post");
//edit a specific post
router.put("/post/:id");
//delete a post
router.delete("/post/:id");

module.exports = router;
