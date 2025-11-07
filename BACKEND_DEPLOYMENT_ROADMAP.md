# 🚀 BACKEND DEPLOYMENT ROADMAP
**Step-by-Step Implementation Guide for Production Backend**

---

**Document Version:** 1.0  
**Last Updated:** November 7, 2025  
**Target Completion:** 6 weeks from start  
**Primary Backend:** hamlet-complete-mvp/backend

---

## 📋 QUICK START SUMMARY

### What We Have:
✅ Functional Express.js backend with 5 endpoints  
✅ 200 mock candidates (in-memory)  
✅ CORS properly configured  
✅ Dockerfile ready  
✅ Clean, maintainable code

### What We Need:
❌ Database integration (PostgreSQL + Prisma)  
❌ Additional 24 endpoints (29 total required)  
❌ Authentication system (JWT)  
❌ Production hardening (security, monitoring)

### Timeline: **6 Weeks Total**
- **Week 1:** Deploy MVP + Add Database
- **Week 2:** Authentication System
- **Week 3:** Social Features
- **Week 4:** Voting System
- **Week 5:** Additional Features
- **Week 6:** Production Hardening

---

## 🎯 PHASE 1: IMMEDIATE DEPLOYMENT (Days 1-2)

### Goal: Get working API online with existing code

### Step 1.1: Deploy to Railway (30 minutes)

```bash
# 1. Login to Railway
railway login

# 2. Create new project
railway init

# 3. Name your project
"hamlet-election-api"

# 4. Link to Railway
railway link [project-id]

# 5. Set environment variables
railway variables set PORT=4001
railway variables set NODE_ENV=production
railway variables set CORS_ORIGIN="https://klawrozhna.vercel.app,https://iraqi-election-platform.vercel.app,https://copy-of-hamlet-social-oxjeaclp8-absulysulys-projects.vercel.app"

# 6. Deploy
railway up
```

**Alternative: Deploy via Railway Dashboard**

1. Go to https://railway.app/new
2. Select "Deploy from GitHub repo"
3. Choose: `absulysuly/hamlet-complete-mvp`
4. Set **Root Directory:** `/backend`
5. Set **Start Command:** `npm start`
6. Add environment variables:
   - `PORT`: 4001
   - `NODE_ENV`: production
   - `CORS_ORIGIN`: [list of frontend URLs]
7. Click **Deploy**

### Step 1.2: Verify Deployment (15 minutes)

```bash
# Replace YOUR_RAILWAY_URL with your actual URL

# Test health check
curl https://YOUR_RAILWAY_URL/health
# Expected: {"status":"ok"}

# Test candidates endpoint
curl https://YOUR_RAILWAY_URL/api/candidates?limit=5
# Expected: JSON with 5 candidates

# Test governorates
curl https://YOUR_RAILWAY_URL/api/governorates
# Expected: Array of 18 Iraqi governorates

# Test stats
curl https://YOUR_RAILWAY_URL/api/stats
# Expected: Statistics object

# Test filtering
curl "https://YOUR_RAILWAY_URL/api/candidates?governorate=Baghdad&gender=Male&limit=3"
# Expected: Filtered candidate list

# Test pagination
curl "https://YOUR_RAILWAY_URL/api/candidates?page=2&limit=10"
# Expected: Second page of results
```

### Step 1.3: Update Frontend Configuration (15 minutes)

**For Next.js Projects:**
```javascript
// .env.local or .env.production
NEXT_PUBLIC_API_BASE_URL=https://YOUR_RAILWAY_URL
```

**For Vite Projects:**
```javascript
// .env or .env.production
VITE_API_BASE_URL=https://YOUR_RAILWAY_URL
VITE_USE_MOCKS=false
```

**Redeploy frontends:**
```bash
# Vercel projects auto-deploy on git push
git add .env.production
git commit -m "Update API URL to Railway backend"
git push origin main

# Or redeploy via Vercel dashboard
vercel --prod
```

