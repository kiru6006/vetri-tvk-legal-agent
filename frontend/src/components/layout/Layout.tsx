import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { VetriCopilot } from '../copilot/VetriCopilot';

export const Layout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 flex overflow-x-hidden">
      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-slate-950/70 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Sidebar Navigation */}
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div 
        className={`flex-1 flex flex-col transition-all duration-200 min-h-screen ${
          collapsed ? 'lg:ml-16' : 'lg:ml-64'
        } ml-0`}
      >
        <Header
          sidebarCollapsed={collapsed}
          onToggleMobile={() => setMobileOpen(!mobileOpen)}
        />
        
        {/* Main Body below fixed 64px header */}
        <main className="flex-1 mt-16 p-3 sm:p-5 md:p-6 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>

        {/* Global Vetri Copilot */}
        <VetriCopilot />

        {/* Executive Platform Footer */}
        <footer className="py-3 px-4 sm:px-6 border-t border-slate-200 bg-white text-center text-xs text-slate-500">
          Tamil Nadu Government Litigation Intelligence Platform • Designed for Chief Minister’s Office • Synthetic Demonstration Build v1.0
        </footer>
      </div>
    </div>
  );
};
