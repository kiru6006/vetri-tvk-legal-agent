# FINAL CLAUDE / ANTIGRAVITY BUILD PROMPT
# Tamil Nadu Government Litigation Intelligence & Executive Command Platform

## 0. YOUR ROLE

Act as a Principal Product Architect, Senior Government Business Analyst, Legal-Tech Architect, Principal Full-Stack Engineer, AI Agent Architect, Data Architect, Cybersecurity Architect and Enterprise UX Architect.

You are building a production-quality AI-native web application for the authorised users of the Government of Tamil Nadu.

Working product name:

**Tamil Nadu Government Litigation Intelligence Platform**

The primary executive persona is the **Chief Minister's Office**.

The product must help the Chief Minister and authorised senior government officials understand:

> **What is happening across Tamil Nadu Government litigation, which matters are important, which departments and officials are responsible, what Government Advocates are handling, what risks are emerging, what court orders have consequences, and what action is required.**

This is NOT a generic legal case-management application.

It is an:

**AI-powered Government Litigation Intelligence and Executive Decision-Support Platform.**

---

# 1. CRITICAL SCOPE BOUNDARY

The system covers ONLY litigation and legal proceedings connected with the official functioning of the Government of Tamil Nadu.

Include matters involving:

- Tamil Nadu Government
- Tamil Nadu Government departments
- Directorates
- Boards
- Government authorities
- Government corporations where authorised
- Government schemes
- Government Orders
- Government land/property
- Government contracts/procurement
- Government policies
- Government services
- Government employee service matters where Government is an official party/respondent/authority
- Police/Home Department matters in official capacity
- District administration matters
- Other officially authorised Government litigation

EXCLUDE personal matters of:

- Chief Minister
- Ministers
- MLAs
- MPs
- elected representatives
- Government officers
- Government advocates
- other public officials

Examples of excluded matters:

- personal property disputes
- matrimonial disputes
- personal consumer disputes
- private business disputes
- personal criminal cases
- private family litigation
- political-party disputes

The exclusion must be implemented as a domain/data-governance rule, not merely as an instruction to the LLM.

---

# 2. CORE EXECUTIVE QUESTION

The entire application must answer:

> **"What requires the Government's attention now?"**

The CM dashboard should not merely show "number of cases".

It should show:

```text
CURRENT LITIGATION POSITION
        ↓
IMPORTANT CASES
        ↓
LATEST COURT DEVELOPMENTS
        ↓
DEPARTMENT RESPONSIBILITY
        ↓
GOVERNMENT ADVOCATE
        ↓
RESPONSIBLE OFFICIAL
        ↓
RISK
        ↓
FINANCIAL EXPOSURE
        ↓
POLICY IMPACT
        ↓
DEADLINE / HEARING
        ↓
REQUIRED ACTION
```

---

# 3. EXECUTIVE DASHBOARD VISION

Design the CM dashboard as a professional government command centre.

It should feel closer to:

```text
Executive Intelligence Platform
+
Legal Operations Centre
+
Government Accountability Dashboard
+
AI Decision Support
```

It must NOT look like:

- a generic admin dashboard
- a CRM
- a lawyer marketplace
- a consumer social application
- a simple CRUD application
- a chatbot with charts around it

The Chief Minister should be able to understand the statewide litigation position in less than 60 seconds.

---

# 4. PRIMARY DASHBOARD

Create a highly polished desktop-first executive dashboard.

Header:

```text
GOVERNMENT OF TAMIL NADU
LITIGATION INTELLIGENCE

Chief Minister's Office
Data freshness: [timestamp]
Source status: [Healthy / Partial / Delayed]
```

Top-level KPIs:

```text
ACTIVE GOVERNMENT CASES
CRITICAL MATTERS
HIGH PRIORITY
HEARINGS TODAY
ADVERSE / IMPORTANT ORDERS
COMPLIANCE DEADLINES
INSTRUCTIONS PENDING
FINANCIAL EXPOSURE
```

Do not use fake real-world figures.

For the demo, clearly display:

**DEMO / SYNTHETIC DATA**

unless actual authorised data is connected.

