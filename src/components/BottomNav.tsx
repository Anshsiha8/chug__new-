import React from 'react';
import { useHydration } from '../context/HydrationContext.js';
import { TabType } from '../types/hydration.js';

interface NavItem {
  id: TabType;
  label: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', icon: 'water_drop' },
  { id: 'history', label: 'History', icon: 'calendar_month' },
  { id: 'insights', label: 'Insights', icon: 'bar_chart' },
  { id: 'profile', label: 'Profile', icon: 'manage_accounts' }
];

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useHydration();

  return (
    <nav className="fixed bottom-0 w-full z-40 pb-safe bg-surface/90 backdrop-blur-xl border-t-2 border-black/80">
      <div className="max-w-md mx-auto flex justify-around items-center h-20 px-3 gap-2">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`flex-1 flex flex-col items-center justify-center min-h-[48px] py-1.5 rounded-lg transition-transform active:translate-x-0.5 active:translate-y-0.5 cursor-pointer ${
                isActive
                  ? 'bg-secondary-container text-on-surface comic-shadow-sm comic-border-2 font-bold'
                  : 'comic-border rounded-lg bg-surface-container-lowest comic-shadow-sm text-on-surface hover:bg-surface-container'
              }`}
            >
              <span
                className="material-symbols-outlined text-[22px]"
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <span className="font-body text-[11px] font-bold uppercase leading-none mt-1">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
