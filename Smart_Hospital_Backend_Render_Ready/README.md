# Smart Hospital - Backend (Render-ready)

This repository is prepared for quick deployment to Render.com and connects to MongoDB Atlas.

## What this package includes
- Express backend with routes: /api/auth, /api/patients, /api/vitals
- JWT-based auth, Mongoose models, and example .env
- `render.yaml` for Render auto-deploy configuration

---
## Step 1 — Create MongoDB Atlas (free)
1. Go to https://www.mongodb.com/cloud/atlas and sign up (free tier).
2. Create a new project and a free cluster (choose a region close to your users).
3. In **Database Access** → **Add New Database User**, create a user and password.
4. In **Network Access** → **IP Access List**, add `0.0.0.0/0` temporarily to allow connections from anywhere (or add Render's IPs later).
5. In **Clusters**, click **Connect** → **Connect your application** → copy the connection string. It looks like:

 `mongodb+srv://<username>:<password>@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

Replace `<username>`, `<password>`, and `myFirstDatabase` with your values. Use `smart_hospital` as the database name.

## Step 2 — Create a GitHub repo and push this code
1. Create a new repository on GitHub (e.g. `smart-hospital-backend`).
2. Push the contents of this package to that repo.

## Step 3 — Deploy to Render
1. Go to https://render.com and sign in (or create an account).
2. Click **New +** → **Web Service** → **Connect account** (link your GitHub) → choose the repo.
3. Render will read `render.yaml` automatically. If not, set:
   - **Build command:** `npm install`
   - **Start command:** `npm start`
4. In Render's **Environment** settings, add these environment variables (from your Atlas and your secret):
   - `MONGO_URI` = your atlas connection string (use the database name `smart_hospital`)
   - `JWT_SECRET` = a long random string
   - `PORT` = `10000` (optional — Render sets a port automatically)
5. Click **Create Web Service**. Render will build and deploy. You'll get a public URL like `https://smart-hospital-backend.onrender.com`.

## Step 4 — Connect Frontend
- In your frontend deployment (Vercel/Netlify), set `VITE_API_URL` to `https://<your-render-url>/api`.

## Useful tips
- For production, restrict Atlas IP access and use proper VPC / private networking.
- Rotate JWT_SECRET and use a secure password for the database user.
- Add HTTPS enforcement and CORS rules if necessary.

---
Generated: 2025-11-04T04:48:57.792197 UTC
