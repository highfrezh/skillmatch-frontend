# About SkillMatch

**SkillMatch** is an AI-powered freelance marketplace designed to connect small businesses and startups across Africa with skilled remote freelancers.

Whether you're a growing company looking to hire talent or a freelancer seeking meaningful projects, SkillMatch provides a smart, efficient, and transparent platform to collaborate.

---

## 🎯 Our Mission

We aim to empower African SMEs by making it easy to discover, assess, and hire top freelancers — while helping professionals showcase their skills and earn remotely.

---

## 🚀 Key Features

- **Smart Job Matching** – Uses NLP and resume scoring to rank freelancer proposals  
- **Resume Builder** – Freelancers can showcase skills, education, and upload a resume file  
- **Job Posting** – Employers can post and manage freelance job opportunities  
- **Proposal Submission** – Freelancers can apply to jobs with cover letters  
- **Shortlisting + Status Updates** – Employers can shortlist or reject applicants  
- **Built-in Messaging** – Chat feature between employer and freelancer after shortlisting  

---

## 🛠 Tech Stack

- **Frontend:** React, Tailwind CSS, React Router, Axios  
- **Backend:** Django REST Framework, JWT Authentication, spaCy NLP  
- **Database:** PostgreSQL (or SQLite in development)  

---

## 🌍 Who Is It For?

SkillMatch is ideal for:

- 📌 Startups or small businesses hiring remote freelancers  
- 📌 Freelancers looking to apply their skills in real-world projects  
- 📌 Developers building their portfolio with full-stack AI-driven applications  

---

## 💡 Future Goals

We plan to expand SkillMatch with features like:

- Payment integration  
- Freelancer reviews  
- Job filtering by category  
- AI-powered recommendations for both sides  




# 📘 SkillMatch API Documentation

Welcome to the developer guide for **SkillMatch** — an AI-powered freelance job marketplace that connects African SMEs with skilled remote talent. This documentation provides details on how to interact with key features such as job posting, resume profile formatting, and proposal matching.

---

## 🛠️ Project Overview

SkillMatch is a full-stack web application built with **Django REST Framework** and **React.js**. It enables:

- Employers to post remote jobs
- Freelancers to create resume profiles and submit proposals
- An intelligent match scoring system based on resume content and job requirements
- A built-in messaging system for communication after shortlisting

---

## 📃 Resume Description Format (Freelancer)

To improve your proposal match score, freelancers should populate their resume profile using clear and structured content.

### ✅ Fields

| Field           | Type           | Description                                         |
|----------------|----------------|-----------------------------------------------------|
| `skills`       | `string`       | Comma-separated list of technical and soft skills   |
| `experience`   | `string`       | Summary of past work experience and projects        |
| `education`    | `string`       | Academic background or certifications               |
| `resume_file`  | `file`         | Optional resume upload (PDF/DOCX) for NLP scoring   |

### ✅ Example Input

```json
{
  "skills": "Django, React, Tailwind CSS, PostgreSQL, REST API",
  "experience": "Developed a freelance job board using Django REST and React. Built user authentication, chat system, and job matching engine.",
  "education": "BSc in Computer Science from University of Ibadan"
}


Here’s a complete **Markdown guide** for running the **SkillMatch frontend (React + Vite + Tailwind CSS)** locally:

---

````md
# 🌐 How to Run the SkillMatch Frontend (React)

This guide explains how to set up and run the frontend of the **SkillMatch** project on your local machine.

---

## ✅ Requirements

- Node.js (v18 or higher recommended)
- npm or yarn
- Git

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/highfrezh/skillmatch-frontend.git
cd skillmatch-frontend
````

---

### 2. Install Dependencies

```bash
npm install
# or if using yarn
# yarn install
```

---

### 3. Configure the API URL

Make sure the Axios instance points to your backend URL. In `src/services/axios.js`, update the base URL:

```js
const BASE_URL = 'http://127.0.0.1:8000/api/v1'; // For local development
```

> 🔒 If you're using production or Render, replace with the deployed backend URL.

---

### 4. Run the Development Server

```bash
npm run dev
# or
# yarn dev
```

Your app should now be running at [http://localhost:5173](http://localhost:5173)

---

### 5. Tailwind Setup (If Needed)

Ensure the following in your project:

* `tailwind.config.js` includes:

```js
content: ["./index.html", "./src/**/*.{js,jsx}"],
```

* `src/index.css` includes:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 📁 Folder Structure

```bash
src/
├── assets/            # Images, icons, etc.
├── components/        # Navbar, Footer, reusable components
├── layouts/           # Dashboard layout, shared views
├── pages/             # Home, About, Register, Login, Dashboard, etc.
├── services/axios.js  # Axios instance with interceptors
├── App.jsx            # Routes & layout structure
└── main.jsx           # React root render
```

---

## 🔁 Connecting to Backend

Make sure your Django backend is:

* Running at `http://127.0.0.1:8000`
* CORS is enabled via `django-cors-headers`

```python
# settings.py
INSTALLED_APPS = [
    ...
    "corsheaders",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    ...
]

CORS_ALLOW_ALL_ORIGINS = True  # Or use specific whitelist
```

---

## 🌍 Build for Production

```bash
npm run build
# or
# yarn build
```

This creates an optimized production build in the `dist` folder.

---

## 🧠 Notes

* Make sure the user is redirected based on role (`freelancer` vs `employer`) after login
* Pages are protected using token-based authentication (JWT)
* The app includes loading indicators, toasts, and role-based dashboards

---

## 🧵 Tech Stack

* **React** (with Vite)
* **Tailwind CSS**
* **React Router v6**
* **Axios** (with interceptors)
* **React Toastify**
* Optional: `react-icons`, `framer-motion`, `date-fns`






