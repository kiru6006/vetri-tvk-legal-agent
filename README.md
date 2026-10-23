# Tamil Nadu Government Litigation Intelligence & Executive Command Platform

An AI-powered Government Litigation Intelligence and Executive Decision-Support Platform built specifically for the **Chief Minister’s Office (CMO)** and authorised senior leadership of the Government of Tamil Nadu.

This platform provides executive situational awareness across High Court, Supreme Court, District Courts, and Tribunals—answering the core question: **"What requires the Government's attention now?"**

---

## 🏛️ Platform Status & Roadmap

| Phase | Description | Status | Details |
|---|---|---|---|
| **Phase 1** | **Executive UI/UX Frontend & Intelligence Shell** | ✅ **Completed** | Production-quality React + TS frontend with realistic synthetic data layer, complete client routing, AI executive assistant, attention queue, and department/district/advocate drill-downs. Zero backend dependency. |
| **Phase 2** | **FastAPI Backend & Data Ingestion** | ⏳ *Scheduled* | Ingestion of certified cause lists, High Court orders, automated G.O. mapping, and REST/WebSocket API endpoints. |
| **Phase 3** | **AI Agentic Workflows & Multi-Source Synthesis** | ⏳ *Scheduled* | Full LLM RAG pipelines with evidentiary citations, adverse order alerts, and automated briefing generation. |

---

## ✨ Features Implemented (Phase 1)

1. **Executive Command Dashboard (`/`)**:
   - Statewide KPI cards (Active Cases, Critical Matters, Hearings Today, Adverse Orders, Instructions Pending, Financial Exposure).
   - **Today's Executive Brief**: 5 high-impact matters with evidence citations and direct drill-downs.
   - **What Changed (24h)**: Fresh filings, adverse observations, new hearings, and policy clusters.
   - **Immediate Attention Queue**: Actionable dense table with qualitative priority badges.
   - **Court Forum Breakdown**: Visual distribution across Madras High Court, Madurai Bench, Supreme Court, and Tribunals.

2. **Statewide Workload & Critical Exposure Matrix (`/workload`)** ⭐ **NEW CRITICAL PAGE**:
   - Sovereign command center engineered specifically for the Chief Minister’s Office (CMO), Chief Secretary, and Law Officers.
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
   - **Multi-Dimensional Concentration Switcher**: Instant breakdown by **Departments**, **38 Districts**, or **Law Officers / Advocates** with progress bars and accountable officer names.
   - **Interactive Filter Docket**: Clicking any card filters the docket in real time with keyword search and one-click case preview popups (`CaseQuickModal`).

3. **Judicial Calendar & Cause List Docket (`/calendar`)**:
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
   - **Case Preview Popup (`CaseQuickModal`)**: Clicking any listed case card opens an instant modal popup displaying:
     - Case ID, filing numbers, qualitative priority badges, and status.
     - Challenged Government Orders (G.O.) and governing statutes.
     - Assigned Law Officer and Responsible Executive Officer.
     - AI Sovereign Risk Brief with confidence scoring and required executive action.
     - Direct button to drill into the full case intelligence file (`/cases/:id`).

3. **Vetri Copilot — Sovereign AI Executive Assistant (Present on All Screens)**:
   - **Floating Executive Widget**: Available globally on every page (bottom-right corner) with one-click expandable/collapsible window.
   - **Dual Persona Modes**:
     - **CM Vijay (CMO) Mode**: Focused on cabinet-level intervention, statewide policy risks, instructions pending from Collectors, and exposure > ₹100 Cr.
     - **Govt Advocates Mode**: Focused on cause list listing numbers, pending counter-affidavits, NGT compliances, and Supreme Court SLP briefs.
   - **Interactive Synthesis**: Returns evidence-backed findings, direct recommendations, and **clickable deep-links to certified case files**.