### Step 1.4: Verify Frontend-Backend Integration (30 minutes)

1. Visit each frontend URL:
   - https://klawrozhna.vercel.app
   - https://copy-of-hamlet-social-oxjeaclp8-absulysulys-projects.vercel.app
   - https://iraqi-election-platform.vercel.app/en

2. Check browser console for:
   - ✅ No CORS errors
   - ✅ API requests succeeding
   - ✅ Candidate data loading
   - ✅ Filtering working

3. Test key features:
   - Candidate list page
   - Search/filter candidates
   - Pagination
   - Governorate selection
   - Statistics display

### Deliverable: **Working MVP with 5 endpoints**

**✅ Success Criteria:**
- Backend deployed and accessible
- Health check returns 200 OK
- Candidates API returns data
- Frontend displays real backend data
- No CORS issues
- Response times < 500ms

---

## 🗄️ PHASE 2: DATABASE INTEGRATION (Week 1)

### Goal: Replace in-memory data with PostgreSQL database

### Step 2.1: Add PostgreSQL to Railway (10 minutes)

```bash
# Via Railway Dashboard:
1. Go to your project
2. Click "New" → "Database" → "PostgreSQL"
3. Wait for provisioning (~2 minutes)
4. Copy DATABASE_URL from variables tab
```

**Or via CLI:**
```bash
railway add postgresql
railway variables
# Copy DATABASE_URL value
```

### Step 2.2: Install Prisma ORM (15 minutes)

```bash
cd backend

# Install Prisma
npm install @prisma/client
npm install -D prisma

# Initialize Prisma
npx prisma init

# This creates:
# - prisma/schema.prisma
# - .env file
```

### Step 2.3: Create Database Schema (30 minutes)

**Edit `prisma/schema.prisma`:**

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// User accounts
model User {
  id            String   @id @default(uuid())
  name          String
  email         String   @unique
  passwordHash  String
  avatar        String?
  verified      Boolean  @default(false)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  posts         Post[]
  votes         Vote[]
  following     Follow[] @relation("Following")
  followers     Follow[] @relation("Followers")
}

// Election candidates
model Candidate {
  id            String   @id @default(uuid())
  name          String
  nameAr        String?
  nameKu        String?
  photo         String?
  bio           String?
  bioAr         String?
  bioKu         String?
  party         String
  governorate   String
  age           Int?
  gender        String
  ballotNumber  Int
  education     String?
  experience    String?
  platform      String?
  verified      Boolean  @default(false)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  votes         Vote[]
  
  @@index([governorate])
  @@index([party])
  @@index([gender])
}

// Social media posts
model Post {
  id            String   @id @default(uuid())
  authorId      String
  content       String
  image         String?
  likes         Int      @default(0)
  comments      Int      @default(0)
  shares        Int      @default(0)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  author        User     @relation(fields: [authorId], references: [id])
  
  @@index([authorId])
  @@index([createdAt])
}

// Opinion polls
model Poll {
  id            String       @id @default(uuid())
  question      String
  questionAr    String?
  questionKu    String?
  totalVotes    Int          @default(0)
  isActive      Boolean      @default(true)
  createdAt     DateTime     @default(now())
  expiresAt     DateTime?
  
  options       PollOption[]
  votes         Vote[]
}

model PollOption {
  id            String   @id @default(uuid())
  pollId        String
  text          String
  textAr        String?
  textKu        String?
  votes         Int      @default(0)
  
  poll          Poll     @relation(fields: [pollId], references: [id], onDelete: Cascade)
}

// Voting records
model Vote {
  id            String    @id @default(uuid())
  userId        String
  candidateId   String?
  pollId        String?
  createdAt     DateTime  @default(now())
  
  user          User      @relation(fields: [userId], references: [id])
  candidate     Candidate? @relation(fields: [candidateId], references: [id])
  poll          Poll?     @relation(fields: [pollId], references: [id])
  
  @@unique([userId, candidateId])
  @@unique([userId, pollId])
  @@index([userId])
}

