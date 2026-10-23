# Tamil Nadu Government Litigation Intelligence & Executive Command Platform

An AI-powered Government Litigation Intelligence and Executive Decision-Support Platform built specifically for the **Chief Minister’s Office (CMO)**, the **Chief Secretary**, and authorized senior Law Officers of the Government of Tamil Nadu.

This platform provides real-time executive situational awareness across the High Court of Judicature at Madras (Principal Bench & Madurai Bench), the Supreme Court of India, District & Sessions Courts, and Special Tribunals—answering the core executive question: **"What requires the Government's immediate attention now?"**

---

## 🏛️ Platform Status & Roadmap

| Phase | Description | Status | Details |
|---|---|---|---|
| **Phase 1** | **Executive UI/UX Frontend & Intelligence Shell** | ✅ **Completed & Verified** | Production-quality React + TS frontend with realistic synthetic data layer, complete client routing, Vetri Copilot AI assistant, attention queue, 9-card Workload Exposure matrix, Monday-start Judicial Calendar, Government Advocates Preparation Cockpit, and official contact dossiers with hierarchy. Zero backend dependency. |
| **Phase 2** | **FastAPI Backend & Judicial Data Ingestion** | ⏳ *Scheduled* | Direct ingestion of certified High Court cause lists, daily order PDFs, e-Courts APIs, automated G.O. mapping, and REST/WebSocket API endpoints. |
| **Phase 3** | **AI Agentic Workflows & Multi-Source Synthesis** | ⏳ *Scheduled* | Full LLM RAG pipelines with certified evidentiary citations, adverse order alerts, and automated briefing memo generation for the Cabinet. |

---

## 📸 Platform Screenshots & Key Interfaces

All visual interfaces are captured and maintained in the repository under [`docs/screenshots/`](docs/screenshots/):

| Interface | View | Description |
|---|---|---|
| **Advocates Preparation Cockpit** | [`docs/screenshots/01_advocates_preparation_cockpit.png`](docs/screenshots/01_advocates_preparation_cockpit.png) | Law Officer workbench with urgent action reminders and countdown timers |
| **Pending Cases (Yellow Alert)** | [`docs/screenshots/02_advocates_pending_cases_yellow.png`](docs/screenshots/02_advocates_pending_cases_yellow.png) | Highlighting pending data collection from District Collectors / Secretariat |
| **Updated Cases (Green Ready)** | [`docs/screenshots/03_advocates_updated_cases_green.png`](docs/screenshots/03_advocates_updated_cases_green.png) | Ready briefs with sworn counter-affidavits filed before the bench |
| **Workload & Exposure Matrix** | [`docs/screenshots/04_workload_critical_exposure_matrix.png`](docs/screenshots/04_workload_critical_exposure_matrix.png) | 9 High-Visibility Workload Command Cards and multi-tier concentration breakdowns |
| **Judicial Calendar (Monday Start)**| [`docs/screenshots/06_judicial_calendar_monday_start.png`](docs/screenshots/06_judicial_calendar_monday_start.png) | High Court cause list calendar strictly starting on Monday |
| **5-Day Working Month View** | [`docs/screenshots/07_calendar_working_days_month.png`](docs/screenshots/07_calendar_working_days_month.png) | Court sitting days view omitting Saturday/Sunday |
| **Active Hearings Only View** | [`docs/screenshots/09_calendar_active_hearings_only.png`](docs/screenshots/09_calendar_active_hearings_only.png) | Calendar filtered solely to days with active listed cases |
| **Case Quick Modal Popup** | [`docs/screenshots/11_case_quick_detail_modal.png`](docs/screenshots/11_case_quick_detail_modal.png) | Instant case summary with AI dispute analysis and responsible officers |
| **Official Dossier Modal** | [`docs/screenshots/12_official_contact_dossier_modal.png`](docs/screenshots/12_official_contact_dossier_modal.png) | Contact popup showing official/camp phones, dual addresses, and administrative hierarchy |
| **Vetri Copilot AI Assistant** | [`docs/screenshots/21_vetri_copilot_integration.png`](docs/screenshots/21_vetri_copilot_integration.png) | Global AI copilot with CM Vijay and Govt Advocates dual persona modes |
| **Case Explorer Category Tabs** | [`docs/screenshots/24_case_explorer_category_tabs.png`](docs/screenshots/24_case_explorer_category_tabs.png) | Matter filtering by Writ, PIL, Civil, Criminal, Service, Revenue, and Environmental |

