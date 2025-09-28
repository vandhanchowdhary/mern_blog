# MERN Blog

## Overview

A dynamic blog platform (MERN). Posts are stored in MongoDB and served via REST API. Features include pagination, text search, tag filters, admin CRUD with image uploads, and support for rich-text content.

---

## 1. Project Overview

**MERN Blog** is a full-stack blogging platform built with the MERN stack:

- **M**ongoDB for storage (posts, images metadata, tags, publish state)
- **E**xpress/Node for the REST API and admin logic (auth, uploads)
- **R**eact (Vite) for the frontend UI (home, blog details, admin UI)
- **N** (Node) as runtime on the server

### File Tree for Frontend

```plaintext
client/
│── public
│   └── icon.png
│── index.html
│── vite.config.js
│── package.json
│── .env                      # frontend env (API URL)
│
└── src/
    │── main.jsx              # React entry
    │── App.jsx               # Main App wrapper
    │── index.css             # Global styles
    │
    ├── components/           # Reusable UI components
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── BlogCard.jsx
    │   ├── SearchBar.jsx
    │   ├── AdminBlogForm.jsx
    │   ├── AdminBlogList.jsx
    │   └── ImageUpload.jsx
    │
    ├── pages/                # Page-level components
    │   ├── Home.jsx          # List all blogs w/ search + filter
    │   ├── Admin.jsx
    │   └── BlogDetails.jsx   # Individual blog view
    │
    └── utils/
        ├── formatDate.js     # Helper functions
        ├── dummyBlogs.js
        └── blogService.js    # API calls (axios/fetch wrappers)
```

---

### File Tree for Backend

```plaintext
server/
├─ package.json
├─ server.js
├─ config/
│  └─ db.js
├─ models/
│  └─ Post.js
├─ routes/
│  ├─ blogs.js
│  └─ admin.js
├─ controllers/
│  ├─ blogController.js
│  └─ adminController.js
├─ middleware/
│  ├─ auth.js
│  └─ errorHandler.js
└─ utils/
   └─ cloudinary.js
```

---

## 2. Key Features

- Homepage listing posts (title, excerpt, publish date)
- Dynamic post pages (`/blog/:slug`)
- MongoDB-backed posts (no markdown files)
- Search & tags support
- Admin interface: login, create/edit/delete posts, upload multiple images
- Image hosting via Cloudinary
- REST API:
  - `GET /api/blogs` (paginated)
  - `GET /api/blogs/:slug`
  - Admin endpoints under `/api/admin/blogs` (protected with JWT)

### Standard blog post JSON (example returned by API)

```json
{
  "title": "First test blog",
  "slug": "first-test-blog-1759037673008",
  "excerpt": "This blog is written in postman for testing the API's",
  "content": "Hi, I am Vandhan Murali. This is a test blog...",
  "tags": ["MERN", "Fullstack"],
  "images": [
    {
      "url": "https://res.cloudinary.com/..../image.jpg",
      "public_id": "blog_images/abc123"
    }
  ],
  "isPublished": true,
  "publishedAt": "2025-09-28T05:34:36.731Z",
  "_id": "68d8c8ec35973df0a3ad69e2",
  "createdAt": "2025-09-28T05:34:36.740Z",
  "updatedAt": "2025-09-28T05:34:36.740Z",
  "__v": 0
}
```

---

## 2. Setup — Run Locally

> Assuming you have Git, Node (≥16), npm (or yarn) and a MongoDB Atlas account (or local MongoDB) installed.

### Clone repo

```bash
git clone https://github.com//mern-blog.git
cd mern-blog
```

Repo is split into `server/` (backend) and `client/` (frontend). If your layout differs, adjust paths accordingly.

---

### Backend

1. `cd server`
2. Install dependencies:

   ```bash
   npm install  # or yarn
   ```