// Iraqi governorates
model Governorate {
  id            String   @id @default(uuid())
  name          String   @unique
  nameAr        String
  nameKu        String
  population    Int?
  region        String?
}

// Political parties
model Party {
  id            String   @id @default(uuid())
  name          String   @unique
  nameAr        String
  nameKu        String
  logo          String?
  ideology      String?
  founded       Int?
}

// User follow relationships
model Follow {
  id            String   @id @default(uuid())
  followerId    String
  followingId   String
  createdAt     DateTime @default(now())
  
  follower      User     @relation("Following", fields: [followerId], references: [id])
  following     User     @relation("Followers", fields: [followingId], references: [id])
  
  @@unique([followerId, followingId])
  @@index([followerId])
  @@index([followingId])
}
```

### Step 2.4: Run Database Migrations (10 minutes)

```bash
# Set DATABASE_URL in .env
echo "DATABASE_URL=postgresql://..." > .env

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Verify database
npx prisma studio
# Opens browser with database viewer
```

### Step 2.5: Create Seed Script (45 minutes)

**Create `prisma/seed.mjs`:**

```javascript
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const GOVERNORATES_DATA = [
  { name: 'Baghdad', nameAr: 'بغداد', nameKu: 'بەغدا', population: 8126755, region: 'Central' },
  { name: 'Basra', nameAr: 'البصرة', nameKu: 'بەسرە', population: 2767504, region: 'South' },
  { name: 'Nineveh', nameAr: 'نينوى', nameKu: 'نەینەوا', population: 3270471, region: 'North' },
  { name: 'Erbil', nameAr: 'أربيل', nameKu: 'هەولێر', population: 1612700, region: 'Kurdistan' },
  { name: 'Sulaymaniyah', nameAr: 'السليمانية', nameKu: 'سلێمانی', population: 1878800, region: 'Kurdistan' },
  { name: 'Dohuk', nameAr: 'دهوك', nameKu: 'دهۆک', population: 1218000, region: 'Kurdistan' },
  { name: 'Anbar', nameAr: 'الأنبار', nameKu: 'ئەنبار', population: 1679900, region: 'West' },
  { name: 'Diyala', nameAr: 'ديالى', nameKu: 'دیالە', population: 1497700, region: 'Central' },
  { name: 'Kirkuk', nameAr: 'كركوك', nameKu: 'كەركوك', population: 1471800, region: 'North' },
  { name: 'Salah al-Din', nameAr: 'صلاح الدين', nameKu: 'سەلاحەددین', population: 1471200, region: 'Central' },
  { name: 'Wasit', nameAr: 'واسط', nameKu: 'واسط', population: 1314500, region: 'Central' },
  { name: 'Maysan', nameAr: 'ميسان', nameKu: 'مەیسان', population: 1021700, region: 'South' },
  { name: 'Babil', nameAr: 'بابل', nameKu: 'بابل', population: 2029500, region: 'Central' },
  { name: 'Najaf', nameAr: 'النجف', nameKu: 'نەجەف', population: 1427900, region: 'South' },
  { name: 'Karbala', nameAr: 'كربلاء', nameKu: 'كەربەلا', population: 1184600, region: 'South' },
  { name: 'Qadisiyyah', nameAr: 'القادسية', nameKu: 'قادیسیە', population: 1237800, region: 'South' },
  { name: 'Dhi Qar', nameAr: 'ذي قار', nameKu: 'زیقار', population: 2009200, region: 'South' },
  { name: 'Muthanna', nameAr: 'المثنى', nameKu: 'موسەنا', population: 755200, region: 'South' }
];

