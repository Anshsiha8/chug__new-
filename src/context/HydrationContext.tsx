import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import {
  UserProfile,
  ReminderSettings,
  ActivitySession,
  DrinkEntry,
  DayRecord,
  TabType,
  ThemeMode
} from '../types/hydration.js';
import {
  DEFAULT_USER_PROFILE,
  DEFAULT_REMINDER_SETTINGS,
  DEFAULT_ACTIVITIES,
  createInitialDatabase
} from '../utils/seedData.js';
import { hydraAudio } from '../utils/audio.js';

interface HydrationContextType {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  reminderSettings: ReminderSettings;
  setReminderSettings: React.Dispatch<React.SetStateAction<ReminderSettings>>;
  activities: ActivitySession[];
  addActivity: (activity: Omit<ActivitySession, 'id'>) => void;
  updateActivity: (id: string, activity: Partial<ActivitySession>) => void;
  deleteActivity: (id: string) => void;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  database: Record<string, DayRecord>;
  todayKey: string;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  selectedDateKey: string;
  todayRecord: DayRecord;
  selectedDayRecord: DayRecord;
  addDrink: (drink: Omit<DrinkEntry, 'id'>, targetKey?: string) => void;
  undoLastDrink: (targetKey?: string) => void;
  deleteDrink: (id: string, targetKey?: string) => void;
  updateDrinkMl: (id: string, ml: number, targetKey?: string) => void;
  resetDay: (targetKey?: string) => void;
  resetAllData: () => void;
  toast: { text: string; id: number } | null;
  triggerToast: (text: string) => void;
  isOnboardingOpen: boolean;
  setIsOnboardingOpen: (open: boolean) => void;
  streak: number;
  nextAlertMinutes: number;
  snoozeAlert: (mins: number) => void;
  acknowledgeAlert: () => void;
  skipAlert: () => void;
}

const HydrationContext = createContext<HydrationContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'CHUG_STATE_V2';

