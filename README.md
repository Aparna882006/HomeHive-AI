# 🏡 HomeHive AI – Rent & Flatmate Finder

HomeHive AI is a modern web application that simplifies the process of finding rental properties and compatible flatmates. It combines an intuitive property search experience with AI-powered compatibility scoring to help users discover the perfect place to live.

## 🌐 Live Demo

🔗 https://home-hive-ai-three.vercel.app/

---

## ✨ Features

### 🏠 Property Search
- Browse rental properties with detailed information.
- Filter properties by location, budget, and room type.
- View property images and descriptions.

### 👥 Flatmate Finder
- Discover shared accommodation listings.
- Find compatible flatmates based on lifestyle preferences.
- View flatmate profiles and property details.

### 🤖 AI Compatibility Score
- AI-generated compatibility score for each property/flatmate.
- Personalized recommendations based on user preferences.
- Smart matching to improve rental decisions.

### ❤️ Favorites
- Save favorite properties.
- Quickly access shortlisted listings.

### 🔐 User Authentication
- Secure Sign Up & Login using Supabase Authentication.
- Protected user dashboard.
- Session management.

### 📱 Responsive Design
- Mobile-friendly interface.
- Clean and modern UI.
- Optimized for desktop, tablet, and mobile devices.

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Framer Motion

### Backend
- Node.js
- Express.js

### Database & Authentication
- Supabase

### AI Integration
- Google Gemini API

### Deployment
- Frontend: Vercel
- Backend: Render

---

## 📂 Project Structure

```
HomeHive-AI/
│
├── client/
│   ├── src/
│   ├── public/
│   ├── package.json
│
├── server/
│   ├── routes/
│   ├── controllers/
│   ├── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/Aparna882006/HomeHive-AI.git
```

```bash
cd HomeHive-AI
```

---

### Install Frontend

```bash
cd client
npm install
```

---

### Install Backend

```bash
cd ../server
npm install
```

---

## ▶️ Running the Project

### Start Backend

```bash
cd server
npm start
```

### Start Frontend

```bash
cd client
npm run dev
```

---

## 🔑 Environment Variables

### Client (.env)

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=your_backend_url
```

### Server (.env)

```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
```

---

## 📸 Screens

- Home Page
- Property Listings
- Property Details
- Flatmate Finder
- AI Compatibility Score
- User Dashboard
- Favorites
- Authentication

---

## 🚀 Future Improvements

- Real-time chat between users
- Google Maps integration
- Advanced AI recommendations
- Property reviews and ratings
- Email notifications
- Admin dashboard

---

## 👩‍💻 Developed By

**Aparna Singh**

GitHub: https://github.com/Aparna882006

---

## 📄 License

This project is created for educational and portfolio purposes.