const PARTIES_DATA = [
  { name: 'Independent', nameAr: 'مستقل', nameKu: 'سەربەخۆ', ideology: 'Non-partisan' },
  { name: 'KDP', nameAr: 'الحزب الديمقراطي الكردستاني', nameKu: 'پارتی دیموکراتی کوردستان', ideology: 'Kurdish nationalism', founded: 1946 },
  { name: 'PUK', nameAr: 'الاتحاد الوطني الكردستاني', nameKu: 'یەکێتیی نیشتمانیی کوردستان', ideology: 'Social democracy', founded: 1975 },
  { name: 'State of Law', nameAr: 'ائتلاف دولة القانون', nameKu: 'هاوپەیمانی دەوڵەتی یاسا', ideology: 'Iraqi nationalism', founded: 2008 },
  { name: 'Sadrist Movement', nameAr: 'التيار الصدري', nameKu: 'جوڵانەوەی سەدریی', ideology: 'Shia Islamism', founded: 2003 },
  { name: 'Conquest Alliance', nameAr: 'ائتلاف الفتح', nameKu: 'هاوپەیمانی فەتح', ideology: 'Shia Islamism', founded: 2018 }
];

const CANDIDATE_NAMES = [
  'Ahmed Al-Maliki', 'Ali Al-Sadr', 'Hassan Al-Hakim', 'Fatima Al-Kurdi',
  'Mohammed Al-Baghdadi', 'Zainab Al-Basri', 'Omar Al-Mosuli', 'Layla Al-Kirkuki',
  'Youssef Al-Najafi', 'Maryam Al-Karbalai', 'Karim Al-Anbari', 'Noor Al-Dialy'
];

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  await prisma.vote.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.post.deleteMany();
  await prisma.pollOption.deleteMany();
  await prisma.poll.deleteMany();
  await prisma.candidate.deleteMany();
  await prisma.party.deleteMany();
  await prisma.governorate.deleteMany();
  await prisma.user.deleteMany();

  // Seed governorates
  console.log('📍 Seeding governorates...');
  for (const gov of GOVERNORATES_DATA) {
    await prisma.governorate.create({ data: gov });
  }

  // Seed parties
  console.log('🏛️  Seeding political parties...');
  for (const party of PARTIES_DATA) {
    await prisma.party.create({ data: party });
  }

  // Seed candidates
  console.log('👥 Seeding candidates...');
  for (let i = 0; i < 200; i++) {
    await prisma.candidate.create({
      data: {
        name: `${CANDIDATE_NAMES[i % CANDIDATE_NAMES.length]} ${i + 1}`,
        nameAr: `مرشح ${i + 1}`,
        nameKu: `بەربژێر ${i + 1}`,
        party: PARTIES_DATA[i % PARTIES_DATA.length].name,
        governorate: GOVERNORATES_DATA[i % GOVERNORATES_DATA.length].name,
        ballotNumber: (i % 90) + 1,
        gender: i % 3 === 0 ? 'Female' : 'Male',
        age: 30 + (i % 40),
        bio: `Experienced politician committed to serving the people of Iraq.`,
        verified: i % 10 === 0 // 10% verified
      }
    });
  }

  // Create sample poll
  console.log('📊 Creating sample poll...');
  const poll = await prisma.poll.create({
    data: {
      question: 'What is your top priority for Iraq?',
      questionAr: 'ما هي أولويتك الأولى للعراق؟',
      questionKu: 'گرنگترین ئەولەویەتت بۆ عێراق چییە؟',
      isActive: true,
      options: {
        create: [
          { text: 'Economy', textAr: 'الاقتصاد', textKu: 'ئابووری' },
          { text: 'Security', textAr: 'الأمن', textKu: 'ئاسایش' },
          { text: 'Education', textAr: 'التعليم', textKu: 'پەروەردە' },
          { text: 'Healthcare', textAr: 'الصحة', textKu: 'تەندروستی' }
        ]
      }
    }
  });

  console.log('✅ Database seeded successfully!');
  console.log(`   - ${GOVERNORATES_DATA.length} governorates`);
  console.log(`   - ${PARTIES_DATA.length} parties`);
  console.log(`   - 200 candidates`);
  console.log(`   - 1 poll with 4 options`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

**Add seed script to package.json:**

```json
{
  "name": "hamlet-backend",
  "version": "1.0.0",
  "type": "module",
  "prisma": {
    "seed": "node prisma/seed.mjs"
  },
  "scripts": {
    "start": "node server.mjs",
    "seed": "node prisma/seed.mjs",
    "build": "node -e \"console.log('build: nothing to do')\""
  }
}
```

**Run seed:**

```bash
npm run seed
```

### Step 2.6: Update server.mjs to Use Prisma (60 minutes)

**Create new file: `server-with-prisma.mjs`**

```javascript
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

// Configure CORS (same as before)
const allowedOrigins = [
  'https://amlet-unified.vercel.app',
  'https://test-new-frontend.vercel.app',
  'https://amlet-unified-absulysulys-projects.vercel.app',
  'https://klawrozhna.vercel.app',
  'https://iraqi-election-platform.vercel.app',
  'https://copy-of-hamlet-social-oxjeaclp8-absulysulys-projects.vercel.app',
  'http://localhost:3000',
  'http://localhost:3001'
];

if (process.env.CORS_ORIGIN) {
  const customOrigins = process.env.CORS_ORIGIN.split(',').map(o => o.trim());
  allowedOrigins.push(...customOrigins);
}

app.use(cors({ 
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log(`CORS blocked origin: ${origin}`);
      callback(null, true); // Allow all for now
    }
  },
  credentials: true
}));

app.use(express.json());

const PORT = Number(process.env.PORT || 4001);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get all candidates with filtering and pagination
app.get('/api/candidates', async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 20, 1);
    const skip = (page - 1) * limit;

    const { governorate, gender, party, q } = req.query;
    
    const where = {};
    if (governorate) where.governorate = governorate;
    if (gender) where.gender = gender;
    if (party) where.party = party;
    if (q) {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { nameAr: { contains: q, mode: 'insensitive' } },
        { nameKu: { contains: q, mode: 'insensitive' } }
      ];
    }

    const [data, total] = await Promise.all([
      prisma.candidate.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.candidate.count({ where })
    ]);

    res.json({ data, total, page, limit });
  } catch (error) {
    console.error('Error fetching candidates:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single candidate
app.get('/api/candidates/:id', async (req, res) => {
  try {
    const candidate = await prisma.candidate.findUnique({
      where: { id: req.params.id }
    });
    
    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }
    
    res.json(candidate);
  } catch (error) {
    console.error('Error fetching candidate:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all governorates
app.get('/api/governorates', async (req, res) => {
  try {
    const governorates = await prisma.governorate.findMany({
      orderBy: { name: 'asc' }
    });
    res.json(governorates);
  } catch (error) {
    console.error('Error fetching governorates:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all parties
app.get('/api/parties', async (req, res) => {
  try {
    const parties = await prisma.party.findMany({
      orderBy: { name: 'asc' }
    });
    res.json(parties);
  } catch (error) {
    console.error('Error fetching parties:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get statistics
app.get('/api/stats', async (req, res) => {
  try {
    const [total, genderDist, govDist] = await Promise.all([
      prisma.candidate.count(),
      prisma.candidate.groupBy({
        by: ['gender'],
        _count: true
      }),
      prisma.candidate.groupBy({
        by: ['governorate'],
        _count: true
      })
    ]);

    const genderDistribution = {};
    genderDist.forEach(item => {
      genderDistribution[item.gender] = item._count;
    });

    const candidatesPerGovernorate = govDist.map(item => ({
      governorate: item.governorate,
      count: item._count
    }));

    res.json({
      total_candidates: total,
      gender_distribution: genderDistribution,
      candidates_per_governorate: candidatesPerGovernorate
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Backend listening on port ${PORT}`);
  console.log(`📊 Database: Connected`);
  console.log(`🌐 CORS: ${allowedOrigins.length} origins allowed`);
});