---

# 5. CM EXECUTIVE BRIEF

Place an AI-generated executive briefing prominently.

Example structure:

```text
TODAY'S EXECUTIVE BRIEF

5 matters require immediate attention.

1. Revenue
   High-value land acquisition matter
   Hearing: Today
   Action: Government instructions pending

2. Police / Home
   Adverse interim order
   Action: Legal response required

3. Education
   Similar petitions emerging across 4 districts
   Potential statewide policy issue

4. Health
   Compliance deadline approaching

5. Municipal Administration
   Cluster of cases challenging the same Government policy
```

Every statement must have evidence.

Provide:

[View Evidence]

The AI must never invent facts.

---

# 6. "WHAT CHANGED?" PANEL

The CM should immediately see what changed since the previous reporting period.

Examples:

```text
WHAT CHANGED SINCE YESTERDAY

↑ 12 new cases
↑ 3 adverse orders
↑ 7 new hearings
↑ 2 compliance deadlines
↑ 1 statewide policy cluster
↓ 4 cases disposed
```

Clicking any metric must drill down.

---

# 7. CRITICAL ATTENTION QUEUE

Create a high-value action queue:

```text
REQUIRES IMMEDIATE ATTENTION

Priority | Case | Court | Department | Advocate | Officer | Due | Action
```

Example synthetic record:

```text
CRITICAL
TN-DEMO-001
Madras High Court
Revenue
Government Pleader
District Collector
Today
Instructions pending
```

Use qualitative severity:

```text
CRITICAL
HIGH
MEDIUM
LOW
```

Do not use arbitrary star ratings.

---

# 8. COURT-WISE LITIGATION

Show statewide distribution by court level.

Support:

```text
Supreme Court of India
Madras High Court
Madurai Bench
District & Sessions Courts
Sub Courts
District Munsif Courts
City Civil Courts
Magistrate Courts
Family Courts
Commercial Courts
Special Courts
Tribunals
Commissions
Other authorised forums
```

Dashboard visual:

```text
SUPREME COURT       ███████
HIGH COURT          ███████████████
DISTRICT COURTS     █████████████████████
LOWER COURTS        █████████████████████████
TRIBUNALS           ████████
```

Clicking a court level filters the entire dashboard.

---

# 9. DEPARTMENT LITIGATION INTELLIGENCE

Create a department heatmap/table.

Columns:

```text
Department
Active Cases
Critical
High
Adverse Orders
Hearings
Pending Instructions
Financial Exposure
Policy Risk
```

Initial configurable departments may include:

- Law
- Revenue & Disaster Management
- Home / Police
- School Education
- Higher Education
- Health & Family Welfare
- Municipal Administration
- Rural Development
- Housing & Urban Development
- Agriculture
- Animal Husbandry
- Labour & Employment
- Social Welfare
- Adi Dravidar / Tribal Welfare
- Commercial Taxes / Finance
- Transport
- Highways
- Public Works
- Environment / Forest
- Industries
- MSME
- Energy
- Water Resources
- Housing
- Cooperation
- Food & Civil Supplies
- Registration
- Personnel / Administrative Reforms
- Information Technology / Digital Services
- Other configurable departments

Do not assume this list is legally exhaustive.

Make the taxonomy configurable.

---

# 10. GOVERNMENT ADVOCATE / LEGAL WING INTELLIGENCE

This is a major part of the application.

The CM must be able to understand what is happening on the Government's legal representation side.

Create:

## Government Legal Wing Overview

Show:

```text
Active Matters
Matters by Advocate
Hearings
Instructions Pending
Adverse Orders
Cases Requiring Immediate Action
Cases Without Current Assignment
Department-wise Advocate Load
Court-wise Advocate Load
```

Support configurable designations:

- Advocate General
- Additional Advocate General
- Government Pleader
- Additional Government Pleader
- Special Government Pleader
- Public Prosecutor
- Additional Public Prosecutor
- Special Public Prosecutor
- Government Advocate
- Standing Counsel
- Panel Counsel
- Special Counsel
- Other authorised counsel

Do NOT invent actual names or appointments.

