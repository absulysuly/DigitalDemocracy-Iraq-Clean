# 📋 COPY & PASTE COMMANDS FOR WINDOWS

## ⚡ Quick Deploy - Just 3 Commands!

Open PowerShell and copy-paste these commands **one by one**:

### 1️⃣ Navigate to Project
```powershell
cd E:\HamletUnified\DigitalDemocracy-Iraq-Clean
```

### 2️⃣ Push to GitHub
```powershell
git push origin main
```

### 3️⃣ Open Cloudflare Dashboard
```powershell
start https://dash.cloudflare.com/
```

---

## 🌐 Then in Cloudflare Dashboard:

1. Click **Workers & Pages** → **Create Application** → **Pages**
2. Select **Connect to Git**
3. Choose repository: **DigitalDemocracy-Iraq-Clean**
4. Click **Save and Deploy**

**That's it! Your site will be live in 3-5 minutes!** 🎉

---

## 🔧 Alternative: CLI Deployment

If you prefer using the command line:

```powershell
# Install Wrangler (only needed once)
npm install -g wrangler

# Login to Cloudflare (opens browser)
npx wrangler login

# Build the project
npm run build

# Deploy to Cloudflare
npx wrangler pages deploy .next --project-name=digitaldemocracy-iraq
```

---

## ✅ After Deployment - Verify

Your site will be at: `https://digitaldemocracy-iraq.pages.dev`

Test these pages:
- Home: `https://digitaldemocracy-iraq.pages.dev/`
- Candidates: `https://digitaldemocracy-iraq.pages.dev/candidates`
- Community: `https://digitaldemocracy-iraq.pages.dev/community`

---

## 🆘 If Git Push Fails

If `git push origin main` gives an authentication error, run:

```powershell
git config --local commit.gpgsign false
git push origin main
```

Or push using GitHub Desktop if you have it installed.

---

## 📞 Quick Help

**Build failing?** → Check Cloudflare build logs in dashboard
**API not working?** → Verify Railway backend is running
**Need environment variables?** → They're in `wrangler.toml`, auto-loaded

---

## 🎯 What's Already Configured

✅ `wrangler.toml` - Cloudflare configuration  
✅ `.node-version` - Node 20 specified  
✅ `vercel.json` - Vercel fallback config  
✅ Backend API URL - Railway production backend  
✅ Gemini API Key - AI features enabled  
✅ Beautiful UI - Glassmorphism design ready  
✅ Real Data - 7,769+ candidates connected  

---

## 🚀 You're Ready to Deploy!

**Estimated time**: 5-10 minutes total
**Result**: Beautiful, functional Iraqi Democracy platform live on the web!

