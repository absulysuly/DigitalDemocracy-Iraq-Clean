# Hamlet MVP - Phase 0 Status Report
**Date**: 2025-11-16
**Project**: Digital Diwan → Hamlet MVP Transformation

---

## 🎯 EXECUTIVE SUMMARY

This is **NOT** a greenfield project. We're working with the existing `DigitalDemocracy-Iraq-Clean` codebase - a functioning Next.js 14 election platform that needs to be transformed into the Hamlet MVP (social + local directory platform).

**Current State**: ✅ Clean Next.js 14 App, ⚠️ Dependencies not installed, ⚠️ Election-focused (needs pivot)

---

## 📁 WHAT EXISTS NOW

### Project Structure
```
/home/user/DigitalDemocracy-Iraq-Clean/
├── app/                          ✅ Next.js 14 App Router
│   ├── [lang]/                   ✅ Internationalized routing (ar/ku/en)
│   │   ├── page.tsx              ✅ Home page (currently HomeView)
│   │   ├── layout.tsx            ✅ Root layout with TopNav + MobileNav
│   │   ├── candidates/           ⚠️  Election content (HIDE FOR MVP)
│   │   ├── stats/                ⚠️  Election stats (HIDE FOR MVP)
│   │   ├── governorates/         ✅ Governorate filtering (REUSE)
│   │   ├── discover/             ✅ Discovery page (ADAPT)
│   │   ├── teahouse/             ✅ Tea House (social discussion)
│   │   ├── profile/              ✅ User profile
│   │   └── about/                ✅ About page
│   └── globals.css               ✅ Tailwind setup
├── components/                   ⚠️  Many empty files (0 bytes)
│   ├── layout/
│   │   ├── TopNavBar.tsx         ✅ Desktop navigation
│   │   ├── MobileNav.tsx         ✅ Bottom navigation (5 tabs)
│   │   ├── ThemeToggle.tsx       ✅ Dark/Light mode
│   │   └── LanguageSwitcher.tsx  ✅ AR/KU/EN switcher
│   ├── candidates/               ⚠️  Election-specific (HIDE)
│   ├── social/                   ⚠️  Partially implemented
│   ├── home/                     ✅ Home components exist
│   └── views/                    ✅ View components
├── dictionaries/                 ✅ AR/KU/EN translations
│   ├── ar.json                   ✅ Arabic dictionary
│   ├── ku.json                   ✅ Kurdish dictionary
│   └── en.json                   ✅ English dictionary
├── lib/
│   ├── types.ts                  ✅ TypeScript interfaces (User, Post, Candidate, etc.)
│   ├── api.ts                    ✅ API client with retry/fallback
│   ├── dictionaries.ts           ✅ i18n utilities
│   └── i18n-config.ts            ✅ i18n configuration
├── public/                       ✅ Static assets
├── package.json                  ✅ Next.js 14, Tailwind, lucide-react, etc.
├── tailwind.config.ts            ✅ Tailwind configured
└── next.config.mjs               ✅ Next.js config
```

### ✅ What Works (Confirmed Good)

1. **Next.js 14 Setup**: Properly configured with App Router
2. **i18n Foundation**:
   - Multi-language routing via `[lang]` param
   - Dictionaries for AR/KU/EN
   - RTL support in layout (`dir={isRTL ? 'rtl' : 'ltr'}`)
   - Arabic fonts (Noto Sans Arabic)
3. **Navigation Structure**:
   - Desktop TopNavBar (sticky header)
   - Mobile bottom navigation (5 tabs)
   - Language switcher component exists
   - Theme toggle (light/dark/ramadan themes!)
4. **Styling**:
   - Tailwind CSS configured
   - Dark mode support via next-themes
   - RTL-aware spacing (space-x-reverse)
5. **Key Libraries**:
   - `lucide-react` for icons ✅
   - `react-hot-toast` for notifications ✅
   - `framer-motion` for animations ✅
   - `i18next` for translations ✅
   - `next-themes` for theme switching ✅
6. **Type System**: Well-defined TypeScript interfaces for User, Post, Candidate, Poll, etc.

### ⚠️ What's Broken/Missing

