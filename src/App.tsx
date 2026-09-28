import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { ToastContainer } from './components/common/ToastContainer';

import { OverviewPage } from './pages/OverviewPage';
import { InboxPage } from './pages/InboxPage';
import { AgentPage } from './pages/AgentPage';
import { IntentsPage } from './pages/IntentsPage';
import { EvaluationPage } from './pages/EvaluationPage';
import { GoldenSetPage } from './pages/GoldenSetPage';
import { FailuresPage } from './pages/FailuresPage';
import { BaselinesPage } from './pages/BaselinesPage';
import { HeadlinePage } from './pages/HeadlinePage';
import { DecisionLogPage } from './pages/DecisionLogPage';
import { ArchitecturePage } from './pages/ArchitecturePage';
import { SettingsPage } from './pages/SettingsPage';

const AppContent: React.FC = () => {
  const { activePage } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case 'overview':
        return <OverviewPage />;
      case 'inbox':
        return <InboxPage />;
      case 'agent':
        return <AgentPage />;
      case 'intents':
        return <IntentsPage />;
      case 'evaluation':
        return <EvaluationPage />;
      case 'golden-set':
        return <GoldenSetPage />;
      case 'failures':
        return <FailuresPage />;
      case 'baselines':
        return <BaselinesPage />;
      case 'headline-critique':
        return <HeadlinePage />;
      case 'decision-log':
        return <DecisionLogPage />;
      case 'architecture':
        return <ArchitecturePage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <OverviewPage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex">
      {/* Left Sidebar */}
      <Sidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        <Topbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          {renderPage()}
        </main>
      </div>

      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