Use synthetic demo identities such as:

```text
Demo Government Pleader - Chennai
Demo Special Government Counsel
```

until authorised data is connected.

Never infer appointment merely because a lawyer appears in a court record.

---

# 11. ADVOCATE WORKLOAD INTELLIGENCE

Do NOT reduce advocate performance to a simplistic "win rate".

Show operational metrics:

```text
Active Matters
Upcoming Hearings
Instructions Pending
Orders Awaited
Adverse Orders
Disposed Matters
Department Distribution
Court Distribution
Matter Categories
Critical Matters
```

Allow authorised users to drill down:

```text
Advocate
 ↓
Cases
 ↓
Department
 ↓
Court
 ↓
Latest Hearing / Order
 ↓
Action Required
```

---

# 12. RESPONSIBLE OFFICIAL INTELLIGENCE

Map cases to authorised Government responsibilities.

Support:

```text
Chief Secretary
Principal Secretary
Secretary
Commissioner
Director
District Collector
District Revenue Officer
Superintendent of Police
Commissioner of Police
Director / Joint Director
District-level officials
Other authorised officers
```

The model must preserve historical postings.

Example:

```text
Case
 ↓
Department
 ↓
Officer
 ↓
Designation
 ↓
Posting / District
 ↓
Effective Date
```

Never overwrite historical officer assignments after a transfer.

---

# 13. DISTRICT LITIGATION MAP

Create district-level intelligence.

Tamil Nadu districts must be configurable.

Show:

```text
District
Active Cases
Critical
High
Hearings
Adverse Orders
Financial Exposure
Department Exposure
```

Provide a Tamil Nadu map if technically practical.

If a map library introduces unnecessary complexity, first provide a clean district matrix/table.

Do not block the MVP because of mapping.

---

# 14. LEGAL ISSUE / POLICY CLUSTERS

One of the most important AI features.

The system should identify patterns such as:

```text
42 cases
Same Government Order
Same legal question
Same department
Multiple districts
Multiple courts
```

Then classify:

```text
LOCAL ISSUE
DISTRICT ISSUE
MULTI-DISTRICT ISSUE
STATEWIDE POLICY ISSUE
```

The AI must explain why it considers cases similar.

---

# 15. CASE DETAIL PAGE

Clicking a case must open a professional litigation intelligence page.

Structure:

```text
CASE OVERVIEW

Case ID
Court
Bench
Case Type
Category
Status
Priority
Government Involvement
Department
District

PARTIES

LEGAL ISSUE

STATUTES / LEGAL BASIS

GOVERNMENT ADVOCATE

RESPONSIBLE OFFICIAL

HEARING TIMELINE

ORDERS / JUDGMENTS

DOCUMENTS

RISK

FINANCIAL IMPACT

POLICY IMPACT

SIMILAR CASES

REQUIRED ACTIONS

AI EXECUTIVE SUMMARY

SOURCE / PROVENANCE

AUDIT HISTORY
```

---

# 16. CASE TIMELINE

Display:

```text
Filed
 ↓
Notice
 ↓
Instructions Requested
 ↓
Instructions Received
 ↓
Counter / Reply Filed
 ↓
Hearing
 ↓
Interim Order
 ↓
Final Order
 ↓
Compliance
 ↓
Appeal / Closure
```

Every event must have:

- date
- source
- event
- responsible entity where known
- confidence where AI-derived

---

# 17. AI CASE SUMMARY

Use:

```text
EXECUTIVE SUMMARY

What is the dispute?

Why is Government involved?

What has the court done?

What is the latest development?

What is Government's current position?

What is the legal risk?

What is the financial exposure?

Could this affect Government policy?

What action is required?

Evidence
```

Separate:

```text
FACT
SOURCE
AI INTERPRETATION
AI RECOMMENDATION
```

Never present AI interpretation as a court finding.

---

# 18. AI EXECUTIVE ASSISTANT

Create a dedicated AI assistant.

Example queries:

