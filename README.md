# 🎥 YouTube Clone (MERN Stack)

A full-featured **YouTube Clone** built with the **MERN stack (MongoDB, Express, React, Node.js)**.  
It includes **authentication, video management, comments, likes/dislikes, subscriptions, and responsive UI** styled with TailwindCSS.

---
#prepare .env files
PORT=5000
MONGO_URI=mongodb://........
JWT_SECRET=YOUR_SECRET_KEY
JWT_EXPIRES_IN=7d

## 🚀 Features

- 🔐 **Authentication (JWT)**
  - Register / Login
  - Protected routes (upload, subscribe, comment, like/dislike)

- 🎬 **Videos**
  - Upload new videos (YouTube link or file URL)
  - Play videos in embedded YouTube player
  - Like / Dislike functionality
  - Delete videos (owner only)
  - Auto-delete related comments when video is removed

- 💬 **Comments**
  - Add, edit, and delete comments
  - Linked with users (username + email shown)
  - Auto-loaded with video page

- 📺 **Channels & Subscriptions**
  - Create channels
  - Subscribe / Unsubscribe
  - Subscription feed (videos from subscribed channels)

- 🎨 **UI / UX**
  - Responsive design with TailwindCSS
  - Header with logo, search, login/logout/upload
  - Sidebar (desktop) + toggle menu (mobile)
  - Footer navigation (mobile only)

---

## 🛠️ Tech Stack

- **Frontend:** React, React Router, TailwindCSS, Lucide Icons  
- **Backend:** Node.js, Express.js, JWT, bcrypt  
- **Database:** MongoDB (Mongoose ODM)  
- **Auth:** JSON Web Tokens (JWT)  

---

## 📂 Project Structure

```
youtube-clone/
│
├── backend/
│   ├── src/
│   │   ├── models/         # User, Video, Channel, Comment
│   │   ├── controllers/    # Business logic
│   │   ├── routes/         # Express routes
│   │   ├── middleware/     # Auth middleware
│   │   ├── utils/          # Seeder & helpers
│   │   └── index.js        # Server entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/     # Header, Sidebar, VideoCard, CommentItem, FooterNav
│   │   ├── pages/          # Home, Auth, Upload, Player, Channel
│   │   ├── services/       # Axios API wrapper
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

## ⚡ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/youtube-clone.git
cd youtube-clone
```

### 2️⃣ Setup Backend
```bash
cd backend
npm install
```

Create `.env` in `backend/`:
```env
MONGO_URI=mongodb://127.0.0.1:27017/youtube_clone
JWT_SECRET=your_jwt_secret
PORT=5000
```

Run backend:
```bash
npm run dev
```

### 3️⃣ Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend will run at: `http://localhost:5173`

---

## 🌱 Seed Demo Data
To generate demo users, channels, and videos:

```bash
cd backend
npm run seed
```

This will create:
- A demo user (`demo@example.com`, password: `password`)  
- Multiple demo channels (Music, Gaming, Tech, News)  
- Multiple demo videos per channel  

---

## 📸 Screenshots

(Add screenshots here after running project)  

---

## ✨ Future Improvements
- Video file upload support (not just YouTube links)  
- Search videos by title/category  
- User profile pages  
- Notifications for new subscriptions  

---

## 📜 License
This project is open-source and available under the **MIT License**.  
