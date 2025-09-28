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

// Auth route
router.post("/login", login);

// Protected admin CRUD
router.post("/blogs", adminAuth, memoryUpload.array("images", 10), createPost);
router.put(
  "/blogs/:id",
  adminAuth,
  memoryUpload.array("images", 10),
  updatePost
);
router.delete("/blogs/:id", adminAuth, deletePost);

module.exports = router;