```text
What requires my attention today?

Show critical Government litigation.

Which departments have the highest litigation exposure?

Show adverse orders from the last 7 days.

Which cases have hearings tomorrow?

Which cases are awaiting Government instructions?

Which matters could affect statewide policy?

Show Revenue cases with financial exposure above ₹10 crore.

Which legal issues are appearing across multiple districts?

Show Supreme Court matters involving Tamil Nadu Government.

Which departments have increasing litigation?
```

The AI must answer using controlled application tools.

Architecture:

```text
User
 ↓
Intent Agent
 ↓
Permission Check
 ↓
Retrieval / Tool Selection
 ↓
Specialised Agents
 ↓
Evidence
 ↓
Response Validation
 ↓
Executive Answer
```

Do not allow the LLM to directly query arbitrary SQL.

Do not expose chain-of-thought.

---

# 19. AI AGENT DIRECTORY

Implement modular agents:

```text
1. Intent Agent
2. Case Classification Agent
3. Case Intelligence Agent
4. Department Mapping Agent
5. Officer Mapping Agent
6. Government Advocate Mapping Agent
7. Similar Case Agent
8. Risk Agent
9. Financial Exposure Agent
10. Policy Impact Agent
11. Compliance Agent
12. Executive Briefing Agent
13. Report Agent
14. Notification Agent
15. AI Response Validation Agent
```

The Orchestrator decides which agents/tools are required.

---

# 20. AI SAFETY / HALLUCINATION CONTROL

The system must never fabricate:

- case numbers
- parties
- court orders
- hearing dates
- advocates
- appointments
- officers
- financial values
- legal citations
- case outcomes
- Government positions

If information is unavailable:

```text
Information not available in the connected source.
```

If uncertain:

```text
Classification: Medium confidence
Reason: Multiple departments may have jurisdiction.
```

Every important AI claim should have evidence.

---

# 21. PRIORITY MODEL

Do NOT use this unsafe rule:

> High Court = automatically HIGH priority.

Do NOT use:

> case value > ₹1 crore = automatically HIGH priority.

Instead use multiple factors.

Potential factors:

```text
Court urgency
Court direction
Deadline
Adverse order
Financial exposure
Policy impact
Public-service impact
Statewide impact
Precedent risk
Compliance risk
Repeated similar litigation
Government instruction pending
Appeal limitation
```

The system may calculate a proposed priority, but final official priority should be governed by configurable rules and/or authorised human review.

---

# 22. RISK MODEL

Track independently:

```text
Legal Risk
Financial Risk
Policy Risk
Operational Risk
Compliance Risk
Public Service Risk
```

Overall:

```text
CRITICAL
HIGH
MEDIUM
LOW
```

Risk must be explainable.

Example:

```text
HIGH POLICY RISK

Reason:
17 similar matters across 6 districts challenge the same Government Order.

Evidence:
Case cluster #CL-002
```

---

# 23. FINANCIAL INTELLIGENCE

Track where available:

```text
Claim Amount
Compensation
Interest
Penalty
Potential Liability
Revenue Impact
Project Cost
Other Financial Exposure
```

Do not calculate unsupported liabilities.

Clearly distinguish:

```text
Claimed Amount
Awarded Amount
Estimated Exposure
AI-estimated Exposure
```

---

# 24. COMPLIANCE AND ACTION MANAGEMENT

The system must answer:

> Who needs to do what, by when?

Action model:

```text
Action
Case
Department
Responsible Official
Government Advocate
Due Date
Priority
Status
Source
```

Examples:

```text
Provide instructions to Government Advocate
Review adverse interim order
Prepare compliance report
Obtain departmental records
Consider appeal
Prepare counter affidavit
```

AI can suggest actions.

It cannot execute consequential actions without authorised approval.

---

# 25. SEARCH

Global search:

```text
Case ID
CNR / court identifier where available
Party
Court
Department
Officer
Advocate
District
Legal issue
Statute
Government Order
```

Filters:

```text
Court
Department
District
Case Category
Status
Priority
Risk
Advocate
Officer
Date
Financial Exposure
Policy Impact
```

---

# 26. REPORTING

Generate configurable reports:

