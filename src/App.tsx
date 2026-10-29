import React, { useEffect } from 'react';
import { HydrationProvider, useHydration } from './context/HydrationContext.js';
import { Header } from './components/Header.js';
import { BottomNav } from './components/BottomNav.js';
import { HomeView } from './components/HomeView.js';
import { HistoryView } from './components/HistoryView.js';
import { InsightsView } from './components/InsightsView.js';
import { ProfileView } from './components/ProfileView.js';
import { OnboardingModal } from './components/OnboardingModal.js';
import { TabType } from './types/hydration.js';

const AppContent: React.FC = () => {
  const { activeTab, setActiveTab, setIsOnboardingOpen } = useHydration();

  // Support URL search params for direct tab switching or autostart
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab') as TabType;
      if (tabParam && ['home', 'history', 'insights', 'profile'].includes(tabParam)) {
        setActiveTab(tabParam);
      }
      if (params.get('onboarding') === '1') {
        setIsOnboardingOpen(true);
      }
    }
  }, [setActiveTab, setIsOnboardingOpen]);

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col font-body transition-colors">
      {/* Header bar */}
      <Header />

      {/* Main View Container */}
      <main className="flex-1 flex flex-col relative w-full">
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'history' && <HistoryView />}
        {activeTab === 'insights' && <InsightsView />}
        {activeTab === 'profile' && <ProfileView />}
      </main>

      {/* Persistent Bottom Tab Bar */}
      <BottomNav />

      {/* Onboarding Mission Modal */}
      <OnboardingModal />
    </div>
  );
};

export default function App() {
  return (
    <HydrationProvider>
      <AppContent />
    </HydrationProvider>
  );
}