export const HydrationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Default to October 24, 2026 to visually match the user's reference prototypes
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2026, 9, 24));
  const todayKey = '2026-9-24';

  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<{ text: string; id: number } | null>(null);
  const [nextAlertMinutes, setNextAlertMinutes] = useState<number>(60);

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_profile`);
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_USER_PROFILE;
  });

  const [reminderSettings, setReminderSettings] = useState<ReminderSettings>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_reminders`);
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_REMINDER_SETTINGS;
  });

  const [activities, setActivities] = useState<ActivitySession[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_activities`);
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_ACTIVITIES;
  });

  const [database, setDatabase] = useState<Record<string, DayRecord>>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_db`);
      if (saved) return JSON.parse(saved);
    } catch {}
    return createInitialDatabase();
  });

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_profile`, JSON.stringify(userProfile));
    } catch {}
  }, [userProfile]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_reminders`, JSON.stringify(reminderSettings));
    } catch {}
  }, [reminderSettings]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_activities`, JSON.stringify(activities));
    } catch {}
  }, [activities]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_db`, JSON.stringify(database));
    } catch {}
  }, [database]);

  // Apply theme to document root
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    triggerToast(next === 'light' ? '☀️ POP CREAM THEME ACTIVE!' : '🌙 MIDNIGHT INK THEME ACTIVE!');
  };

  const selectedDateKey = useMemo(() => {
    return `${selectedDate.getFullYear()}-${selectedDate.getMonth()}-${selectedDate.getDate()}`;
  }, [selectedDate]);

  const todayRecord: DayRecord = useMemo(() => {
    return database[todayKey] || { goal: 2500, drinks: [] };
  }, [database, todayKey]);

  const selectedDayRecord: DayRecord = useMemo(() => {
    return database[selectedDateKey] || { goal: 2500, drinks: [] };
  }, [database, selectedDateKey]);

  const triggerToast = (text: string) => {
    setToast({ text, id: Date.now() });
    setTimeout(() => {
      setToast(prev => (prev?.text === text ? null : prev));
    }, 3200);
  };

  const addDrink = (drink: Omit<DrinkEntry, 'id'>, targetKey = todayKey) => {
    const newEntry: DrinkEntry = {
      ...drink,
      id: `drink-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      timestamp: Date.now()
    };

    setDatabase(prev => {
      const existing = prev[targetKey] || { goal: 2500, drinks: [] };
      return {
        ...prev,
        [targetKey]: {
          ...existing,
          drinks: [newEntry, ...existing.drinks]
        }
      };
    });

    hydraAudio.playSplash();
    triggerToast(`WHAM! +${drink.ml} ML LOGGED!`);
  };

  const undoLastDrink = (targetKey = todayKey) => {
    setDatabase(prev => {
      const day = prev[targetKey];
      if (!day || day.drinks.length === 0) return prev;
      const [removed, ...rest] = day.drinks;
      triggerToast(`UNDO! -${removed.ml} ML REVERSED`);
      hydraAudio.playPop();
      return {
        ...prev,
        [targetKey]: {
          ...day,
          drinks: rest
        }
      };
    });
  };

  const deleteDrink = (id: string, targetKey = todayKey) => {
    setDatabase(prev => {
      const day = prev[targetKey];
      if (!day) return prev;
      const itemToDelete = day.drinks.find(d => d.id === id);
      const filtered = day.drinks.filter(d => d.id !== id);
      if (itemToDelete) {
        triggerToast(`REMOVED -${itemToDelete.ml} ML ENTRY`);
        hydraAudio.playPop();
      }
      return {
        ...prev,
        [targetKey]: {
          ...day,
          drinks: filtered
        }
      };
    });
  };

  const updateDrinkMl = (id: string, newMl: number, targetKey = todayKey) => {
    setDatabase(prev => {
      const day = prev[targetKey];
      if (!day) return prev;
      const updated = day.drinks.map(d => (d.id === id ? { ...d, ml: newMl } : d));
      triggerToast(`UPDATED TO ${newMl} ML`);
      hydraAudio.playPop();
      return {
        ...prev,
        [targetKey]: {
          ...day,
          drinks: updated
        }
      };
    });
  };

  const resetDay = (targetKey = todayKey) => {
    setDatabase(prev => ({
      ...prev,
      [targetKey]: {
        goal: prev[targetKey]?.goal || 2500,
        drinks: []
      }
    }));
    triggerToast('RESET COMPLETE! BACK TO ZERO — TIME TO CHUG!');
    hydraAudio.playPop();
  };

  const resetAllData = () => {
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}_profile`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}_reminders`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}_activities`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}_db`);
    setUserProfile(DEFAULT_USER_PROFILE);
    setReminderSettings(DEFAULT_REMINDER_SETTINGS);
    setActivities(DEFAULT_ACTIVITIES);
    setDatabase(createInitialDatabase());
    triggerToast('HYDRATION ARCHIVE RESET TO INITIAL DEMO STATE!');
  };

  const addActivity = (act: Omit<ActivitySession, 'id'>) => {
    const newAct: ActivitySession = {
      ...act,
      id: `act-${Date.now()}`
    };
    setActivities(prev => [...prev, newAct]);
    triggerToast(`ADDED ACTIVITY: ${act.customName || act.type}`);
    hydraAudio.playPop();
  };

  const updateActivity = (id: string, patch: Partial<ActivitySession>) => {
    setActivities(prev => prev.map(a => (a.id === id ? { ...a, ...patch } : a)));
    triggerToast('ACTIVITY SCHEDULE UPDATED');
    hydraAudio.playPop();
  };

  const deleteActivity = (id: string) => {
    setActivities(prev => prev.filter(a => a.id !== id));
    triggerToast('ACTIVITY REMOVED');
    hydraAudio.playPop();
  };

  const snoozeAlert = (mins: number) => {
    setNextAlertMinutes(mins);
    triggerToast(`SNOOZED! RADAR DISPATCH SET TO +${mins} MINS`);
    hydraAudio.playPop();
  };

  const acknowledgeAlert = () => {
    addDrink({
      time: '03:45 PM',
      name: 'Alert Acknowledged',
      ml: 250,
      tag: 'ALERT SIP',
      sub: 'Hourly Vibe Check',
      icon: 'check_circle',
      bg: 'bg-primary',
      iconColor: 'text-on-primary'
    });
    setNextAlertMinutes(60);
    triggerToast('ALERT ACKNOWLEDGED! +250 ML DOWNED');
  };

  const skipAlert = () => {
    setNextAlertMinutes(60);
    triggerToast('SIP SKIPPED! STAY READY FOR NEXT WAVE');
    hydraAudio.playPop();
  };

  // Calculate current streak
  const streak = 5;

  return (
    <HydrationContext.Provider
      value={{
        userProfile,
        setUserProfile,
        reminderSettings,
        setReminderSettings,
        activities,
        addActivity,
        updateActivity,
        deleteActivity,
        activeTab,
        setActiveTab,
        theme,
        setTheme,
        toggleTheme,
        database,
        todayKey,
        selectedDate,
        setSelectedDate,
        selectedDateKey,
        todayRecord,
        selectedDayRecord,
        addDrink,
        undoLastDrink,
        deleteDrink,
        updateDrinkMl,
        resetDay,
        resetAllData,
        toast,
        triggerToast,
        isOnboardingOpen,
        setIsOnboardingOpen,
        streak,
        nextAlertMinutes,
        snoozeAlert,
        acknowledgeAlert,
        skipAlert
      }}
    >
      {children}
    </HydrationContext.Provider>
  );
};

export const useHydration = () => {
  const context = useContext(HydrationContext);
  if (!context) {
    throw new Error('useHydration must be used within a HydrationProvider');
  }
  return context;
};
