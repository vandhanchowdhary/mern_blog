const dummyBlogs = [
  {
    _id: "1",
    title: "Getting Started with MERN Stack",
    slug: "getting-started-with-mern-stack",
    excerpt:
      "Learn how to build full-stack applications using MongoDB, Express, React, and Node.js.",
    content: `
# Introduction
The MERN stack is a popular full-stack development framework that includes MongoDB, Express, React, and Node.js. It allows developers to build robust web applications using JavaScript across the stack.

## Setting Up Your Project
1. Install Node.js and npm.
2. Set up a new React application with Vite or Create React App.
3. Create an Express server and connect it to MongoDB.

## Benefits of MERN
- Full JavaScript stack
- Rapid development
- Large community support

## Conclusion
By mastering the MERN stack, you can develop scalable and maintainable web applications efficiently.
`,
    tags: ["MERN", "Fullstack"],
    images: [
      { url: "https://picsum.photos/id/37/600/400", public_id: "dummy1" },
    ],
    isPublished: true,
    publishedAt: "2025-09-15T12:00:00Z",
    createdAt: "2025-09-15T12:00:00Z",
    updatedAt: "2025-09-15T12:00:00Z",
  },
  {
    _id: "2",
    title: "Why TailwindCSS is Awesome",
    slug: "why-tailwindcss-is-awesome",
    excerpt:
      "A deep dive into utility-first CSS and how it speeds up frontend development.",
    content: `
# TailwindCSS Overview
TailwindCSS is a utility-first CSS framework that allows rapid UI development without writing custom CSS.

## Key Features
- Utility-first approach
- Responsive design made easy
- Highly customizable

## Example
To create a button:
\`\`\`html
<button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
  Click Me
</button>
\`\`\`

## Conclusion
TailwindCSS dramatically speeds up frontend development and keeps your code clean.
`,
    tags: ["CSS", "Tailwind"],
    images: [
      { url: "https://picsum.photos/id/237/600/400", public_id: "dummy2" },
    ],
    isPublished: true,
    publishedAt: "2025-09-20T14:30:00Z",
    createdAt: "2025-09-20T14:30:00Z",
    updatedAt: "2025-09-20T14:30:00Z",
  },
  {
    _id: "3",
    title: "Mastering MongoDB Indexing",
    slug: "mastering-mongodb-indexing",
    excerpt:
      "Optimize your queries and speed up performance with MongoDB indexes.",
    content: `
# Introduction
Indexes in MongoDB are special data structures that improve query performance.

## Types of Indexes
- Single Field Index
- Compound Index
- Multikey Index

## Best Practices
1. Analyze query patterns
2. Use indexes selectively
3. Monitor index size

## Conclusion
Proper use of indexing can drastically improve your application's performance.
`,
    tags: ["MongoDB", "Database"],
    images: [
      { url: "https://picsum.photos/id/257/600/400", public_id: "dummy3" },
    ],
    isPublished: true,
    publishedAt: "2025-09-25T10:15:00Z",
    createdAt: "2025-09-25T10:15:00Z",
    updatedAt: "2025-09-25T10:15:00Z",
  },
];

export default dummyBlogs;
