const express = require("express");
const router = express.Router();
const { getBlogs, getBlogBySlug } = require("../controllers/blogController");

router.get("/", getBlogs); // GET /api/blogs
router.get("/:slug", getBlogBySlug); // GET /api/blogs/:slug

module.exports = router;