---

## ✨ Features Implemented (Phase 1)

### 1. Executive Command Dashboard (`/`)
- **Statewide KPI Cards**: Active Matters, Critical Matters, Hearings Scheduled Today, Adverse Orders, Pending Instructions, and Financial Exposure.
- **Today's Executive Brief**: 5 high-impact matters with evidence citations and direct drill-downs.
- **What Changed in Last 24 Hours**: Fresh filings, adverse court observations, new listings, and regulatory challenge clusters.
- **Immediate Attention Queue**: Actionable dense table with qualitative priority badges and direct case modal triggers.
- **Court Forum Breakdown**: Visual distribution across Madras High Court, Madurai Bench, Supreme Court, and Environmental Tribunals (NGT).

### 2. Statewide Workload & Critical Exposure Matrix (`/workload`) ⭐
- Sovereign command cockpit engineered specifically for CMO and Cabinet review.
- **9 High-Visibility Workload Command Cards**:
  1. **Active Matters** (3,280): Total active state litigations across all judicial tiers.
  2. **Hearings Next 7 Days** (64): Impending cause list listings scheduled this week.
  3. **Instructions Pending** (74): Law Officer requisitions awaiting Secretariat / Collector replies.
  4. **Orders Awaited** (28): Final arguments concluded; judgments reserved for pronouncement.
  5. **Adverse Orders** (38): High-risk interim stays, contempt notices, and garnishee warnings.
  6. **Critical Matters** (42): Cabinet-level proceedings requiring urgent intervention.
  7. **High-Risk Matters** (115): Proceedings carrying severe operational or fiscal risks.
  8. **Financial Exposure** (₹1,845 Cr): Cumulative contingent liabilities and arbitral enforcement.
  9. **Policy Impact** (56 Matters): Statewide regulatory and statutory challenge dockets.
- **Multi-Dimensional Concentration Switcher**: Instant concentration breakdown by **Departments**, **38 Districts**, or **Law Officers / Advocates** with progress bars and accountable officer names.
- **Interactive Filter Docket**: Clicking any card filters the litigation list in real time with keyword search and one-click case preview popups (`CaseQuickModal`).

### 3. Government Advocates Executive Preparation & Operational Cockpit (`/advocates`) ⭐
- **Designation Roster Tabs**: Institutional ranks covering **Advocate General (AG)**, **Additional Advocate General (AAG)**, **Special Government Pleader (SGP)**, **Government Pleader (GP)**, and **Standing Counsel (SC)**.
- **Executive Preparation Cockpit Header**:
  - Displays bar standing experience, chamber location, assigned departments, and active briefs.
  - Urgent metrics bar highlighting total active matters, today/tomorrow hearings, and updated vs. pending briefs.
- **Advocate Office Urgent Action Reminders & Notifications**:
  - Prominent yellow warning banner alerting the law officer’s office to immediate requisitions (e.g. *Kanchipuram Collector land benchmark valuation before 1:00 PM mention*, *Home Dept detention tapal dispatch receipt verification*).
- **Color-Coded Case Preparation Status**:
  - 🟢 **Green (`UPDATED (READY)`)**: All counter-affidavits executed, instructions verified, and evidence compiled.
  - 🟡 **Yellow (`PENDING PREPARATION`)**: Pulsing warning indicating pending instructions or missing field reports from district collectors / secretariat desks.
- **Hearing Proximity Urgency Badges**:
  - Dynamically highlights urgency based on number of days remaining:
    - 🔴 **`LISTED TODAY (0 Days)`**: Pulsing red badge with ring highlight.
    - 🟠 **`LISTED TOMORROW (1 Day)`**: Amber-red urgent badge.
    - 🟡 **`HEARING IN 3–4 DAYS`**: Amber warning for upcoming court sittings.
    - 🔵 **`THIS WEEK (5–7 Days)`**: Calm scheduling indicator.
- **Preparation & Evidence Checklist**:
  - Dedicated checklist for every brief detailing what the advocate must prepare themselves and what data must be collected from government officials (e.g. *valuation benchmark data from DRO*, *geo-tagged CETP photos*, *contract measurement books*).
