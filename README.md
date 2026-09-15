# Abhishek Rajbhar — Premium MERN Portfolio

A recruiter-friendly, futuristic portfolio built with React + Vite on the frontend and Node.js + Express + MongoDB on the backend.

## Features
- Responsive glassmorphism / pink-purple-magenta visual system
- CSS-only 3D hero orb and floating code panels
- Scroll reveal animations
- Interactive project cards and skill cards
- Accessible navigation and reduced-motion support
- Contact form with server-side validation
- MongoDB persistence for contact submissions
- MVC backend structure: models, controllers, routes
- Centralized Express error handling

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

Frontend: http://localhost:5173  
API: http://localhost:5000

MongoDB is optional until a contact submission is made. Set `MONGODB_URI` for persistence.

## Resume
Put your PDF at:
`client/public/Abhishek-Rajbhar-Resume.pdf`

The Download Resume button automatically points to that file.

## Production
```bash
npm run build
npm start
```