```text
CM Daily Litigation Brief
CM Weekly Litigation Brief
Chief Secretary Brief
Law Department Report
Department Litigation Report
District Litigation Report
Government Advocate Workload
Critical Case Report
Adverse Order Report
Compliance Report
Financial Exposure Report
Policy Litigation Report
Court-wise Report
```

Reports must identify:

```text
Generated at
Data freshness
Sources
Filters
Synthetic/demo status if applicable
```

---

# 27. FRONTEND TECHNOLOGY

Use:

```text
React 18
TypeScript
Vite
React Router
Tailwind CSS
shadcn/ui
TanStack Query
Zustand
Recharts
React Hook Form
Zod
```

No third-party data grid.

Use native tables with reusable components and manual pagination.

Desktop-first.

Responsive enough for tablet.

Do not build mobile-first.

---

# 28. FRONTEND STRUCTURE

Use a clean structure such as:

```text
src/
  main.tsx
  App.tsx

  types/
    index.ts

  services/
    api.ts

  hooks/
    useCases.ts
    useDashboard.ts
    useDepartments.ts
    useOfficials.ts
    useAdvocates.ts
    useAI.ts

  stores/
    filters.ts
    ui.ts

  components/
    Layout.tsx
    ExecutiveHeader.tsx
    KPIGrid.tsx
    ExecutiveBrief.tsx
    WhatChanged.tsx
    AttentionQueue.tsx
    DepartmentMatrix.tsx
    CourtBreakdown.tsx
    DistrictMatrix.tsx
    AdvocateIntelligence.tsx
    CaseTable.tsx
    CaseFilters.tsx
    CaseTimeline.tsx
    RiskPanel.tsx
    FinancialPanel.tsx
    PolicyImpactPanel.tsx
    AIAnswer.tsx
    EvidencePanel.tsx
    OfficialDirectory.tsx

  pages/
    Dashboard.tsx
    Cases.tsx
    CaseDetail.tsx
    Departments.tsx
    DepartmentDetail.tsx
    Advocates.tsx
    AdvocateDetail.tsx
    Officials.tsx
    Districts.tsx
    Risks.tsx
    Reports.tsx
    AIAssistant.tsx
    NotFound.tsx
```

---

# 29. BACKEND TECHNOLOGY

Use:

```text
Python 3.12+
FastAPI
SQLAlchemy 2.x
Pydantic v2
PostgreSQL
SQLite for demo
Alembic
Redis-ready architecture
Docker
```

AI:

```text
LangChain
Anthropic Claude
```

Create an AI provider abstraction so model/provider changes do not require rewriting the domain layer.

Do not hard-code an unavailable model name. Make the model configurable through environment variables.

---

# 30. BACKEND API

Implement versioned APIs.

Examples:

```text
GET /api/v1/dashboard/summary
GET /api/v1/dashboard/attention
GET /api/v1/dashboard/changes

GET /api/v1/cases
GET /api/v1/cases/{case_id}
GET /api/v1/cases/{case_id}/timeline
GET /api/v1/cases/{case_id}/orders
GET /api/v1/cases/{case_id}/risk
GET /api/v1/cases/{case_id}/similar
GET /api/v1/cases/{case_id}/actions

GET /api/v1/departments
GET /api/v1/departments/{id}
GET /api/v1/departments/{id}/cases

GET /api/v1/officials
GET /api/v1/officials/{id}

GET /api/v1/advocates
GET /api/v1/advocates/{id}

GET /api/v1/courts
GET /api/v1/districts

POST /api/v1/ai/query
POST /api/v1/ai/case-summary
POST /api/v1/ai/executive-brief

GET /api/v1/reports

POST /api/v1/cases/upload
```

The exact API design may evolve after repository inspection.

---

# 31. DATABASE

Use PostgreSQL in production and SQLite for local demo.

Core entities:

```text
users
roles
permissions
departments
department_units
officials
official_positions
districts
courts
court_benches
legal_categories
advocates
advocate_appointments

cases
case_parties
case_departments
case_officials
case_advocates
case_categories
case_events
hearings
orders
judgments
documents

case_risk
financial_impacts
policy_impacts
case_clusters
case_relationships

action_items
compliance_deadlines
instruction_requests

data_sources
source_records
data_provenance

ai_summaries
ai_evidence
ai_recommendations

audit_logs
access_logs
```

