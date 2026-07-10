# SpendSmart — AI-Powered Expense Tracker
 
> Track your spending intelligently. AI auto-categorizes expenses
> from plain descriptions. Built with the MERN stack.
 
**Live Demo:** https://expense-tracker-with-ai-categorizat.vercel.app
**Backend API:** https://expense-tracker-with-ai-categorization.onrender.com
 
---
 
## Screenshots
<img width="953" height="508" alt="image" src="https://github.com/user-attachments/assets/813e0060-4d5d-493c-89da-4a0af2327934" />

<img width="1903" height="1021" alt="image" src="https://github.com/user-attachments/assets/b7942975-e110-4235-afb4-263dfe7a679e" />

<img width="955" height="508" alt="Screenshot 2026-07-11 003256" src="https://github.com/user-attachments/assets/bc1b9cc4-f244-4225-96c5-22e78ac93c75" />


<img width="955" height="508" alt="Screenshot 2026-07-11 003256" src="https://github.com/user-attachments/assets/13f2d2c9-c0a3-4224-968d-0e18db75681f" />

<img width="959" height="509" alt="Screenshot 2026-07-11 003211" src="https://github.com/user-attachments/assets/62136dfa-286e-4af3-a67c-3c6153465a11" />


<img width="1912" height="1006" alt="image" src="https://github.com/user-attachments/assets/630f4cb1-f381-4d68-8f81-c08534eb8851" />

<img width="1912" height="1006" alt="image" src="https://github.com/user-attachments/assets/adc61c1e-6b65-44be-a1e9-bb361417354a" />

<img width="1918" height="1012" alt="image" src="https://github.com/user-attachments/assets/3b761919-5721-402e-8f32-05786d3cec02" />

 
---
 
## Features
 
- **Secure Authentication** — JWT-based login/signup with bcrypt password hashing
- **Full CRUD** — Add, view, edit, and delete expenses with persistent MongoDB storage
- **AI Categorization** — Gemini 1.5 Flash auto-categorizes expenses from descriptions
- **Spending Dashboard** — Monthly totals, transaction count, top category, and
  a color-coded bar chart by category
- **Search & Filter** — Real-time search by description and filter by category
- **Responsive Design** — Works on desktop and mobile
 
---
 
## Tech Stack
 
| Layer | Technology |
|---|---|
| Frontend | React (Vite), React Router, Recharts |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| AI | Google Gemini 1.5 Flash API |
| Auth | JWT, bcryptjs |
| Deployment | Vercel (frontend), Render (backend) |
 
---
 
## Architecture
 
```
React Frontend (Vercel)
      |
      | HTTP / REST API
      |
Express Backend (Render)
   |            |
MongoDB Atlas   Gemini API
```
 
---
 
## Running Locally
 
### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Google AI Studio API key (free at aistudio.google.com)
 
### Backend
```bash
cd backend
npm install
```
 
Create `backend/.env`:
```
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_long_random_secret
JWT_EXPIRES_IN=7d
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
```
 
```bash
npx nodemon server.js
```
 
### Frontend
```bash
cd frontend
npm install
```
 
Create `frontend/.env`:
```
VITE_API_URL=http://localhost:5000
```
 
```bash
npm run dev
```
 
---
 
## API Endpoints
 
### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/signup | Register a new user |
| POST | /api/auth/login | Login and receive JWT |
 
### Expenses (all require Authorization header)
| Method | Endpoint | Description |
|---|---|---|
| GET | /api/expenses | Get all expenses for logged-in user |
| POST | /api/expenses | Create a new expense |
| PUT | /api/expenses/:id | Update an expense |
| DELETE | /api/expenses/:id | Delete an expense |
 
### AI
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/categorize | AI-categorize expense from description |
 
---
 
## Known Limitations
 
- Render free tier has a cold start delay (~30-60s) after inactivity
- AI categorization falls back to 'Other' if the Gemini API is unavailable
- Dashboard shows current month only — historical month view is a planned improvement
 
---
 
## Future Improvements
 
- Month selector on Dashboard for historical spending analysis
- Budget limits per category with visual warnings
- Export expenses to CSV
- Email notifications for monthly spending summary

