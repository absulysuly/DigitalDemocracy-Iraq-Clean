# 🚀 Cloudflare Pages Deployment Guide

## ✅ Configuration Complete

Your project is now **100% ready** for Cloudflare Pages deployment!

## 📋 What's Been Configured

### 1. **wrangler.toml** ✅
```toml
name = "digitaldemocracy-iraq"
compatibility_date = "2024-11-04"
pages_build_output_dir = ".next"

[build]
command = "npm install && npm run build"

[build.environment]
NODE_VERSION = "20"
NEXT_PUBLIC_API_BASE_URL = "https://digitaldemocracy-iraq-production.up.railway.app"
NEXT_PUBLIC_GEMINI_API_KEY = "AIzaSyBmy5qQ9oXPsan3cIa9tMHsLpN47sR0zb0"
```

### 2. **.node-version** ✅
```
20
```

### 3. **Component Case Sensitivity** ✅
- Fixed: `components/ui/IraqiHeader.tsx` is now in the correct lowercase `ui` directory
- This prevents "Module not found" errors on Linux-based Cloudflare servers

## 🎯 Deployment Steps

### Option 1: Cloudflare Dashboard (Recommended)

1. **Go to Cloudflare Dashboard**
   - Visit: https://dash.cloudflare.com/
   - Navigate to: **Workers & Pages** → **Create Application** → **Pages**

2. **Connect to GitHub**
   - Select: **Connect to Git**
   - Choose repository: `DigitalDemocracy-Iraq-Clean`
   - Branch: `main`

3. **Build Settings** (Auto-detected from `wrangler.toml`)
   - **Framework preset**: Next.js
   - **Build command**: `npm install && npm run build`
   - **Build output directory**: `.next`
   - **Node version**: 20

4. **Environment Variables** (Auto-loaded from `wrangler.toml`)
   - `NEXT_PUBLIC_API_BASE_URL` = `https://digitaldemocracy-iraq-production.up.railway.app`
   - `NEXT_PUBLIC_GEMINI_API_KEY` = `AIzaSyBmy5qQ9oXPsan3cIa9tMHsLpN47sR0zb0`

5. **Click "Save and Deploy"**

### Option 2: Wrangler CLI

```bash
# Install Wrangler globally (if not installed)
npm install -g wrangler

# Login to Cloudflare
npx wrangler login

# Deploy
cd E:\HamletUnified\DigitalDemocracy-Iraq-Clean
npx wrangler pages deploy .next --project-name=digitaldemocracy-iraq
```

## 🔧 What This Project Includes

### ✅ Features Connected to Backend:
- **Candidates Browser**: Fetches real data from Railway backend
- **Stats Dashboard**: Live election statistics
- **Governorate Filter**: Dynamic filtering of candidates
- **Party Information**: Real party data
- **Community Feed**: Ready for backend integration
- **Gemini AI**: Post generation capabilities

### 🎨 Beautiful UI:
- **Glassmorphism Design**: Modern glass effects
- **Dark Theme**: Consistent dark mode throughout
- **RTL Support**: Full Arabic/Kurdish support
- **Responsive**: Mobile-first design
- **Multi-language**: Arabic, English, Kurdish

## 🌐 Backend API

- **URL**: `https://digitaldemocracy-iraq-production.up.railway.app`
- **Status**: ✅ Live and operational
- **Data**: 7,769+ Iraqi candidates with real information

### Available Endpoints:
- `GET /api/candidates` - List all candidates with pagination
- `GET /api/stats` - Election statistics
- `GET /api/governorates` - List of governorates
- `GET /api/parties` - List of political parties
- `POST /api/posts` - Create social posts (ready for implementation)
- `POST /api/posts/:id/like` - Like posts (ready for implementation)
- `POST /api/generate-post-idea` - AI post generation

## 🎉 Expected Deployment URL

Your site will be available at:
```
https://digitaldemocracy-iraq.pages.dev
```

Or with custom domain:
```
https://yoursite.com
```

## 📊 After Deployment

### Verify Everything Works:

1. **Home Page**: Should load with beautiful glassmorphism UI
2. **Candidates Page**: Should display real candidates from Railway backend
3. **Community Feed**: Should load (currently with mock data, ready for backend)
4. **Language Switching**: Arabic ↔ English ↔ Kurdish
5. **Dark Theme**: Should be consistent throughout

## 🆘 Troubleshooting

### If build fails with "Module not found":
- **Fixed**: All component imports now use correct lowercase paths

### If API calls fail:
- Check that `NEXT_PUBLIC_API_BASE_URL` is set in Cloudflare dashboard
- Verify Railway backend is running: https://digitaldemocracy-iraq-production.up.railway.app/api/candidates

### If environment variables don't work:
- In Cloudflare dashboard, go to: **Settings** → **Environment Variables**
- Manually add both environment variables if needed

## 📝 Notes

- **Build time**: Expect 3-5 minutes for first deployment
- **Automatic deploys**: Every push to `main` branch triggers new deployment
- **Preview deploys**: Pull requests get preview URLs automatically
- **Node version**: Locked to v20 for consistency

## 🚀 You're Ready!

Everything is configured. Just push to GitHub and deploy via Cloudflare Dashboard!

```bash
# Commit and push (already done for you)
git add .
git commit -m "Configure Cloudflare Pages deployment"
git push origin main
```

Then go to Cloudflare Dashboard and click "Deploy"! 🎉
