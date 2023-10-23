const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

//get all posts
router.get("/", postController.getAllPosts);
//get a specific post
router.get("/:id", postController.getPostById);
//create a post
router.post("/create", postController.createPost);
//edit a specific post
router.put("/:id/update");
//delete a post
router.delete("/:id/delete");

module.exports = router;