1. **No node_modules**: Dependencies not installed yet
2. **Many Empty Components**: Files exist but are 0 bytes (PostCard.tsx, ComposeModal.tsx, etc.)
3. **Election Focus**: Current content is election-centric (candidates, voting, parties)
4. **No Database**: No Prisma schema, no local DB setup
5. **No Compass/Directory**: No places, events, or local discovery features
6. **Backend Dependency**: Expects external API at `NEXT_PUBLIC_API_BASE_URL` (Railway backend)
7. **No Auth**: No authentication system implemented

### 🔴 What Needs to Be Hidden for MVP

**Election-Related Content** (Keep code, hide from UI):
- `/candidates` route and page
- `/stats` route and page
- Candidate cards and filters
- Party filters
- Voting features
- Election countdown/hero sections

**Strategy**: Add `ENABLE_ELECTION_MODE=false` feature flag and conditionally hide these routes/components.

---

## 🎯 MVP SCOPE vs CURRENT STATE

### Tab 1: Home (Social Feed) 🏠
**Status**: ⚠️ Partially exists, needs completion

**What Exists**:
- Home page route: `app/[lang]/page.tsx` ✅
- HomeView component reference ✅
- Post type defined in `lib/types.ts` ✅
- PostCard.tsx placeholder (0 bytes) ⚠️
- ComposeModal.tsx placeholder (0 bytes) ⚠️

**What's Missing**:
- Actual social feed implementation ❌
- Post creation functionality ❌
- Like/comment system ❌
- Governorate filtering on posts ❌
- Image upload for posts ❌

**Effort**: Medium (2-3 days) - Need to build social components from scratch

---

### Tab 2: Compass (Local Directory) 🧭
**Status**: ❌ Doesn't exist

**What Exists**:
- Nothing specific to Compass/directory features

**What's Missing**:
- Category grid (Dining, Entertainment, Shopping, etc.) ❌
- Place model and database schema ❌
- Event model and database schema ❌
- Place/Event card components ❌
- Place/Event detail pages ❌
- Category filtering ❌
- API endpoints for places/events ❌

**Effort**: High (3-4 days) - Complete greenfield implementation

---

### Navigation & Layout ✅
**Status**: ✅ Mostly complete, needs minor adjustments

**What Exists**:
- TopNavBar with 5 links ✅
- MobileNav with 5 tabs ✅
- Language switcher ✅
- Theme toggle ✅

**What Needs Adjustment**:
- Replace "Candidates" tab with "Compass" 🔄
- Keep Home, Discover, TeaHouse, Profile ✅
- Hide election-specific navigation ⚠️

**Effort**: Low (1 hour)

---

### i18n & RTL 🌍
**Status**: ✅ Excellent foundation

**What Exists**:
- Full i18n routing (`/ar`, `/ku`, `/en`) ✅
- Dictionary files with translations ✅
- RTL detection and `dir` attribute ✅
- Arabic font loading ✅

**What Needs Expansion**:
- Add translations for Compass categories ➕
- Add translations for places/events UI ➕
- Add governorate names in all 3 languages ➕

**Effort**: Low (2 hours)

---

### Database & Backend 🗄️
**Status**: ❌ Needs complete setup

**Current Backend**:
- Expects external API at Railway (`NEXT_PUBLIC_API_BASE_URL`)
- API client with retry/fallback logic exists
- Fetches candidates, stats, polls from external backend

**MVP Approach**:
- **Option A** (Recommended): Use Next.js API Routes + Vercel Postgres
  - Faster to deploy (single app)
  - No CORS issues
  - Free tier on Vercel
  - Can migrate later if needed
- **Option B**: Keep Railway backend, extend it
  - Requires backend changes
  - Two deployments to manage
  - Already has candidate data

**Decision Needed**: Recommend Option A for MVP speed

**Effort**: Medium-High (3-4 days for schema + API routes)

---

## 🚀 NEXT STEPS (Phase 1-6)

### Phase 1: Get Clean Next.js 14 Running ⏳
**Tasks**:
1. Install dependencies: `npm install`
2. Test dev server: `npm run dev`
3. Fix any startup errors
4. Verify app loads at `localhost:3000`