3. Create a `.env` file in `server/` (see exact env list below) — example:

   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/mern-blog?retryWrites=true&w=majority
   JWT_SECRET=super-secret-key
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=adminpassword
   CLOUDINARY_CLOUD_NAME=yourcloudname
   CLOUDINARY_API_KEY=123456789
   CLOUDINARY_API_SECRET=abcdefg
   ```

4. Start dev server:

   ```bash
   npm run dev   # if script uses nodemon
   # or
   node server.js
   ```

Typical `package.json` scripts in server:

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

Server runs on [http://localhost:5000](http://localhost:5000) by default (if `PORT=5000`).

#### Test API

- `GET http://localhost:5000/api/blogs`
- `GET http://localhost:5000/api/blogs/:slug`

You can use Postman / curl to test.

---

### Frontend

1. `cd client`
2. Install dependencies:

   ```bash
   npm install  # or yarn
   ```

3. Create `.env` at project root (client) with:

   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. Run dev server:

   ```bash
   npm run dev  # (Vite will serve at http://localhost:5173 by default)
   ```

Typical `package.json` scripts in client:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

Open browser at [http://localhost:5173](http://localhost:5173).

---

### Admin Flow (local test)

1. Login: `POST /api/admin/login` with JSON body:

   ```json
   { "email": "admin@example.com", "password": "adminpassword" }
   ```

   Response: `{ "token": "" }` — store token client-side in localStorage under `adminToken`.

2. Create blog (multipart/form-data) `POST /api/admin/blogs`

   - Headers: `Authorization: Bearer <token>`
   - Fields: `title`, `excerpt`, `content`, `tags` (comma string), `images` files (multiple)

3. Update blog `PUT /api/admin/blogs/:id`

   - Use FormData with content, optionally files in images, and `imagesToRemove` (JSON string) to remove images.

4. Delete blog `DELETE /api/admin/blogs/:id`

---

## 3. All Dependencies

Below is a comprehensive list used by this project. Versions may vary.

Install the latest compatible versions unless you need exact pins.

### Backend (server)

**Core:**

- express — web framework
- mongoose — MongoDB ODM
- dotenv — env file loader
- cors — cross-origin
- multer — multipart (file uploads)
- jsonwebtoken — JWT auth
- slugify — slug generation and helper
- cloudinary — image uploads

**Utilities / dev:**

- nodemon (dev)
- morgan (optional, logging)
- bcrypt — (not required unless you add hashed passwords)
- helmet (optional, security headers)

Example `server/package.json` dependencies:

```json
"dependencies": {
  "express": "^4.18.2",
  "mongoose": "^7.0.0",
  "dotenv": "^16.0.0",
  "cors": "^2.8.5",
  "multer": "^1.4.5",
  "jsonwebtoken": "^9.0.0",
  "slugify": "^1.6.5",
  "cloudinary": "^1.32.0"
},
"devDependencies": {
  "nodemon": "^2.0.22",
  "morgan": "^1.10.0"
}
```

---

### Frontend (client)

**Core:**

- react / react-dom
- react-router-dom — routing
- axios — HTTP client
- react-markdown — render markdown
- remark-gfm — GitHub-flavored markdown support
- tailwindcss — styling (used v4; adapt if v3 or below)
- vite — dev server / build tool

Example `client/package.json` dependencies:

```json
"dependencies": {
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.11.0",
  "axios": "^1.4.0",
  "react-markdown": "^8.0.0",
  "remark-gfm": "^3.0.1",
  "tailwindcss": "^4.0.0"
},
"devDependencies": {
  "vite": "^5.0.0",
  "postcss": "^8.4.20",
  "autoprefixer": "^10.4.14"
}
```

> Note: Tailwind v4 broke the old tailwind.config paradigm — ensure your Tailwind setup matches the version you're using. If typography plugin is required, install `@tailwindcss/typography` and configure via PostCSS or the new config method your Tailwind v4 uses.

---

## 4. Environment Variables & Database Setup

### Backend environment variables (full list with description)

Create `server/.env` with values appropriate to your setup.

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/mern-blog?retryWrites=true&w=majority
JWT_SECRET=some_long_random_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=securePassword123
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

- `MONGO_URI` — MongoDB connection string (Atlas recommended). Must include DB user & password or use IAM/connection string you have.
- `JWT_SECRET` — secret used to sign admin JWTs. Keep secret.
- `ADMIN_EMAIL`, `ADMIN_PASSWORD` — simple admin auth (you can replace with user-based auth later).
- Cloudinary vars — allow server to upload image buffers returned by multer.

**Alternative Cloudinary env:**  
`CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME` — some libraries also use this.

---

### Creating a MongoDB Atlas cluster

1. Sign in to MongoDB Atlas.
2. Create a new cluster (free tier works).
3. Create a database user and password (Database Access → Add New Database User).
4. Network Access → add IP whitelist (`0.0.0.0/0` for dev — but lock down for prod).
5. Get the connection string and replace `<user>:<password>` and DB name.

---

### Indexes & Performance

Add these indexes in your Mongoose schema (`server/models/Post.js`):

```js
PostSchema.index({ slug: 1 }, { unique: true });
PostSchema.index({ publishedAt: -1 });
PostSchema.index({ title: "text", content: "text" }); // for text search
```

You can create them programmatically or via Mongo shell:

```js
db.posts.createIndex({ title: "text", content: "text" });
db.posts.createIndex({ slug: 1 }, { unique: true });
```

---

### Example Mongoose connection (`server.js`)

```js
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));
```

---

### Frontend environment variables

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000
```

- On deployed frontend, set `VITE_API_URL` to the deployed backend URL (e.g. [https://api.yourdomain.com](https://api.yourdomain.com)).
- Vite requires `VITE_` prefix to expose env vars in client code.

---

## API Quick Reference & Example Requests

### Public

- `GET /api/blogs?page=1&limit=10&q=search&tags=tag1,tag2`  
  Response: `{ posts: [...], page: 1, pages: 3, total: 25 }`
- `GET /api/blogs/:slug`  
  Response: single post object including content and images.

### Admin (protected)

- `POST /api/admin/login`  
  Body JSON: `{ "email": "", "password": "" }`  
  Response: `{ token: "" }`
- `POST /api/admin/blogs` (multipart/form-data)  
  Headers: Authorization: Bearer  
  Fields: title, excerpt, content, tags (comma string), images (files)...
- `PUT /api/admin/blogs/:id` (multipart/form-data)
  - Append new images as files under images.
  - To remove existing images, include `imagesToRemove` as a JSON string:  
    `imagesToRemove: '["public_id1","public_id2"]'`.
- `DELETE /api/admin/blogs/:id`

#### Postman example: update including removing images

- Request type: `PUT http://localhost:5000/api/admin/blogs/<id>`
- Headers: Authorization: Bearer
- Body: type form-data
  - title: "Updated title"
  - content: "Updated content"
  - imagesToRemove: `["blog_images/abc123"]` (send as a single text field containing JSON string)
  - images (file): attach new image files

---

## Deployment Notes (short)

- Backend: Render / Heroku / Railway — set environment variables in the host dashboard.
- Frontend: Vercel / Netlify — set `VITE_API_URL` to the backend URL.
- Configure CORS on backend to allow frontend origin (e.g., `app.use(cors({ origin: "https://your-frontend.vercel.app" }))`).
- For production Cloudinary: ensure API secrets are set on server host env.

---

## Troubleshooting / Tips

- If blog content disappears after update — ensure frontend sends content in FormData (or backend ignores empty-string content).
- See AdminBlogForm pattern: `formData.append("content", content || existingBlog?.content || "");`.
- If images don’t show — confirm images array URLs are present in DB and are valid Cloudinary URLs.
- If CORS errors occur — update backend CORS config to allow your frontend origin.
- When using MongoDB Atlas, make sure you’ve allowed your server IP or set to `0.0.0.0/0` for testing.
- Keep `.env` out of git — use `.gitignore`.

---

## Final Notes

- This README assumes the default server entry is `server/server.js` and the client is a Vite React app in `client/`. If your layout differs, adjust paths and commands.

---
