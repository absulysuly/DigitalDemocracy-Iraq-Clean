# 🤖 README FOR AI AGENTS (Claude, Codex, Cursor, etc.)

## ⚠️ CRITICAL: Read This Before Making Any Changes!

This document is specifically for AI coding assistants to understand the current state of this project and avoid breaking things.

---

## 🎯 PROJECT STATUS: ✅ PRODUCTION READY

**DO NOT REFACTOR OR "IMPROVE" WITHOUT EXPLICIT USER REQUEST**

This project has been carefully configured and debugged. It is **ready for deployment**.

---

## 📋 PROJECT OVERVIEW

**Name**: DigitalDemocracy-Iraq-Clean (Display name: "Creator Hub")  
**Type**: Next.js 14 application with TypeScript  
**Purpose**: Iraqi Democracy platform with candidate browsing and social features  
**Deployment**: Configured for Cloudflare Pages (primary) and Vercel (backup)  
**Backend**: Railway-hosted API at `https://digitaldemocracy-iraq-production.up.railway.app`

---

## 🚨 CRITICAL FILES - DO NOT MODIFY UNLESS ASKED

| File | Purpose | Notes |
|------|---------|-------|
| `wrangler.toml` | Cloudflare Pages config | ✅ Correctly configured |
| `.node-version` | Node.js version lock | ✅ Set to `20` |
| `next.config.mjs` | Next.js configuration | ✅ Optimized for deployment |
| `package.json` | Dependencies | ✅ All packages working |
| `vercel.json` | Vercel deployment | ✅ Fallback config |
| `app/globals.css` | Global styles | ✅ Beautiful glassmorphism design |

---

## 🏗️ PROJECT ARCHITECTURE

### Tech Stack:
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3 (NOT v4)
- **UI Library**: Headless UI, Lucide React icons
- **Backend**: Express.js + Prisma on Railway
- **Database**: PostgreSQL (7,769+ candidates)
- **AI**: Google Gemini API for content generation

### Key Directories:
```
├── app/                    # Next.js App Router pages
│   ├── candidates/         # Candidate browsing (✅ Connected to backend)
│   ├── community/          # Social feed (🔜 Ready for backend)
│   └── api/                # API routes
├── components/
│   ├── ui/                 # ⚠️ LOWERCASE 'ui' - DO NOT CHANGE TO 'UI'
│   ├── views/              # Main view components
│   └── election/           # Election-specific components
├── lib/
│   ├── api.ts              # API service layer
│   └── types.ts            # TypeScript interfaces
└── services/
    └── apiService.ts       # Legacy API service (being migrated)
```

---

## ⚠️ KNOWN ISSUES (ALREADY FIXED - DO NOT "FIX" AGAIN)

### ✅ Case Sensitivity Issue - RESOLVED
**Problem**: `components/UI/` vs `components/ui/`  
**Solution**: All imports now use lowercase `components/ui/`  
**DO NOT**: Rename the directory or change imports

### ✅ Tailwind v4 Migration Attempt - REVERTED
**Status**: Project uses Tailwind v3  
**DO NOT**: Upgrade to Tailwind v4 or change `@theme` directives

### ✅ Node Version Mismatch - RESOLVED
**Status**: Locked to Node 20 via `.node-version`  
**DO NOT**: Change Node version or add `engines` field modifications

---

## 🔧 WHAT WORKS (DO NOT BREAK)

### ✅ Connected to Backend:
- `/candidates` page - Displays real candidates from Railway API
- `/api/candidates` endpoint - Proxies to backend
- Stats dashboard - Real election data
- Governorate filtering - Works with backend data
- Party filtering - Works with backend data

### ✅ UI/UX:
- Glassmorphism design - Beautiful, professional
- Dark theme - Consistent across all pages
- RTL support - Arabic and Kurdish languages
- Multi-language - i18n fully implemented
- Responsive - Mobile-first design

### 🔜 Ready for Implementation:
- Community posts (backend endpoints exist, frontend ready)
- Like functionality (API ready, needs frontend connection)
- Gemini AI post generation (endpoint ready)

---

## 🚫 THINGS NOT TO DO