**Expected Duration**: 1 hour
**Blockers**: None identified

---

### Phase 2: Core UI Structure 📱
**Tasks**:
1. Update MobileNav to replace "Candidates" with "Compass"
2. Update TopNavBar accordingly
3. Create `/compass` route and basic page
4. Add Compass icon to navigation
5. Test language switching works
6. Test theme switching works

**Expected Duration**: 2-3 hours
**Blockers**: None

---

### Phase 3: Social Feed 🏠
**Tasks**:
1. Set up Prisma with User, Post, Like, Comment models
2. Create mock seed data (10-20 posts across governorates)
3. Build PostCard component (show author, content, image, likes, comments)
4. Build ComposeModal component (text + image upload)
5. Build social feed page with governorate filter
6. Create API routes: GET /api/posts, POST /api/posts, POST /api/posts/[id]/like
7. Test entire flow

**Expected Duration**: 1-2 days
**Blockers**: Database setup decision (Vercel Postgres vs Railway)

---

### Phase 4: Iraq Compass 🧭
**Tasks**:
1. Define 9 categories in `lib/categories.ts`
2. Add Place and Event models to Prisma schema
3. Create seed data for 20-30 places and 5-10 events
4. Build CategoryGrid component
5. Build PlaceCard and EventCard components
6. Build place/event list pages
7. Build place/event detail pages
8. Create API routes: GET /api/places, GET /api/events
9. Test entire flow

**Expected Duration**: 2-3 days
**Blockers**: Design mockups for category grid (can use Eventra as reference)

---

### Phase 5: RTL Polish 🎨
**Tasks**:
1. Test all pages in Arabic (`/ar`)
2. Test all pages in Kurdish (`/ku`)
3. Fix any RTL layout issues
4. Ensure all strings are translated
5. Test navigation flows in RTL

**Expected Duration**: 4-6 hours
**Blockers**: None

---

### Phase 6: Deployment 🚀
**Tasks**:
1. Set up Vercel Postgres database
2. Run migrations on production DB
3. Deploy to Vercel
4. Configure environment variables
5. Test production deployment
6. Optional: Set up custom domain

**Expected Duration**: 3-4 hours
**Blockers**: Vercel account access

---

## 🎨 DESIGN NOTES

### Existing Color Scheme
From `globals.css` and Tailwind config:
- **iraq-red**: Election theme color (will keep as accent)
- Dark mode by default ✅
- Glassmorphism effects (`backdrop-blur-md`) ✅
- Clean, modern UI

### Recommended Palette for MVP
Follow directive's color scheme:
- **Midnight Blue**: `#1E293B` (backgrounds)
- **Teal**: `#14B8A6` (primary actions)
- **Purple**: `#8B5CF6` (secondary actions)
- **Orange**: `#F97316` (accents)

**Action**: Update Tailwind config with these colors

---

## 📊 RISK ASSESSMENT

### Low Risk ✅
- Next.js 14 foundation is solid
- i18n and RTL work well
- Component architecture is clean
- Deployment path is clear

### Medium Risk ⚠️
- Many placeholder components need implementation
- Database strategy needs decision
- Auth can be punted to v1.1 if needed

### High Risk 🔴
- No Compass/directory features exist (greenfield)
- Timeline depends on solo founder availability
- Testing with real Iraqi users needed before launch

---

## 🎯 RECOMMENDATION

**Path Forward**: Start Phase 1 immediately.

This codebase is a **strong foundation** for the Hamlet MVP. The i18n, routing, and navigation work is done. The challenge is:
1. Implementing the social feed components (medium effort)
2. Building Iraq Compass from scratch (high effort)
3. Hiding election content (low effort)

**Estimated Timeline to MVP**:
- **Optimistic**: 10-12 days of focused work
- **Realistic**: 14-18 days with testing
- **Conservative**: 3-4 weeks with polish and deployment

**Biggest Decision Needed**: Database strategy (recommend Vercel Postgres for MVP)

---

## ✅ PHASE 0 COMPLETE

Status document created: `/docs/MVP_STATUS.md`

**Ready to proceed to Phase 1**: Install dependencies and get the app running.

---

*Generated by Claude Code following Hamlet MVP Master Directive*