3. **Matter Classification / Case Types (`/case-types`)**:
   - Substantive legal classification across **Civil & Commercial**, **Criminal & Police (DVAC / Act 14/1982)**, **Constitutional & Writs (Art 226/32)**, **Revenue, Excise & Commercial Taxes**, **Service Matters & Recruitment**, and **Environmental Forums (NGT)**.
   - Summarizes governance consequences, financial risks, and critical case files for each domain.

3. **Court Jurisdictions & Judicial Hierarchy (`/court-types`)**:
   - Institutional breakdown across **Supreme Court of India**, **Madras High Court (Principal & Madurai Benches)**, **District & Sessions Courts (38 Districts)**, **Lower & Subordinate Judiciary**, and **Specialised Tribunals & Commissions**.
   - Displays designated Law Officer representation, bench distribution, and one-click forum filtering into Case Explorer.

4. **Case Explorer with Category Tabs (`/cases`)**:
   - **Horizontal Category Tabs**: Instant one-click filtering by substantive matter:
     - `All Proceedings`
     - `Writ Petitions (WP/WA)`
     - `Public Interest Litigations (PIL)`
     - `Civil & Commercial`
     - `Criminal & Police`
     - `Service & Recruitment`
     - `Revenue & Taxes`
     - `Environmental (NGT)`
   - Multi-parameter search across Case ID, Party, Department, District, Advocate, Official, and Legal Issue.
   - Deep filtering by Matter Classification, Court Jurisdiction Tier, Department, Priority, and Status.

5. **Government Advocates Directory with Designation Tabs (`/advocates`)**:
   - **Role Hierarchy Tabs**:
     - `All Law Officers`
     - `Advocate General (AG)`
     - `Additional Advocate General (AAG)`
     - `Special Govt Pleader (SGP)`
     - `Govt Pleader / Addl GP`
     - `Standing Counsels`
   - Matter density, active briefs, and state instructions pending monitoring.

6. **Court Jurisdictions with Judicial Tier Tabs (`/court-types`)**:
   - **Jurisdiction Tabs**:
     - `All Jurisdictions`
     - `Supreme Court (Apex)`
     - `High Court (Madras/Mdu)`
     - `District & Sessions`
     - `Lower Courts`
     - `Tribunals & Commissions`
   - Bench breakdown, designated Law Officer representation, and direct forum filtering into Case Explorer.

3. **Case Detail (`/cases/:id`)**:
   - Substantive legal issues, statutes referenced, and challenged Government Orders.
   - Litigating parties and representation tracking.
   - Assigned Government Advocate / Law Officer and Responsible Executive Officer.
   - **AI Executive Brief**: 6-part structured dispute analysis with evidence confidence scoring.
   - **Timeline**: Interactive procedural chronology flagging adverse observations.
   - **6-Dimensional Risk Matrix & Financial Exposure**: Claimed damages, awarded amounts, and AI actuarial estimates.
   - **Accountable Directives**: Assigned action items with statutory deadlines.

4. **Department Intelligence (`/departments` & `/departments/:code`)**:
   - Real-world Tamil Nadu administrative departments (Revenue, Home/Police, School Education, MAWS, Highways, HR&CE, etc.).
   - Mapped Secretaries, active legal themes, instructions backlog, and financial exposure.