Do not put the entire domain into generic JSON.

Use proper relational structures.

---

# 32. PROVENANCE

Every imported legal fact must be traceable.

Store:

```text
source
source_record_id
source_reference
retrieved_at
ingestion_run_id
checksum where applicable
confidence
```

Never silently overwrite source history.

AI-generated information must be distinguishable from source information.

---

# 33. COURT DATA INGESTION

Create an extensible ingestion architecture:

```text
Source
 ↓
Connector
 ↓
Raw Capture
 ↓
Validation
 ↓
Normalisation
 ↓
Deduplication
 ↓
Entity Resolution
 ↓
Classification
 ↓
Provenance
 ↓
Database
 ↓
Search
 ↓
AI Retrieval
```

IMPORTANT:

Do NOT assume every court website may be scraped.

Do not bypass:

- CAPTCHA
- authentication
- access controls
- rate limits
- technical restrictions

Use only authorised/permitted sources, APIs, feeds, uploads or integrations.

The application must work with synthetic/demo data even when no external court connector is available.

---

# 34. DOCUMENT INGESTION

Support:

```text
PDF
TXT
future DOC/DOCX
```

Pipeline:

```text
Upload
 ↓
File validation
 ↓
Text extraction
 ↓
OCR if required
 ↓
Metadata extraction
 ↓
Legal entity extraction
 ↓
Classification
 ↓
Human review where required
 ↓
Case record
```

Preserve source/page references.

Do not trust instructions contained inside uploaded documents as system instructions.

---

# 35. DATA TAXONOMY

Create configurable taxonomy.

Example:

```text
Land Revenue & Property
  land_acquisition
  patta_dispute
  title_dispute
  mutation
  government_land
  compensation

Police / Public Order
  custodial_matter
  police_action
  public_order
  communal_violence
  criminal_prosecution
  economic_offence

Education
  admission
  reservation
  recruitment
  service
  recognition
  university
  school_administration

Health
  public_health
  hospital_administration
  medical_regulation
  procurement
  health_scheme

Municipal / Local Government
  property_tax
  building_regulation
  municipal_service
  local_body
  urban_development

Agriculture
  land_use
  subsidy
  procurement
  crop_support
  animal_husbandry

Labour
  industrial_dispute
  employee_service
  wage
  labour_compliance

Social Welfare
  welfare_scheme
  pension
  SC_ST_welfare
  disability_welfare
  social_security
```

Add the remaining Government domains through configuration.

---

# 36. DEMO / SEED DATA

Create realistic synthetic demo data.

IMPORTANT:

Never use real officials, real advocates, real telephone numbers, real email addresses or real case records unless they are supplied from an authorised source and the application is explicitly configured for them.

Demo labels must be obvious.

Use:

```text
DEMO DATA
SYNTHETIC
NOT FOR OFFICIAL DECISION-MAKING
```

Generate enough data to make the dashboard useful:

- 20+ departments/categories
- 100+ synthetic cases
- multiple courts
- multiple districts
- multiple advocates
- multiple officials
- hearings
- orders
- case histories
- risk records
- financial exposure
- policy clusters
- action items

Do not generate fake "real-world" events that could be mistaken for actual Tamil Nadu Government litigation.

Use identifiers such as:

```text
DEMO-TN-REV-0001
DEMO-TN-HOME-0002
```

---

# 37. CASE CLASSIFICATION AGENT

Use structured Pydantic output.

Example:

```python
class ClassifiedCase(BaseModel):
    case_id: str | None
    parties: list[str]
    government_involvement: str
    case_type: str
    subject_category: str
    statutes: list[str]
    court_level: str | None
    court_location: str | None
    case_value_inr: float | None
    proposed_department: str | None
    proposed_official_role: str | None
    proposed_priority: str | None
    confidence: float
    evidence: list[str]
    reasoning_summary: str
```

The LLM proposes classification.

The application validates it against the taxonomy.

