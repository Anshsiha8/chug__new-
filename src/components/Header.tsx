import React from 'react';
import { useHydration } from '../context/HydrationContext.js';
import { TabType } from '../types/hydration.js';

const TAB_TITLES: Record<TabType, string> = {
  home: 'Daily Hydration',
  history: 'Hydration History',
  insights: 'Hydration Insights',
  profile: 'Profile Settings'
};

export const Header: React.FC = () => {
  const { activeTab, setActiveTab, theme, toggleTheme, userProfile, setIsOnboardingOpen } = useHydration();

  return (
    <header className="fixed top-0 w-full z-40 pt-safe bg-surface/90 backdrop-blur-xl border-b-2 border-black/80 transition-colors">
      <div className="max-w-md mx-auto h-20 px-4 flex items-center justify-between gap-2">
        {/* Brand & Title */}
        <button
          type="button"
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 text-left focus:outline-none cursor-pointer group"
        >
          <img
            alt="CHUG! Logo"
            className="w-10 h-10 object-contain rounded-lg border-2 border-black shadow-[2px_2px_0px_#171717] bg-white p-0.5 group-hover:rotate-3 transition-transform"
            src="/assets/aistudio/Image_8_0d34d071.jpeg"
            onError={(e) => {
              // Fallback to Image 5 or cdn
              (e.currentTarget as HTMLImageElement).src = '/assets/aistudio/Image_5_944e23bb.jpeg';
            }}
          />
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1.5">
              <span className="font-headline text-[22px] tracking-wide uppercase text-on-surface leading-none">
                CHUG!
              </span>
              <span className="comic-border-2 comic-shadow-sm bg-secondary-container text-on-surface font-body font-bold text-[10px] px-1.5 py-0.5 rounded uppercase rotate-[-2deg] shrink-0 leading-none">
                MODE: ON
              </span>
            </div>
            <span className="font-body text-[10px] uppercase text-primary font-bold tracking-wider leading-none mt-1">
              {TAB_TITLES[activeTab]}
            </span>
          </div>
        </button>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Onboarding / Mission Launcher */}
          <button
            type="button"
            onClick={() => setIsOnboardingOpen(true)}
            title="Open Onboarding Mission"
            className="hidden sm:flex items-center gap-1 bg-secondary-container hover:bg-secondary-fixed text-on-surface font-body font-bold text-[10px] px-2 py-1 rounded comic-border-2 comic-shadow-sm uppercase transition-transform active:translate-x-0.5 active:translate-y-0.5"
          >
            <span className="material-symbols-outlined text-[14px]">rocket_launch</span>
            MISSION
          </button>

          {/* Theme Quick Switcher */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle visual theme"
            className="w-9 h-9 rounded-lg comic-border-2 bg-surface-container hover:bg-secondary-container text-on-surface flex items-center justify-center comic-shadow-sm transition-transform active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
            title={`Switch to ${theme === 'dark' ? 'Pop Cream' : 'Midnight Ink'}`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {theme === 'dark' ? 'wb_sunny' : 'dark_mode'}
            </span>
          </button>

          {/* Profile Avatar Trigger */}
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            aria-label="Open profile settings"
            className="w-10 h-10 comic-border-2 rounded-full overflow-hidden comic-shadow-sm bg-surface-container relative active:scale-95 transition-transform"
          >
            <img
              alt={userProfile.displayName}
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-ua20YpWxt4HgkugZCskywBEdRyqErMEirHxAdwGToPk5hSsDvoT6s8L_jaxQ1aGed7vRHm6bv5oUlvinXEl-pE0XpYafAJTJh7xjrDNNlgfYn1LVSTA4WqomIUkaerDHBKuI07CS7Bi7jBWTy2YP9nhfTtYYvVYXF8vzC_1JAQ3q_JHtahqBQmWH7UAnhsw5XpSUFnGsLWJJPLCyE68s9ZcJpORZax1-qLjes89C7956L3x8U1bxcw"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
