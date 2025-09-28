# MERN Blog

## Overview

A dynamic blog platform (MERN). Posts are stored in MongoDB and served via REST API. Features include pagination, text search, tag filters, admin CRUD with image uploads, and support for rich-text content.

## Tech stack

- Backend: Node.js, Express, MongoDB (Mongoose), Cloudinary (images)
- Frontend: React (Vite), Tailwind CSS, React-Quill (rich text)
- Deployment: Vercel (frontend) + Render/Railway (backend) recommended

## Setup (backend)

1. Clone repo
2. `cd backend`
3. Copy `.env.example` to `.env` and set:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `ADMIN_EMAIL` / `ADMIN_PASSWORD`
   - `Cloudinary keys`
4. `npm install`
5. `npm run dev`
6. API endpoints:
   - `GET /api/blogs?page=1&limit=10&q=term&tags=tag1,tag2`
   - `GET /api/blogs/:slug`
   - `POST /api/admin/login` (body: `{email,password}`)
   - `POST /api/admin/blogs` (multipart form, Authorization header)

## Setup (frontend)

1. `cd frontend`
2. `npm install`
3. configure `VITE_API_URL` to backend URL
4. `npm run dev`

## Environment variables

- `MONGO_URI`
- `JWT_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `CLOUDINARY_*`

## Dependencies

See `package.json` in backend and frontend directories for full lists.

## Deployment

- Set environment variables in hosting provider.
- Deploy backend to Render/Railway (Node). Use automatic deployments from GitHub.
- Deploy frontend to Vercel, set `VITE_API_URL` to backend endpoint.

## File tree for frontend

```plaintext

client/
│── public
│   └── icon.png 
│── index.html
│── vite.config.js
│── package.json
│── .env                      *# frontend env (API URL)* Add your own .env
│
└── src/
    │── main.jsx              *# React entry*
    │── App.jsx               *# Main App wrapper*
    │── index.css             *# Global styles*
    │
    ├── components/           # Reusable UI components
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── BlogCard.jsx
    │   ├── SearchBar.jsx
    │   ├──AdminBlogForm.jsx
    │   ├──AdminBlogList.jsx
    │   └──ImageUpload.jsx   
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

## File tree for backend

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