Never let the LLM arbitrarily create new official departments.

---

# 38. DEPARTMENT / OFFICIAL MAPPING

Do NOT use the simplistic rule:

```text
case type → automatically assign a specific real officer
```

Instead:

```text
Case classification
 ↓
Candidate department
 ↓
Authoritative organisational mapping
 ↓
Candidate responsible role
 ↓
Current authorised officer lookup
 ↓
Human approval where required
```

AI may recommend.

Authoritative systems/rules determine official assignment.

---

# 39. GOVERNMENT ADVOCATE MAPPING

Use:

```text
Case
 ↓
Court
 ↓
Department
 ↓
Appointment / Assignment Record
 ↓
Government Advocate
```

Do not infer appointment from appearance alone.

Support effective dates.

---

# 40. SECURITY

The architecture must be RBAC-ready even if authentication is initially disabled for the local demo.

Roles:

```text
CM_EXECUTIVE
CHIEF_SECRETARY
LAW_DEPARTMENT
DEPARTMENT_SECRETARY
DEPARTMENT_HEAD
DISTRICT_COLLECTOR
AUTHORISED_OFFICER
POLICE_HOME_OFFICIAL
GOVERNMENT_ADVOCATE
AUDITOR
ADMIN
```

The actual production permission matrix must be configurable.

AI must inherit the user's permissions.

A user must never obtain unauthorised data by asking the AI.

Protect against:

- prompt injection
- IDOR
- SQL injection
- XSS
- malicious uploads
- data exfiltration
- privilege escalation

---

# 41. AUDIT

Audit important actions:

```text
Login
Case view
Document view
Search
Export
AI query
AI tool call
Case modification
Risk modification
Assignment modification
Report generation
Permission change
```

For the demo, implement the audit model even if authentication is not enabled.

---

# 42. UX QUALITY REQUIREMENTS

The application must look like a premium enterprise government platform.

Use:

- strong information hierarchy
- compact executive cards
- clear tables
- restrained colour usage
- consistent severity indicators
- professional typography
- whitespace
- clear drill-downs
- responsive loading states
- empty states
- error states

Avoid:

- excessive gradients
- neon AI effects
- oversized illustrations
- consumer-style social components
- fake 3D dashboards
- excessive animations

---

# 43. DEMO DATA BANNER

When using synthetic data, display prominently:

```text
DEMO ENVIRONMENT
All litigation records shown are synthetic and for demonstration only.
```

This banner must not be hidden.

---

# 44. ORIGINAL MVP API COMPATIBILITY

Support the useful parts of the original MVP API while improving them.

Original concepts:

```text
GET /api/cases
GET /api/cases/{case_id}
GET /api/departments
GET /api/officials
GET /api/dashboard/summary
POST /api/cases/upload
POST /api/cases/{case_id}/update-status
```

Prefer:

```text
/api/v1/...
```

and maintain compatibility wrappers only if the existing repository requires them.

---

# 45. DEVELOPMENT STRATEGY

DO NOT generate the entire system blindly in one step.

First:

## STEP 1 - INSPECT

Inspect the repository.

Identify:

- current framework
- existing files
- existing components
- current database
- current APIs
- environment
- dependencies
- existing UI

Do not overwrite working code unnecessarily.

## STEP 2 - PLAN

Produce:

```text
Current State
Target Architecture
Files to Create
Files to Modify
Dependencies
Implementation Order
Risks
```

## STEP 3 - BUILD VERTICAL SLICE 1

Implement:

```text
Database
 ↓
Backend API
 ↓
Dashboard API
 ↓
React Dashboard
 ↓
Synthetic Data
```

The application must run end-to-end.

## STEP 4

Implement:

```text
Case Explorer
Case Detail
Department Intelligence
```

## STEP 5

Implement:

```text
Government Advocate Intelligence
Officer Responsibility
Hearings
Orders
Actions
```

## STEP 6

Implement:

```text
AI Case Classification
AI Executive Brief
AI Assistant
```

## STEP 7

Implement:

```text
Risk
Financial Exposure
Policy Clusters
Similar Cases
```

## STEP 8