5. **Government Advocates Executive Preparation & Operational Cockpit (`/advocates`)** ⭐ **ENHANCED**:
   - **Advocate Selection & Designation Tabs**: Complete roster across institutional ranks—Advocate General (AG), Additional Advocate General (AAG), Special Government Pleader (SGP), Government Pleader (GP), and Standing Counsel (SC).
   - **Executive Preparation Cockpit Header**:
     - Displays brief counts, bar standing experience, chamber location, and assigned departments.
     - Urgent metrics bar highlighting total active matters, today/tomorrow hearings, and updated vs. pending briefs.
   - **Advocate Office Urgent Action Reminders & Notifications**:
     - Prominent yellow warning banner highlighting immediate requisitions (e.g. Kanchipuram Collector land benchmark valuation before 1:00 PM mention, Home Dept affidavit post receipts).
   - **Color-Coded Case Preparation Status**:
     - **Green (`UPDATED (READY)`)**: All counter-affidavits executed, instructions verified, and evidence compiled.
     - **Yellow (`PENDING PREPARATION`)**: Pulsing warning indicating pending instructions or missing field reports from district collectors / secretariat desks.
   - **Hearing Proximity Urgency Badges**:
     - Highlighted by number of days remaining until court hearing:
       - **LISTED TODAY (0 Days)**: Pulsing red badge with ring highlight (`bg-rose-600 text-white font-black`).
       - **LISTED TOMORROW (1 Day)**: Amber-red badge (`bg-amber-600 text-white font-bold`).
       - **HEARING IN 3–4 DAYS**: Amber alert badge (`bg-amber-100 text-amber-900 border-amber-300`).
       - **THIS WEEK (5–7 Days)**: Blue alert badge.
   - **Preparation & Evidence Checklist**:
     - Prominently highlights what the advocate must prepare themselves for the bench and what exact data must be collected from government officials (e.g. valuation benchmark data from DRO, joint inspection photos, measurement books).
   - **Government Officials Contact Team (Primary & Secondary Contacts)**:
     - **Primary Official Contact (Decision Maker)**: Principal Secretary / Additional Chief Secretary / District Collector with cadre, Secretariat phone (`044-25671442`), and direct email desk. One-click link to open full official hierarchy and residential address dossier (`OfficialContactModal`).
     - **Secondary Operational Contact (Field & Evidence)**: Designated District Revenue Officer (DRO), Superintending/Chief Engineer, Deputy Superintendent of Police (DVAC), or Corporation Commissioner with direct mobile number (`+91 94450 12044`), official email, and specific operational responsibility. One-click direct calling (`tel:`) and emailing (`mailto:`).
   - **Interactive Status Filters**: One-click toggles between **All Briefs**, **Updated (Green)**, and **Pending (Yellow)** cases.

6. **Government Officials Directory & Contact Dossier (`/officials`)**:
   - IAS cadre Principal Secretaries, Department Heads, and District Collectors accountable for court compliance.
   - **Clickable Official Dossier Popup (`OfficialContactModal`)**:
     - **Telecommunication Lines**: Official Direct Line, Camp Office Phone, Official Direct Email, Tapal / Dispatch Desk, and Personal Assistant (PA) contact number.
     - **Dual Addresses**: Both **Official Secretariat / Collectorate Address** and **Official Residential Bungalow Address**.
     - **Administrative Hierarchy**: Chain of command visualization illustrating who the official reports directly to (e.g. Chief Secretary / Additional Chief Secretary), who they directly supervise, and their designated Nodal Law Officer.
     - Available anywhere an official's name appears (Case Detail Page, Dashboard Immediate Attention Queue, and Officials Directory).

7. **District Litigation Matrix (`/districts`)**:
   - Coverage of Tamil Nadu districts with Collector accountability and dominant local legal themes.

8. **Risk & Contingent Liability Intelligence (`/risk`)**:
   - Macro analysis of ₹1,845+ Cr statewide exposure, arbitration attachment threats, and policy disruption risks.

9. **Executive Briefing & Reports Center (`/reports`)**:
   - CM Daily Brief, CS Compliance Report, Adverse Orders Digest, and Financial Exposure summaries with simulated PDF export.

10. **AI Government Litigation Assistant (`/assistant`)**:
    - Serious executive AI interface grounded in cause lists and government orders.
    - Pre-configured executive queries, evidence-backed findings, and cited case links.

11. **Attention Center & Notifications (`/notifications`)**:
    - Real-time alerts on upcoming hearings, adverse orders, and instructions pending.

12. **System Administration & RBAC (`/settings`)**:
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

# Install dependencies (if not already installed)
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
