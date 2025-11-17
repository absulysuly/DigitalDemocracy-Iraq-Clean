# Digital Diwan - Iraqi Social Election Platform (Next.js 14)

This is a modern, multilingual (English, Arabic, Kurdish), and responsive web application for fostering civic engagement around the Iraqi elections, built with Next.js 14 and the App Router.

## 🔴 CRITICAL: Before You Deploy

The most common deployment error is a mismatch between `package.json` and `package-lock.json`. To fix this permanently before every deployment, you **MUST** run the following commands locally:

1.  **Delete old files** to ensure a clean slate:
    ```bash
    rm -rf node_modules package-lock.json
    ```

2.  **Install dependencies and generate a new lock file**: This command reads your `package.json` and creates a perfectly synced `package-lock.json`.
    ```bash
    npm install
    ```

3.  **Commit the new lock file**: This is the most important step. Your deployment will fail without it.
    ```bash
    git add package-lock.json
    git commit -m "fix: Synchronize package-lock.json"
    git push
    ```
After pushing the updated `package-lock.json`, you can proceed with the Cloudflare deployment steps below.

---

## Getting Started

### 1. Install Dependencies

If you are setting up for the first time, run:

```bash
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🚀 Final Deployment Checklist (Cloudflare Pages)

You're ready to deploy! Follow these steps carefully.

### Pre-Flight Check
1.  **Sync Your Lockfile**: Complete the "CRITICAL: Before You Deploy" steps above. This is not optional.
2.  **Get Your API Keys Ready**: You will need two critical pieces of information. Have them ready in a notepad:
    *   `NEXT_PUBLIC_API_BASE_URL`: This is the full URL to your deployed backend API (e.g., `https://your-backend-api.up.railway.app`).
    *   `API_KEY`: This is your Google Gemini API Key for generating AI posts.

### Deployment Steps on Cloudflare

1.  **Connect to GitHub**:
    *   Log in to your Cloudflare dashboard.
    *   Go to **Workers & Pages** and click **Create application**.
    *   Select the **Pages** tab and click **Connect to Git**.
    *   Choose your project's GitHub repository and click **Begin setup**.

2.  **Configure Build & Deploy Settings**:
    *   **Project name**: Give your project a name (e.g., `digital-diwan`).
    *   **Production branch**: Select your main branch (`main` or `master`).
    *   **Framework preset**: Select **Next.js** from the dropdown. Cloudflare will automatically set the build command and output directory for you. It should look like this:
        *   **Build command**: `npm run build`
        *   **Build output directory**: `.next`
    
3.  **Add Environment Variables (Most Important Step!)**:
    *   Scroll down to **Environment variables (advanced)**.
    *   Click **Add variable** for each of the following. Be very careful with the names and values.

    | Variable Name              | Value                                         | Type   |
    | -------------------------- | --------------------------------------------- | ------ |
    | `NEXT_PUBLIC_API_BASE_URL` | *Paste your backend API URL here*             | Plain  |
    | `API_KEY`                  | *Paste your Google Gemini API Key here*       | Secret |
    | `NODE_VERSION`             | `20`                                          | Plain  |

    *   **Note**: Mark `API_KEY` as `Secret` by clicking the "Encrypt" button. This keeps it secure.

4.  **Deploy!**
    *   Click the **Save and Deploy** button.
    *   Cloudflare will now pull your code from GitHub, build the project, and deploy it. You can watch the progress in the deployment logs.

5.  **Celebrate!**
    *   Once the deployment is finished, Cloudflare will give you a unique URL (e.g., `digital-diwan.pages.dev`). Your application is now live!

Cloudflare will automatically redeploy your site every time you push new changes to your connected branch. You've got this!

---

## 🚀 Final Deployment Checklist (Vercel with Postgres)

Complete guide to deploy Hamlet MVP to Vercel with a managed Postgres database.

### Prerequisites

1. **Install Vercel CLI** (one-time setup):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

### Step 1: Create Postgres Database on Vercel

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to **Storage** tab
3. Click **Create Database** → Select **Postgres**
4. Choose a name for your database (e.g., `hamlet-db`)
5. Select the region closest to your users (e.g., `fra1` for Frankfurt)
6. Click **Create**

Vercel will automatically generate a `DATABASE_URL` environment variable and add it to your project.

### Step 2: Link Your Project

From your project directory:

```bash
# Link this repository to your Vercel project
vercel link

# Pull environment variables from Vercel (including DATABASE_URL)
vercel env pull .env.local
```

### Step 3: Configure Environment Variables

Your `.env.local` file should now contain `DATABASE_URL` from Vercel. If you need additional variables:

1. Go to **Project Settings** → **Environment Variables** in Vercel Dashboard
2. Add these optional variables:

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `API_KEY` | Your Google Gemini API Key | Production, Preview, Development |
| `NODE_ENV` | `production` | Production |

### Step 4: Deploy to Vercel

```bash
# Deploy to production
vercel --prod
```

Vercel will:
- Install dependencies
- Run `prisma generate` (via postinstall script)
- Build your Next.js application
- Deploy to production

### Step 5: Run Database Migrations

After successful deployment, initialize your database:

```bash
# Apply Prisma migrations
npx prisma migrate deploy

# Seed the database with initial data
npm run db:seed
```

### Step 6: Verify Deployment

Test your deployed application:

1. **Home Page**: Visit your Vercel URL (e.g., `https://hamlet-mvp.vercel.app`)
2. **API Endpoints**:
   - `/api/posts?governorate=Baghdad` - Should return posts
   - `/api/places` - Should return Iraq Compass places
   - `/api/events` - Should return events
3. **Arabic/Kurdish Support**: Check RTL layout renders correctly

### Troubleshooting

**Build fails with "DATABASE_URL not found":**
- Run `vercel env pull .env.local` to sync environment variables
- Verify database was created in Vercel Storage tab

**Database connection errors:**
- Check that `DATABASE_URL` includes `?sslmode=require` for Vercel Postgres
- Verify the database is in the same region as your deployment

**Prisma Client errors:**
- Ensure `postinstall` script is running: `"postinstall": "prisma generate"`
- Check build logs for Prisma generation errors

### Continuous Deployment

Vercel automatically deploys when you push to your connected branch:

```bash
git add .
git commit -m "Your commit message"
git push origin your-branch
```

### Local Development with Vercel Postgres

To develop locally with your Vercel Postgres database:

1. Pull environment variables: `vercel env pull .env.local`
2. Run migrations: `npx prisma migrate dev`
3. Start dev server: `npm run dev`

---

**✅ Vercel-ready. You may now deploy Hamlet MVP live.**