Implement:

```text
Security
Audit
Testing
Observability
Deployment
```

After every phase:

1. run tests
2. run lint/type checks
3. verify the application starts
4. verify API
5. verify UI
6. fix errors
7. report changed files

---

# 46. LOCAL DEVELOPMENT

Provide:

```text
Frontend:
http://localhost:5173

Backend:
http://localhost:8000

OpenAPI:
http://localhost:8000/docs
```

Environment:

```env
DATABASE_URL=sqlite:///./dev.db
ANTHROPIC_API_KEY=
ANTHROPIC_MODEL=
FASTAPI_ENV=development
CORS_ORIGINS=http://localhost:5173
```

Do not commit secrets.

The system must run without an Anthropic key using a deterministic/mock AI provider for demo mode.

---

# 47. MOCK AI MODE

This is essential for reliable local development.

If:

```env
AI_PROVIDER=mock
```

then use deterministic synthetic responses.

If:

```env
AI_PROVIDER=anthropic
```

then use Anthropic.

The application must not crash merely because an API key is absent.

---

# 48. TEST CASES

At minimum test:

### Case classification

```text
Land acquisition
→ Revenue
```

```text
Police custodial matter
→ Home/Police
```

```text
Education admission dispute
→ Education
```

### Exclusion

```text
Personal matrimonial dispute of an MLA
→ EXCLUDED
```

### AI safety

```text
User asks for unauthorised restricted case
→ ACCESS DENIED
```

### Evidence

```text
AI summary without source evidence
→ FAIL VALIDATION
```

### Data quality

```text
Duplicate case
→ Do not create duplicate
```

---

# 49. FINAL ACCEPTANCE CRITERIA

The project is considered successful only when an executive can:

1. Open the dashboard.
2. Understand statewide Government litigation posture.
3. See critical/high-risk matters.
4. See what changed.
5. See department-wise exposure.
6. See court-wise exposure.
7. See district-wise exposure.
8. See Government Advocate workload.
9. Identify pending instructions.
10. Identify responsible officials.
11. See upcoming hearings.
12. See adverse/important orders.
13. See financial exposure.
14. See policy impact.
15. Identify clusters of similar litigation.
16. Open a case.
17. Understand its complete timeline.
18. See source evidence.
19. Ask the AI assistant a natural-language question.
20. Receive an evidence-backed answer.
21. Drill from AI answer to source case.
22. Understand what action is required.
23. Generate an executive report.

---

# 50. NON-NEGOTIABLE RULES

DO NOT:

- fabricate real Tamil Nadu Government data
- fabricate real officials
- fabricate real Government Advocates
- fabricate court orders
- fabricate hearing dates
- fabricate legal citations
- claim a real-time court feed exists when it does not
- scrape restricted websites
- bypass CAPTCHA/authentication
- use an LLM as the source of truth
- allow AI to bypass permissions
- assign real officers solely through AI inference
- rank advocates by simplistic win rate
- expose chain-of-thought
- make personal cases part of Government litigation
- create fake official communications
- silently overwrite source data

DO:

- use synthetic demo data
- clearly label demo data
- preserve provenance
- provide evidence
- distinguish facts from AI interpretation
- use configurable taxonomies
- use deterministic rules for deterministic tasks
- use AI where ambiguity/reasoning adds value
- maintain audit history
- build modularly
- test every vertical slice

---

# 51. FINAL PRODUCT POSITIONING

The final UI should communicate this concept immediately:

```text
TAMIL NADU GOVERNMENT
LITIGATION INTELLIGENCE

Know the cases.
Know the risk.
Know the responsibility.
Know the next action.
```

The application is not merely counting cases.

It is transforming Government litigation data into:

```text
CASE
 ↓
INTELLIGENCE
 ↓
RISK
 ↓
RESPONSIBILITY
 ↓
ACTION
```

Build this as a serious executive-grade AI product, not as a demo CRUD dashboard with an AI chatbot attached.

## BEGIN

First inspect the existing repository.

Do not start coding until you have produced the implementation plan.

Then implement the first complete vertical slice and verify that it runs end-to-end.
