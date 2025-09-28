const express = require("express");
const router = express.Router();
const {
  login,
  memoryUpload,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/adminController");
const { adminAuth } = require("../middleware/auth");

// auth
router.post("/login", login);

// protected admin CRUD
// create post (multipart/form)
router.post("/blogs", adminAuth, memoryUpload.array("images", 10), createPost);
router.put(
  "/blogs/:id",
  adminAuth,
  memoryUpload.array("images", 10),
  updatePost
);
router.delete("/blogs/:id", adminAuth, deletePost);

module.exports = router;