### DO NOT:
1. ❌ Upgrade Tailwind to v4
2. ❌ Change `components/ui/` to `components/UI/`
3. ❌ Modify Node version from 20
4. ❌ Remove or change `wrangler.toml`
5. ❌ "Refactor" working components without user request
6. ❌ Change the glassmorphism CSS (it's beautiful as-is)
7. ❌ Modify `next.config.mjs` without good reason
8. ❌ Change API URLs in environment variables
9. ❌ "Optimize" the build process (it works)
10. ❌ Add new dependencies without explicit request

### DO:
1. ✅ Ask user before making structural changes
2. ✅ Read this file before touching critical files
3. ✅ Test changes locally before committing
4. ✅ Preserve existing functionality
5. ✅ Follow the established code style
6. ✅ Document significant changes

---

## 🎨 CODE STYLE GUIDE

### TypeScript:
- Use interfaces, not types (existing pattern)
- Explicit typing for function parameters
- Avoid `any` - use proper types from `lib/types.ts`

### React Components:
- Functional components with TypeScript
- Use `useState` and `useEffect` hooks
- Props interfaces defined at component level
- Export default for main components

### Styling:
- Tailwind utility classes (primary method)
- CSS modules for complex animations
- Global styles in `app/globals.css`
- Preserve glassmorphism design patterns

### API Calls:
- Use `lib/api.ts` for new API calls
- Handle loading/error states
- Show user-friendly error messages
- Implement optimistic UI updates

---

## 🔗 IMPORTANT LINKS

- **GitHub Repo**: https://github.com/absulysuly/DigitalDemocracy-Iraq-Clean
- **Backend API**: https://digitaldemocracy-iraq-production.up.railway.app
- **Cloudflare Dashboard**: https://dash.cloudflare.com/
- **Deployment Docs**: See `CLOUDFLARE_DEPLOYMENT.md`

---

## 📚 DEPLOYMENT FILES

| File | Purpose |
|------|---------|
| `DEPLOYMENT_READY.md` | Overall deployment status |
| `CLOUDFLARE_DEPLOYMENT.md` | Comprehensive Cloudflare guide |
| `WINDOWS_DEPLOYMENT_STEPS.md` | Windows-specific steps |
| `WINDOWS_COPY_PASTE.md` | Quick commands for deployment |

---

## 🤝 WORKING WITH OTHER AI AGENTS

### If User Says:
- **"Claude/Cursor/Codex messed it up"** → Check git history, restore working version
- **"Deploy to Cloudflare"** → Follow `CLOUDFLARE_DEPLOYMENT.md`
- **"Connect to backend"** → Check `lib/api.ts` and ensure `NEXT_PUBLIC_API_BASE_URL` is set
- **"Fix build error"** → Check Cloudflare/Vercel build logs, likely path issue
- **"Add feature X"** → Implement in new file, don't refactor existing working code

---

## 🧪 TESTING BEFORE DEPLOYMENT

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Test build locally
npm run build

# Check for TypeScript errors
npm run lint
```

---

## 📊 PROJECT METRICS

- **Total Candidates**: 7,769+ in backend database
- **Languages Supported**: 3 (Arabic, English, Kurdish)
- **Pages**: 10+ main pages
- **Components**: 50+ reusable components
- **API Endpoints**: 6+ backend endpoints
- **Build Time**: ~2-3 minutes
- **Lighthouse Score**: 90+ (estimated)

---

## 🎯 CURRENT DEPLOYMENT STATUS

- ✅ **GitHub**: All changes pushed to `main`
- ✅ **Backend**: Running on Railway, fully operational
- ✅ **Frontend**: Ready for Cloudflare Pages deployment
- ⏳ **Waiting**: User to trigger Cloudflare deployment

---

## 🎉 SUCCESS DEFINITION

This project is successful when:
1. ✅ Deploys to Cloudflare Pages without errors
2. ✅ Home page loads with glassmorphism UI
3. ✅ Candidates page displays real backend data
4. ✅ Language switching works (AR/EN/KU)
5. ✅ Mobile responsive design functions
6. ✅ Backend API calls succeed
7. ✅ No console errors in browser

---

## 💡 PHILOSOPHY

> "If it works, don't fix it."  
> "The user's beautiful design is sacred."  
> "Backend connection is more important than 'clean code'."  
> "Deployment success > Perfect architecture."

---

## 🆘 EMERGENCY CONTACTS

If you break something:
1. Check git history: `git log --oneline`
2. Restore last working version: `git reset --hard <commit>`
3. Read deployment docs before trying fixes
4. Ask user before making major changes
5. Don't assume "improvements" are needed

---

## 📝 CHANGE LOG

- **Nov 6, 2025**: Configured Cloudflare Pages, fixed case sensitivity
- **Nov 6, 2025**: Connected to Railway backend (7,769 candidates)
- **Nov 6, 2025**: Merged beautiful design with robust backend
- **Nov 6, 2025**: Created comprehensive deployment documentation

---

## ✅ FINAL CHECKLIST FOR AI AGENTS

Before making ANY changes, verify:
- [ ] Did user explicitly request this change?
- [ ] Have I read this README?
- [ ] Will this change break existing functionality?
- [ ] Is this change necessary for deployment?
- [ ] Have I tested locally?
- [ ] Am I about to "refactor" working code?

**If in doubt, ask the user first.** 🙏

---

*This document is the source of truth for AI agents working on this project.*  
*Last Updated: November 6, 2025*