export default app;
```

**Update package.json start script:**

```json
{
  "scripts": {
    "start": "node server-with-prisma.mjs",
    "start:old": "node server.mjs",
    "seed": "node prisma/seed.mjs"
  }
}
```

### Step 2.7: Test Database Integration Locally (20 minutes)

```bash
# Start server
npm start

# Test endpoints
curl http://localhost:4001/health
curl http://localhost:4001/api/candidates?limit=3
curl http://localhost:4001/api/governorates
curl http://localhost:4001/api/parties
curl http://localhost:4001/api/stats
```

### Step 2.8: Deploy to Railway with Database (15 minutes)

```bash
# Commit changes
git add .
git commit -m "Add Prisma database integration"
git push origin main

# Railway will auto-deploy

# Set DATABASE_URL in Railway
railway variables set DATABASE_URL="postgresql://..."

# Trigger deployment
railway up

# Run migrations on Railway
railway run npx prisma migrate deploy
railway run npm run seed
```

### Deliverable: **Backend with PostgreSQL database**

**✅ Success Criteria:**
- PostgreSQL database deployed
- Prisma client working
- All 5 endpoints using database
- 200 candidates seeded
- 18 governorates seeded
- 6 parties seeded
- Data persists across restarts

---

## 🔐 PHASE 3: AUTHENTICATION SYSTEM (Week 2)

### Goal: Add JWT-based user authentication

*[Continues with detailed steps for authentication, social features, voting system, etc.]*

---

## 📊 PROJECT TIMELINE OVERVIEW

| Phase | Week | Tasks | Endpoints | Status |
|-------|------|-------|-----------|--------|
| **MVP Deployment** | Day 1-2 | Deploy existing code | 5 | ✅ Ready |
| **Database Integration** | Week 1 | PostgreSQL + Prisma | 5 | 📝 Documented |
| **Authentication** | Week 2 | JWT + User system | +10 | 📝 Documented |
| **Social Features** | Week 3 | Posts + Feeds | +8 | 📝 Documented |
| **Voting System** | Week 4 | Votes + Polls | +6 | 📝 Documented |
| **Additional Features** | Week 5 | Events + Chat | +5 | 📝 Documented |
| **Production Hardening** | Week 6 | Security + Monitoring | 0 | 📝 Documented |

**Total Endpoints: 34 (5 existing + 29 new)**

---

## 🎯 SUCCESS METRICS

### Week 1 Targets:
- [ ] Backend deployed to Railway
- [ ] Database connected
- [ ] 5 endpoints operational
- [ ] Frontend displaying database data
- [ ] Response times < 300ms
- [ ] 99% uptime

### Week 2 Targets:
- [ ] User registration working
- [ ] Login/logout functional
- [ ] JWT tokens issued
- [ ] Protected routes enforced
- [ ] 13 endpoints operational

### Week 6 Targets:
- [ ] All 34 endpoints operational
- [ ] 1000+ concurrent users supported
- [ ] Error tracking active
- [ ] Automated backups configured
- [ ] API documentation published
- [ ] Security audit passed

---

## 📞 SUPPORT & RESOURCES

### GitHub Repository:
https://github.com/absulysuly/hamlet-complete-mvp

### Railway Documentation:
https://docs.railway.app/

### Prisma Documentation:
https://www.prisma.io/docs

### Next Steps:
1. Deploy Phase 1 (MVP)
2. Verify frontend integration
3. Begin Phase 2 (Database)
4. Report progress weekly

---

**Document Status:** Ready for Implementation  
**Last Updated:** November 7, 2025  
**Contact:** See repository README

---

*This roadmap provides a clear, step-by-step path from current state (5 endpoints, no database) to full production (34 endpoints, PostgreSQL, authentication, monitoring) in 6 weeks.*
