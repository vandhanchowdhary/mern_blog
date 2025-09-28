const slugify = require("slugify");
const Post = require("../models/Post");
const { uploadStream } = require("../utils/cloudinary");
const jwt = require("jsonwebtoken");
const multer = require("multer");

// helper for unique slug
const makeUniqueSlug = async (base) => {
  let slug = slugify(base, { lower: true, strict: true });
  let exists = await Post.findOne({ slug });
  let i = 1;
  while (exists) {
    slug = `${slug}-${Date.now()}`;
    exists = await Post.findOne({ slug });
    i++;
    if (i > 5) break;
  }
  return slug;
};

const memoryUpload = multer({ storage: multer.memoryStorage() });

const login = async (req, res) => {
  const { email, password } = req.body;
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.json({ token });
  }
  return res.status(401).json({ message: "Invalid credentials" });
};

// Create post (supports multiple images)
const createPost = async (req, res, next) => {
  try {
    const {
      title,
      excerpt,
      content,
      tags = "",
      isPublished = true,
      author,
    } = req.body;
    let postSlug = await makeUniqueSlug(title);

    const images = [];
    if (req.files && req.files.length) {
      for (const file of req.files) {
        const result = await uploadStream(file.buffer);
        images.push({ url: result.secure_url, public_id: result.public_id });
      }
    }

    const tagsArr = tags
      ? tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    const post = new Post({
      title,
      slug: postSlug,
      excerpt,
      content,
      tags: tagsArr,
      images,
      isPublished,
      author,
      publishedAt: isPublished ? new Date() : null,
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };
    if (updates.tags)
      updates.tags = updates.tags.split(",").map((t) => t.trim());
    // simplistic: allow adding files to images
    if (req.files && req.files.length) {
      const images = [];
      for (const file of req.files) {
        const result = await uploadStream(file.buffer);
        images.push({ url: result.secure_url, public_id: result.public_id });
      }
      updates.$push = { images: { $each: images } };
      // apply differently
      const post = await Post.findByIdAndUpdate(id, updates, { new: true });
      return res.json(post);
    }

    const post = await Post.findByIdAndUpdate(id, updates, { new: true });
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    next(err);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    // optionally: delete images from Cloudinary if public_id available
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = { memoryUpload, login, createPost, updatePost, deletePost };