- **Government Officials Contact Team (Primary & Secondary Contacts)**:
  - **Primary Official Contact (Decision Maker)**: Principal Secretary / Additional Chief Secretary / District Collector with cadre, Secretariat direct phone (`044-25671442`), and direct email desk. One-click link to open full official hierarchy and residential address dossier (`OfficialContactModal`).
  - **Secondary Operational Contact (Field & Evidence)**: Designated District Revenue Officer (DRO), Superintending/Chief Engineer, Deputy Superintendent of Police (DVAC), or Corporation Commissioner with direct mobile number (`+91 94450 12044`), official email, and specific operational responsibility. One-click direct calling (`tel:`) and emailing (`mailto:`).
- **Interactive Status Filters**: One-click toggles between **All Briefs**, **Updated (Green)**, and **Pending (Yellow)** cases.

### 4. Judicial Calendar & Cause List Docket (`/calendar`) ⭐
- **Monday Start Day Standard**: Aligned with the judicial week of the Madras High Court and Supreme Court benches, starting each week on **Monday**.
- **4 Selectable Executive Views**:
  - **Full Month (Mon - Sun)**: Complete 7-day calendar with weekend holiday shading.
  - **Working Days Month (Mon - Fri)**: 5-column court sitting days view omitting Saturday and Sunday.
  - **Working Days Week (Mon - Fri)**: Detailed 5-day active week column view showing individual case cards per day.
  - **Active Hearings (Court Sittings Filtered)**: Clean list/grid displaying only dates in the month that have active listed litigation matters.
- **Executive Filter Toolbar (Dropdowns & Search)**:
  - **By Department**: Filter across Tamil Nadu administrative departments (Revenue, Home/Police, School Education, MAWS, Highways, Commercial Taxes, etc.).
  - **By District**: Filter by any of the 38 administrative districts (Chennai, Madurai, Coimbatore, Kanchipuram, etc.).
  - **By Government Advocate**: Filter by assigned Law Officer (Advocate General, Additional AGs, Special Government Pleaders, etc.).
  - **By Law Designation**: Filter across institutional ranks (Advocate General, AAG, Special GP, Government Pleader, Standing Counsel).
  - **By Matter Domain**: Filter by broad category (Constitutional Writs, Civil & Commercial, Criminal & Police, Service & Employment, Revenue & Taxes, Environmental).
  - **Keyword Search & Instant Reset**: Free-text search matching case titles, IDs, or issues, with a one-click **Reset Filters** button.
- **Critical Hearing Indicators**: Date cards badge matters with matter counts and pulsing indicators for `CRITICAL` state proceedings.
- **Date-Filtered Cause List Roster**: Clicking any date instantly loads all proceedings scheduled on that day in the right-hand roster.
- **Case Preview Popup (`CaseQuickModal`)**: Clicking any listed case card opens an instant modal popup displaying case ID, statutes, challenged G.O.s, and AI risk analysis.

### 5. Vetri Copilot — Sovereign AI Executive Assistant (Global on All Screens) ⭐
- **Floating Executive Widget**: Available globally on every page (bottom-right corner) with one-click expandable/collapsible window.
- **Dual Persona Modes**:
  - **CM Vijay (CMO) Mode**: Focused on cabinet-level intervention, statewide policy risks, instructions pending from Collectors, and exposure > ₹100 Cr.
  - **Govt Advocates Mode**: Focused on cause list listing numbers, pending counter-affidavits, NGT compliances, and Supreme Court SLP briefs.
- **Interactive Synthesis**: Returns evidence-backed findings, direct recommendations, and **clickable deep-links to certified case files**.

### 6. Case Explorer with Category Tabs (`/cases`)
- **Horizontal Category Tabs**: Instant one-click filtering by substantive matter:
  - `All Proceedings`, `Writ Petitions (WP/WA)`, `Public Interest Litigations (PIL)`, `Civil & Commercial`, `Criminal & Police`, `Service & Recruitment`, `Revenue & Taxes`, and `Environmental (NGT)`.
- Multi-parameter search across Case ID, Party, Department, District, Advocate, Official, and Legal Issue.
- Deep filtering by Matter Classification, Court Jurisdiction Tier, Department, Priority, and Status.

