# 🪟 Windows Deployment Steps - Copy & Paste Ready

## 🎯 Step 1: Push Changes to GitHub

Open PowerShell and run these commands **one at a time**:

```powershell
# Navigate to project directory
cd E:\HamletUnified\DigitalDemocracy-Iraq-Clean

# Add all changes
git add .

# Commit changes
git commit -m "Configure Cloudflare Pages deployment with wrangler.toml"

# Push to GitHub
git push origin main
```

**If you get an error about authentication**, you'll need to authenticate with GitHub first.

---

## 🎯 Step 2: Deploy to Cloudflare Pages (Dashboard Method - Easiest)

### 2.1 Go to Cloudflare Dashboard
1. Open your browser
2. Go to: https://dash.cloudflare.com/
3. Login with your Cloudflare account

### 2.2 Create New Pages Project
1. Click **Workers & Pages** in the left sidebar
2. Click **Create Application** button
3. Select **Pages** tab
4. Click **Connect to Git**

### 2.3 Connect Repository
1. If not connected, authorize Cloudflare to access your GitHub
2. Find and select: **DigitalDemocracy-Iraq-Clean**
3. Click **Begin setup**

### 2.4 Configure Build Settings

Cloudflare will auto-detect most settings from your `wrangler.toml`. Just verify:

- **Project name**: `digitaldemocracy-iraq` (or your preferred name)
- **Production branch**: `main`
- **Framework preset**: Next.js
- **Build command**: `npm install && npm run build`
- **Build output directory**: `.next`

### 2.5 Environment Variables

These should be auto-loaded, but if not, add them manually:

| Variable Name | Value |
|---------------|-------|
| `NODE_VERSION` | `20` |
| `NEXT_PUBLIC_API_BASE_URL` | `https://digitaldemocracy-iraq-production.up.railway.app` |
| `NEXT_PUBLIC_GEMINI_API_KEY` | `AIzaSyBmy5qQ9oXPsan3cIa9tMHsLpN47sR0zb0` |

### 2.6 Deploy!
1. Click **Save and Deploy**
2. Wait 3-5 minutes for build to complete
3. Your site will be live at: `https://[your-project-name].pages.dev`

---

## 🎯 Alternative: Deploy via CLI (If you prefer terminal)

### 3.1 Install Wrangler
```powershell
npm install -g wrangler
```

### 3.2 Login to Cloudflare
```powershell
npx wrangler login
```
This will open your browser for authentication.

### 3.3 Build Your Project
```powershell
cd E:\HamletUnified\DigitalDemocracy-Iraq-Clean
npm run build
```

### 3.4 Deploy
```powershell
npx wrangler pages deploy .next --project-name=digitaldemocracy-iraq
```

---

## ✅ Verify Deployment

Once deployed, test these URLs:

1. **Home Page**: `https://[your-project-name].pages.dev/`
2. **Candidates**: `https://[your-project-name].pages.dev/candidates`
3. **Community**: `https://[your-project-name].pages.dev/community`

### Check Backend Connection:
The candidates page should display real data from:
```
https://digitaldemocracy-iraq-production.up.railway.app/api/candidates
```

---

## 🆘 If Something Goes Wrong

### Build Error: "Module not found"
- **Already Fixed**: Component paths are now correct
- If still occurs, check the Cloudflare build logs for specific file path

### Environment Variables Not Working
1. Go to Cloudflare Dashboard
2. Navigate to: **Workers & Pages** → Your Project → **Settings** → **Environment Variables**
3. Add them manually under **Production** environment

### API Calls Failing (CORS errors)
- Verify the Railway backend is running
- Check browser console for exact error
- Ensure `NEXT_PUBLIC_API_BASE_URL` is set correctly

---

## 📋 Quick Checklist

Before deploying, ensure:
- ✅ Changes pushed to GitHub (`git push origin main`)
- ✅ `wrangler.toml` file exists in root directory
- ✅ `.node-version` file contains `20`
- ✅ Railway backend is running and accessible
- ✅ You have a Cloudflare account (free plan works!)

---

## 🎉 That's It!

Your beautiful Iraqi Democracy platform will be live on Cloudflare Pages in minutes!

**Deployment URL Format**: 
```
https://digitaldemocracy-iraq.pages.dev
```

Or connect your custom domain in Cloudflare Dashboard!

