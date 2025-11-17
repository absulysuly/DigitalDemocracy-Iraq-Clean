# 🚀 Hamlet MVP - Deployment Guide

Complete guide to deploying the Hamlet MVP to Vercel with Postgres database.

## 📋 Prerequisites

- GitHub account
- Vercel account (free tier works)
- Git installed locally

## 🗄️ Step 1: Set Up Vercel Postgres Database

### 1.1 Create a New Vercel Project

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your GitHub repository: `absulysuly/DigitalDemocracy-Iraq-Clean`
4. Select the branch: `claude/deploy-hamlet-mvp-019Ev2Fr21mckaBsZ4sZtd9W`
5. **DO NOT deploy yet** - click on the project settings first

### 1.2 Add Vercel Postgres Storage

1. In your Vercel project dashboard, go to the "Storage" tab
2. Click "Create Database"
3. Select "Postgres"
4. Choose a database name (e.g., `hamlet-mvp-db`)
5. Select the region closest to your users (e.g., `Frankfurt` for Middle East)
6. Click "Create"

### 1.3 Connect Database to Your Project

1. After creating the database, click "Connect to Project"
2. Select your Hamlet MVP project
3. Vercel will automatically add the `DATABASE_URL` environment variable to your project
4. The connection string will look like:
   ```
   postgres://default:xxxxx@ep-xxxxx.us-east-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require
   ```

## 🔧 Step 2: Configure Environment Variables

1. In your Vercel project, go to "Settings" → "Environment Variables"
2. Verify that `DATABASE_URL` is set (auto-added from Postgres setup)
3. Add any optional variables:
   - `API_KEY` - Google Gemini API key (optional, for AI features)
   - `NEXT_PUBLIC_API_BASE_URL` - Leave empty (using internal APIs)

## 🛠️ Step 3: Deploy the Application

### 3.1 Trigger Deployment

1. Go to the "Deployments" tab
2. Click "Deploy" or push to your branch to trigger auto-deployment
3. Vercel will:
   - Install dependencies
   - Run `prisma generate`
   - Build the Next.js application
   - Deploy to production

### 3.2 Monitor Build Progress

- Watch the build logs to ensure no errors
- The build should complete in 2-4 minutes
- You'll get a deployment URL like: `https://hamlet-mvp.vercel.app`

## 💾 Step 4: Initialize Database Schema

### 4.1 Run Database Migration

After deployment, you need to create the database tables:

1. Go to your Vercel project → "Storage" → Select your Postgres database
2. Click on "Query" tab
3. Or use Vercel CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link to your project
vercel link

# Pull environment variables
vercel env pull .env.local

# Run migration
npx prisma migrate deploy
```

### 4.2 Alternative: Use Prisma Studio in Production

You can also use the Vercel dashboard's built-in SQL editor or connect via Prisma Studio:

```bash
# After pulling env variables
npx prisma studio
```

## 🌱 Step 5: Seed the Database

### 5.1 Seed via Local Script

With your production `DATABASE_URL` in `.env.local`:

```bash
npm run db:seed
```

This will create:
- 10 sample users across 5 governorates
- 10 posts with Arabic, English, and Kurdish content
- 20 places (restaurants, cafés, shops, etc.)
- 5 upcoming events

### 5.2 Verify Seed Data

1. Visit your deployed app: `https://your-app.vercel.app`
2. Check the homepage - you should see posts from different governorates
3. Navigate to Iraq Compass - you should see places and events

## ✅ Step 6: Verification Checklist

After deployment, verify the following:

### 6.1 Performance
- [ ] Homepage loads in < 3 seconds
- [ ] No console errors in browser
- [ ] All API endpoints return data:
  - GET `/api/posts?governorate=Baghdad`
  - GET `/api/places`
  - GET `/api/events`

### 6.2 Functionality
- [ ] Posts feed displays correctly
- [ ] Governorate filter works
- [ ] Iraq Compass shows places
- [ ] Events calendar displays upcoming events
- [ ] Mobile navigation works (test at 375px width)

### 6.3 Internationalization
- [ ] Arabic text displays correctly (RTL)
- [ ] Kurdish text displays correctly (RTL)
- [ ] Language switcher works
- [ ] All pages support multiple languages

### 6.4 Content Verification
- [ ] **NO election-related content visible**
- [ ] Candidates page removed from navigation
- [ ] Only social feed, places, and events visible
- [ ] No voting buttons or political content

## 📱 Step 7: Mobile Testing

Test on actual devices or browser dev tools:

```
Devices to test:
- iPhone SE (375px)
- iPhone 12 Pro (390px)
- Samsung Galaxy S20 (360px)
- iPad (768px)
```

## 🔐 Security Notes

- ✅ Database credentials managed by Vercel (secure)
- ✅ No API keys committed to repository
- ✅ Environment variables encrypted at rest
- ✅ HTTPS enforced on all connections

## 🎯 Post-Deployment Tasks

### Custom Domain (Optional)

1. Go to Vercel project → "Settings" → "Domains"
2. Add your custom domain (e.g., `hamlet.iq`)
3. Configure DNS settings as instructed
4. SSL certificate auto-provisioned

### Analytics (Optional)

1. Enable Vercel Analytics in project settings
2. Monitor real-time visitors and performance
3. Track Core Web Vitals

### Monitoring

1. Set up Vercel monitoring for:
   - Function execution time
   - Database query performance
   - Error tracking

## 🆘 Troubleshooting

### Build Fails

- Check that `tsx` is in devDependencies
- Verify `DATABASE_URL` is set in environment variables
- Check build logs for specific error messages

### Database Connection Error

- Verify `DATABASE_URL` format includes `?sslmode=require`
- Check database is in the same region as deployment
- Ensure connection pool limits not exceeded

### Seed Script Fails

- Make sure migration ran successfully first
- Check database connection string is correct
- Verify `tsx` is installed: `npm install -D tsx`

### No Data Showing

- Run seed script: `npm run db:seed`
- Check API routes return data in Network tab
- Verify Prisma client is generated: `npx prisma generate`

## 📞 Support

For issues or questions:
- Check Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
- Prisma documentation: [prisma.io/docs](https://prisma.io/docs)
- GitHub Issues: Create an issue in the repository

## 🎉 Success!

Your Hamlet MVP is now live! Share the URL:
```
https://your-app-name.vercel.app
```

---

**Deployment Completed**: [Date]
**Version**: Hamlet MVP v1.0
**Database**: Vercel Postgres
**Region**: Frankfurt (fra1)