### 7. Matter Classification / Case Types (`/case-types`)
- Substantive legal classification across **Civil & Commercial**, **Criminal & Police (DVAC / Act 14/1982)**, **Constitutional & Writs (Art 226/32)**, **Revenue, Excise & Commercial Taxes**, **Service Matters & Recruitment**, and **Environmental Forums (NGT)**.
- Category tabs and cards highlighting governance consequences, financial risks, and critical case files for each domain.

### 8. Court Jurisdictions & Judicial Hierarchy (`/court-types`)
- Institutional breakdown across **Supreme Court of India**, **Madras High Court (Principal & Madurai Benches)**, **District & Sessions Courts (38 Districts)**, **Lower & Subordinate Judiciary**, and **Specialised Tribunals & Commissions**.
- Tier tabs and cards displaying designated Law Officer representation, bench distribution, and one-click forum filtering into Case Explorer.

### 9. Case Intelligence Dossier (`/cases/:id`)
- Substantive legal issues, statutes referenced, and challenged Government Orders (G.O.).
- Litigating parties and representation tracking (Government role vs. private petitioner counsel).
- Assigned Government Advocate / Law Officer and Responsible Executive Officer.
- **AI Executive Brief**: 6-part structured dispute analysis with evidence confidence scoring.
- **Timeline**: Interactive procedural chronology flagging adverse observations.
- **6-Dimensional Risk Matrix & Financial Exposure**: Claimed damages, awarded amounts, and AI actuarial estimates.
- **Accountable Directives**: Assigned action items with statutory deadlines.

### 10. Department Intelligence (`/departments` & `/departments/:code`)
- Real-world Tamil Nadu administrative departments (Revenue, Home/Police, School Education, MAWS, Highways, HR&CE, etc.).
- Mapped Secretaries, active legal themes, instructions backlog, and financial exposure.

### 11. Government Officials Directory & Contact Dossier (`/officials`)
- IAS cadre Principal Secretaries, Department Heads, and District Collectors accountable for court compliance.
- **Clickable Official Dossier Popup (`OfficialContactModal`)**:
  - **Telecommunication Lines**: Official Direct Line, Camp Office Phone, Official Direct Email, Tapal / Dispatch Desk, and Personal Assistant (PA) contact number.
  - **Dual Addresses**: Both **Official Secretariat / Collectorate Address** and **Official Residential Bungalow Address**.
  - **Administrative Hierarchy**: Chain of command visualization illustrating who the official reports directly to, who they directly supervise, and their designated Nodal Law Officer.
  - Available anywhere an official's name appears (Case Detail Page, Dashboard Immediate Attention Queue, Advocates Cockpit, and Officials Directory).

### 12. District Litigation Matrix (`/districts`)
- Coverage of Tamil Nadu districts with Collector accountability and dominant local legal themes.

### 13. Risk & Contingent Liability Intelligence (`/risk`)
- Macro analysis of ₹1,845+ Cr statewide exposure, arbitration attachment threats, and policy disruption risks.

### 14. Executive Briefing & Reports Center (`/reports`)
- CM Daily Brief, CS Compliance Report, Adverse Orders Digest, and Financial Exposure summaries with simulated PDF export.

### 15. AI Government Litigation Assistant (`/assistant`)
- Serious executive AI interface grounded in cause lists and government orders.
- Pre-configured executive queries, evidence-backed findings, and cited case links.

### 16. Attention Center & Notifications (`/notifications`)
- Real-time alerts on upcoming hearings, adverse orders, and instructions pending.

### 17. System Administration & RBAC (`/settings`)
- Environment controls and governance parameters for Tier-1 Executive Clearance.

---

## 🚀 Quickstart Guide

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### Run the Development Server
```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

The application will start at:
👉 **`http://localhost:5174/`**

### Build for Production
```bash
npm run build
```
Generates a fully bundled, optimized production build in `frontend/dist/`.

---

## 🛡️ Domain Safety & Data Disclaimer
All personal names, case numbers, financial amounts, and litigation narratives utilized in Phase 1 are **synthetic and fictionalized demonstration data** designed to reflect realistic Tamil Nadu administrative structures. They do **not** reflect real ongoing judicial proceedings or live official Government records.
