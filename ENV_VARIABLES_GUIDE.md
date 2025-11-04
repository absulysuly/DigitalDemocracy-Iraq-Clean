# 🔧 ENVIRONMENT VARIABLES CONFIGURATION GUIDE

## 📋 Required Environment Variables

### Frontend (Vercel)

Add these variables in your Vercel Project Settings → Environment Variables:

```env
# Backend Connection (REQUIRED)
NEXT_PUBLIC_API_BASE_URL=https://digitaldemocracy-iraq-production.up.railway.app

# AI Content Generation (OPTIONAL but recommended)
NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key-here
```

### Backend (Railway)

Add these variables in your Railway Project Settings:

```env
# Database Connection (REQUIRED)
DATABASE_URL=postgresql://user:password@host:port/dbname

# Server Settings
NODE_ENV=production
PORT=10000
```

---

## 🔑 How to Get API Keys

### 1. Gemini API Key (For AI Content Generation)

1. Go to: https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key
5. Add to Vercel as: `NEXT_PUBLIC_GEMINI_API_KEY`

### 2. Railway Database URL

1. Go to Railway Dashboard: https://railway.app/dashboard
2. Select your project
3. Click on "PostgreSQL" service
4. Go to "Variables" tab
5. Copy the `DATABASE_URL` value
6. Use this for backend activation

---

## ✅ Verification Steps

### Test Backend Connection:
```bash
curl https://digitaldemocracy-iraq-production.up.railway.app/api/health
```

Expected response: `{ "status": "ok" }`

### Test AI Generation:
```typescript
import { generateSocialPost } from '@/services/geminiService';

const post = await generateSocialPost();
console.log(post); // Should return AI-generated content
```

---

## 🚀 Quick Setup Commands

### For Vercel (via CLI):
```bash
vercel env add NEXT_PUBLIC_API_BASE_URL
# Paste: https://digitaldemocracy-iraq-production.up.railway.app

vercel env add NEXT_PUBLIC_GEMINI_API_KEY
# Paste your Gemini API key
```

### For Railway (via CLI):
```bash
railway variables set DATABASE_URL=your-postgresql-url
railway variables set NODE_ENV=production
railway variables set PORT=10000
```

---

## 📊 Environment Variable Priority

1. **Production** (Highest priority)
2. **Preview** (Branch deployments)
3. **Development** (Local .env.local)

Always set variables for **Production** first!

---

## 🔒 Security Best Practices

- ✅ Never commit API keys to Git
- ✅ Use `.env.local` for local development (already in `.gitignore`)
- ✅ Rotate API keys periodically
- ✅ Use separate keys for development and production
- ✅ Enable Railway/Vercel access logs

---

## 🆘 Troubleshooting

### Issue: "API_BASE_URL is undefined"
**Solution:** Add `NEXT_PUBLIC_API_BASE_URL` to Vercel environment variables and redeploy

### Issue: "AI features are disabled"
**Solution:** Add `NEXT_PUBLIC_GEMINI_API_KEY` to enable AI content generation

### Issue: "Database connection failed"
**Solution:** Verify `DATABASE_URL` format in Railway: `postgresql://user:pass@host:port/db`

---

## ✨ Optional Enhancements

### Add Analytics:
```env
NEXT_PUBLIC_GOOGLE_ANALYTICS=G-XXXXXXXXXX
```

### Add Error Tracking:
```env
NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx
```

### Enable Debug Mode:
```env
NEXT_PUBLIC_DEBUG=true
```

---

**After adding environment variables, redeploy your application for changes to take effect!**

