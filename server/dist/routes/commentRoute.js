"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
//get all comments
router.get("/", commentController.getAllComments);
// create a comment
router.post("/create", commentController.createComment);
// // get a specific comment
router.get("/:id", commentController.getCommentById);
// //edit a specific comment
router.put("/:id/update", commentController.updateComment);
// //delete a comment
router.delete("/:id/delete", commentController.deleteCommentById);
module.exports = router;
