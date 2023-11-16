const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

//get all posts
router.get("/", postController.getAllPosts);
//create a post
router.post("/create", postController.createPost);
//get a specific post
router.get("/:id", postController.getPostById);
//get specific comment from post
router.get("/comments/:id", postController.getCommentsFromPostId);
//edit a specific post
router.put("/:id/update", postController.updatePost);
//delete a post
router.delete("/:id/delete", postController.deletePostById);

module.exports = router;
