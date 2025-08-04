# Job and Network Portal

A full-stack web application to bridge the gap between job seekers and recruiters. With modern UI, AI-enhanced features, and seamless user experience, this portal enables users to explore jobs, apply based on resume skills, post jobs, and receive intelligent suggestions.

---

##  Features

### 1. Authentication & Authorization
- User registration with name, email, password
- Secure login using JWT authentication
- Role-based access (e.g., basic user, admin support ready)
- Protected routes via AuthContext and `Navigate`
- Persistent login via `localStorage`

### 2. Profile Management
- View and update profile
- Upload resume (PDF) and extract skills using AI
- Display extracted skills on the profile
- View jobs posted by the user
- View jobs applied to by the user

### 3. Job Posting & Application
- Create a job with title, description, skills, budget, and location
- Display job cards in `/jobs` page
- Apply to jobs with button toggle and toast notifications
- Paginated job listings for better UX

### 4. Search and Filter Jobs
- Real-time filtering by title, skills, location, or description
- Responsive grid layout
- Paginated and dynamic job feed

### 5. Post Editing
- Edit jobs posted by the user
- Modal form with prefilled job data
- UI updates after editing a post

### 6. Resume Skill Extraction (AI Feature)
- Upload a resume (PDF)
- Extract skills using backend NLP logic
- Store and persist skills in user profile
- Match skills with job requirements

### 7. Smart Job Suggestions (AI Feature)
- Personalized job suggestions based on resume skills
- Match score displayed on job cards

### 8. Public Journal / Explore (Optional Feature)
- Post ideas, achievements, or journal entries
- Public feed with author name, timestamp, tags
- Create journal entries with title, content, and tags

### 9. Navigation & UI
- Responsive Tailwind-based UI
- Role-aware Navbar
- Full dark mode support (`bg-black`, `text-white`)
- Clean and modern layout across pages

---

##  Tech Stack

### Frontend
- React + React Router
- Tailwind CSS
- Axios (with JWT token interceptor)
- Context API for global state (Auth & Skills)

### Backend
- Node.js + Express.js
- MongoDB with Mongoose
- JWT-based Authentication
- AI/NLP: Resume skill extraction + smart suggestions

---

##  Folder Structure
```
Job and Network Portal/
│
├── backend/
│ ├── config/ # DB and server config
│ ├── controllers/ # All route controllers
│ │ ├── applicationController.js
│ │ ├── authController.js
│ │ ├── jobController.js
│ │ ├── smartSuggestionController.js
│ │ └── userController.js
│ ├── middleware/ # Auth middleware, error handling
│ ├── models/ # Mongoose models
│ │ ├── applicationModel.js
│ │ ├── Job.js
│ │ └── User.js
│ ├── routes/ # Express routes
│ │ ├── applicationRoutes.js
│ │ ├── authRoutes.js
│ │ ├── jobRoutes.js
│ │ ├── smartSuggestionRoutes.js
│ │ └── userRoutes.js
│ ├── .env
│ ├── server.js
│ └── package.json
│
├── frontend/
│ ├── public/ # Static assets
│ ├── src/
│ │ ├── api/
│ │ │ └── axios.js # Axios instance with interceptors
│ │ ├── assets/ # Images, SVGs
│ │ │ ├── PERSON.jpg
│ │ │ ├── WORK.jpg
│ │ │ └── react.svg
│ │ ├── components/ # Reusable UI components
│ │ │ ├── JobCard.jsx
│ │ │ ├── Navbar.jsx
│ │ │ └── ResumeSkillExtractor.jsx
│ │ ├── contexts/ # React Context for auth & skills
│ │ │ ├── AuthContext.jsx
│ │ │ └── SkillContext.jsx
│ │ ├── pages/ # Main pages
│ │ │ ├── Dashboard.jsx
│ │ │ ├── Jobs.jsx
│ │ │ ├── Login.jsx
│ │ │ ├── PostJob.jsx
│ │ │ ├── Profile.jsx
│ │ │ ├── Register.jsx
│ │ │ ├── ResumeSkills.jsx
│ │ │ └── SmartSuggestions.jsx
│ │ ├── services/ # Additional helpers if needed
│ │ ├── App.jsx
│ │ ├── App.css
│ │ ├── index.css
│ │ └── main.jsx
│ └── package.json
```

---

##  Future Enhancements
- Add likes/comments to journal posts
- Admin dashboard with user/job monitoring
- Real-time notifications or messaging
- Deployment using Render (backend) and Vercel (frontend)

---

##  How to Run Locally

### Backend
```bash
cd backend
npm install
npm start
```
### Frontend
```
cd frontend
npm install
npm run dev
```

## Contact
```
Harsh – harsh31102005@gmail.com
GitHub: HARSHSINGH3118
```
