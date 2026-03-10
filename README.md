# Online Survey System (Node.js Assignment)

A simple beginner-friendly assignment project for **Student Online Learning Experience**.

## Tech Stack
- Node.js + Express.js
- EJS (server-rendered views)
- MongoDB + Mongoose
- Bootstrap 5
- No AJAX (normal form submit + page reload flow)

## Pages Included
1. Survey form page: `/survey`
2. Thank-you page: `/thank-you`
3. Bar chart page: `/charts/bar`
4. Pie chart page: `/charts/pie`
5. Map chart page: `/charts/map`

---

## How to run it

### 1) Prerequisites
Make sure these are installed:
- Node.js (v18+ recommended)
- npm
- MongoDB (local installation)

### 2) Open the project folder
```bash
cd /workspace/web_ass1
```

### 3) Install dependencies
```bash
npm install
```

### 4) Start MongoDB
If you have MongoDB as a local service, start it using your OS service manager.
Default connection used by this app:

```text
mongodb://127.0.0.1:27017/online_survey_db
```

Optional: you can use a custom MongoDB URL:

```bash
export MONGODB_URI="your_mongodb_connection_string"
```

### 5) Run the app
```bash
npm start
```

For development mode (auto-restart):
```bash
npm run dev
```

### 6) Open in browser
```text
http://localhost:3000
```

---

## Quick usage flow
1. Open `/survey` and submit the form.
2. You are redirected to `/thank-you`.
3. Open chart pages from the top navbar:
   - Bar chart (satisfaction)
   - Pie chart (preferred device)
   - Map chart (country)

---

## Project Structure
```text
web_ass1/
├── models/
│   └── Survey.js
├── public/
│   └── css/
│       └── style.css
├── views/
│   ├── partials/
│   │   ├── head.ejs
│   │   └── foot.ejs
│   ├── survey-form.ejs
│   ├── thank-you.ejs
│   ├── bar-chart.ejs
│   ├── pie-chart.ejs
│   └── map-chart.ejs
├── server.js
├── package.json
└── .gitignore
```
