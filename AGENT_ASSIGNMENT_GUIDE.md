# 🤖 Backend Analysis Agent Assignment Guide

**Purpose:** Assign individual backend repositories to AI agents for comprehensive technical analysis.

---

## 📋 BACKEND REPOSITORIES TO ANALYZE

### Backend 1: Hamlet Complete MVP Backend
- **Repository:** https://github.com/absulysuly/hamlet-complete-mvp/tree/main/backend
- **Live API:** https://hamlet-unified-complete-2027-production.up.railway.app
- **Agent Assignment:** [AGENT_1]
- **Status:** [Pending/In Progress/Complete]
- **Report File:** `BACKEND_1_HAMLET_ANALYSIS.md`

### Backend 2: Digital Democracy Iraq Backend
- **Repository:** [To be determined from GitHub]
- **Live API:** https://digitaldemocracyiraq-production.up.railway.app
- **Agent Assignment:** [AGENT_2]
- **Status:** [Pending/In Progress/Complete]
- **Report File:** `BACKEND_2_DIGITAL_DEMOCRACY_ANALYSIS.md`

### Backend 3: Deadlinesco Election Iraq Backend
- **Repository:** [To be determined from GitHub]
- **Live API:** https://deadlinesco-img-election-iraq-production.up.railway.app
- **Agent Assignment:** [AGENT_3]
- **Status:** [Pending/In Progress/Complete]
- **Report File:** `BACKEND_3_DEADLINESCO_ANALYSIS.md`

---

## 🎯 ASSIGNMENT INSTRUCTIONS FOR EACH AGENT

### Step 1: Copy the Template

Each agent should use the `BACKEND_ANALYSIS_TEMPLATE.md` as their starting point.

### Step 2: Replace Placeholders

Replace the following placeholders in the template:

- `[INSERT_BACKEND_URL_HERE]` → Actual backend repository URL
- `[INSERT_DATE]` → Current date
- `[AGENT_NAME/ID]` → Agent identifier
- All other `[PLACEHOLDER]` fields with actual findings

### Step 3: Conduct Analysis

Follow this analysis workflow:

1. **Repository Access**
   - Clone or access the repository
   - Check branch structure
   - Review commit history
   - Identify active contributors

2. **Code Inspection**
   - Read `package.json` for dependencies
   - Review file structure
   - Analyze key files (routes, controllers, models)
   - Check configuration files

3. **API Testing**
   - Test live API endpoints
   - Verify response formats
   - Check error handling
   - Test authentication flows

4. **Database Analysis**
   - Review schema files (Prisma/Mongoose/etc.)
   - Check migration files
   - Analyze data models
   - Review seed data

5. **Deployment Check**
   - Verify deployment configuration
   - Check environment variables
   - Review Docker/containerization
   - Test health endpoints

6. **Documentation Review**
   - Read README files
   - Check API documentation
   - Review inline code comments
   - Look for setup guides

### Step 4: Fill Out Template Sections

Complete each section of the template with:
- ✅ Specific findings (not generic statements)
- ✅ Code examples where relevant
- ✅ File paths for issues found
- ✅ Concrete recommendations
- ✅ Scoring with justification

### Step 5: Generate Report

Save the completed analysis as:
- `BACKEND_[NUMBER]_[NAME]_ANALYSIS.md`

---

## 📝 PROMPT FOR INDIVIDUAL AGENTS

Copy this prompt and customize for each backend:

```
**INDIVIDUAL BACKEND TECHNICAL AUDIT**

You are assigned to conduct a deep technical audit of one specific backend project. 
Provide exhaustive analysis following the structured template.

**PROJECT ASSIGNMENT:**
Repository: [INSERT_REPO_URL]
Live API: [INSERT_API_URL]

**AUDIT REQUIREMENTS:**

1. Use BACKEND_ANALYSIS_TEMPLATE.md as your guide
2. Replace all placeholders with actual findings
3. Test live API endpoints and document results
4. Analyze code quality, architecture, and production readiness
5. Identify critical issues and blockers
6. Provide specific recommendations with code examples
7. Score each category (1-10) with justification
8. Complete all 18 sections of the template

**DELIVERABLE:**
Comprehensive markdown report saved as: BACKEND_[N]_[NAME]_ANALYSIS.md

**DEADLINE:** Complete analysis within 24 hours.
```

---

## 🔄 WORKFLOW FOR MULTIPLE AGENTS

### Parallel Analysis Approach

```
┌─────────────────────────────────────────┐
│  Coordinator Agent                      │
│  - Assigns backends to agents           │
│  - Provides template                    │
│  - Collects reports                     │
└─────────────────────────────────────────┘
           │
           ├───→ Agent 1 → Backend 1
           ├───→ Agent 2 → Backend 2
           └───→ Agent 3 → Backend 3
                    │
                    └───→ Individual Reports
                    │
                    └───→ Consolidated Comparison
```

### Step-by-Step Process

1. **Assignment Phase**
   - Assign each backend to a different agent
   - Provide template and instructions
   - Set deadline (24 hours)

2. **Analysis Phase** (Parallel)
   - Each agent works independently
   - Follows template structure
   - Tests APIs and analyzes code
   - Generates individual report

3. **Collection Phase**
   - Collect all individual reports
   - Verify completeness
   - Check for missing sections

4. **Consolidation Phase**
   - Create comparison matrix
   - Identify best backend
   - Generate final recommendation

---

## 📊 COMPARISON MATRIX TEMPLATE

After all individual analyses are complete, use this matrix:

```markdown
# Backend Comparison Matrix

| Backend | Stability | Features | Code Quality | Production Ready | Integration | Total |
|---------|-----------|----------|--------------|-----------------|-------------|-------|
| Backend 1 | [X]/10 | [X]/10 | [X]/10 | [X]/10 | [X]/10 | [X]/50 |
| Backend 2 | [X]/10 | [X]/10 | [X]/10 | [X]/10 | [X]/10 | [X]/50 |
| Backend 3 | [X]/10 | [X]/10 | [X]/10 | [X]/10 | [X]/10 | [X]/50 |

**Winner:** [Backend Name]
**Reason:** [Justification]
```

---

## ✅ QUALITY CHECKLIST FOR AGENTS

Before submitting analysis, verify:

- [ ] All template sections completed
- [ ] No placeholder text remaining
- [ ] Code examples included
- [ ] API endpoints tested
- [ ] Scores justified with notes
- [ ] Critical issues identified
- [ ] Recommendations provided
- [ ] File paths specified for issues
- [ ] Comparison metrics filled
- [ ] Final assessment written

---

## 🚀 QUICK START FOR AGENTS

1. **Read:** `BACKEND_ANALYSIS_TEMPLATE.md`
2. **Clone:** Your assigned backend repository
3. **Test:** Live API endpoints
4. **Analyze:** Code structure and quality
5. **Fill:** Template with findings
6. **Save:** Report as `BACKEND_[N]_[NAME]_ANALYSIS.md`
7. **Submit:** Report for consolidation

---

## 📞 COORDINATION NOTES

**For Coordinator:**
- Monitor progress of all agents
- Answer questions about template
- Resolve conflicts or overlaps
- Consolidate reports when complete

**For Individual Agents:**
- Focus only on your assigned backend
- Don't compare with other backends (that's coordinator's job)
- Be thorough and specific
- Ask questions if template is unclear

---

**Last Updated:** [DATE]  
**Template Version:** 1.0  
**Next Review:** After first round of analyses
