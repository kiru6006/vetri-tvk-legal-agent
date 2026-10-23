import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { DashboardPage } from './pages/DashboardPage';
import { CaseExplorerPage } from './pages/CaseExplorerPage';
import { CaseDetailPage } from './pages/CaseDetailPage';
import { DepartmentsPage } from './pages/DepartmentsPage';
import { DepartmentDetailPage } from './pages/DepartmentDetailPage';
import { AdvocatesPage } from './pages/AdvocatesPage';
import { OfficialsPage } from './pages/OfficialsPage';
import { DistrictsPage } from './pages/DistrictsPage';
import { RiskIntelligencePage } from './pages/RiskIntelligencePage';
import { ReportsPage } from './pages/ReportsPage';
import { AssistantPage } from './pages/AssistantPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { SettingsPage } from './pages/SettingsPage';
import { CaseTypesPage } from './pages/CaseTypesPage';
import { CourtTypesPage } from './pages/CourtTypesPage';
import { CalendarPage } from './pages/CalendarPage';
import { WorkloadCriticalPage } from './pages/WorkloadCriticalPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="workload" element={<WorkloadCriticalPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="cases" element={<CaseExplorerPage />} />
          <Route path="cases/:id" element={<CaseDetailPage />} />
          <Route path="case-types" element={<CaseTypesPage />} />
          <Route path="court-types" element={<CourtTypesPage />} />
          <Route path="departments" element={<DepartmentsPage />} />
          <Route path="departments/:code" element={<DepartmentDetailPage />} />
          <Route path="advocates" element={<AdvocatesPage />} />
          <Route path="officials" element={<OfficialsPage />} />
          <Route path="districts" element={<DistrictsPage />} />
          <Route path="risk" element={<RiskIntelligencePage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="assistant" element={<AssistantPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
