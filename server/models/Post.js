const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
  {
    url: String,
    public_id: String,
    caption: String,
    order: Number,
  },
  { _id: false }
);

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    excerpt: String,
    content: { type: String }, // store HTML or markdown (we'll choose HTML from editor)
    tags: [{ type: String, index: true }],
    images: [ImageSchema],
    coverImage: ImageSchema,
    isPublished: { type: Boolean, default: true, index: true },
    publishedAt: { type: Date, default: Date.now },
    author: { type: String },
  },
  { timestamps: true }
);

// Text index for search across title/excerpt/content
PostSchema.index({ title: "text", excerpt: "text", content: "text" });

module.exports = mongoose.model("Post", PostSchema);
