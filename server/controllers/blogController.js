const Post = require("../models/Post");

// GET /api/blogs
const getBlogs = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 10);
    const skip = (page - 1) * limit;

    const { q, tags } = req.query;
    const filter = { isPublished: true };

    if (tags) {
      // tags=tag1,tag2 -> find posts that have ANY of provided tags
      const tagsArr = tags.split(",").map((t) => t.trim());
      filter.tags = { $in: tagsArr };
    }

    let sort = { publishedAt: -1 };
    let query;

    if (q) {
      // text search
      filter.$text = { $search: q };
      // optionally sort by text score
      query = Post.find(filter, { score: { $meta: "textScore" } });
      query.sort({ score: { $meta: "textScore" }, ...sort });
    } else {
      query = Post.find(filter);
      query.sort(sort);
    }

    const total = await Post.countDocuments(filter);
    const posts = await query
      .skip(skip)
      .limit(limit)
      .select("title slug excerpt images tags publishedAt")
      .lean();

    res.json({ posts, page, pages: Math.ceil(total / limit), total });
  } catch (err) {
    next(err);
  }
};

// GET /api/blogs/:slug
const getBlogBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const post = await Post.findOne({ slug, isPublished: true }).lean();
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    next(err);
  }
};

module.exports = { getBlogs, getBlogBySlug };