const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

//get all posts
router.get("/", postController.getAllPosts);
//create a post
router.post("/create", postController.createPost);
//get user post
router.get("/user/post/:id", postController.getUserPost);
//get a specific post
router.get("/:id", postController.getPostAndCommentsById);
//edit a specific post
router.put("/:id/update", postController.updatePost);
//edit publication status for a specific post
router.put(
  "/:id/publicationStatus",
  postController.updatePostPublicationStatus,
);
//delete a post
router.delete("/:id/delete", postController.deletePostById);

module.exports = router;
