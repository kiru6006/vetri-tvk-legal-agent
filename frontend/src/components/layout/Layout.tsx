import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { VetriCopilot } from '../copilot/VetriCopilot';

export const Layout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Navigation */}
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      {/* Main Content Area */}
      <div 
        className={`flex-1 flex flex-col transition-all duration-200 min-h-screen ${
          collapsed ? 'ml-16' : 'ml-64'
        }`}
      >
        <Header sidebarCollapsed={collapsed} />
        
        {/* Main Body below fixed 64px header */}
        <main className="flex-1 mt-16 p-4 md:p-6 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>

        {/* Global Vetri Copilot for CM Vijay & Govt Advocates */}
        <VetriCopilot />

        {/* Executive Platform Footer */}
        <footer className="py-3 px-6 border-t border-slate-200 bg-white text-center text-xs text-slate-500">
          Tamil Nadu Government Litigation Intelligence Platform • Designed for Chief Minister’s Office • Synthetic Demonstration Build v1.0
        </footer>
      </div>
    </div>
  );
};
