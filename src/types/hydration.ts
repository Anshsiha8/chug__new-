export type UnitType = 'ml' | 'fl_oz';

export type ActivityLevel = 'mostly_sitting' | 'lightly_active' | 'moderately_active' | 'very_active';

export interface UserProfile {
  displayName: string;
  email: string;
  age: number;
  weightKg: number;
  activityLevel: ActivityLevel;
  preferredUnit: UnitType;
  title: string;
  motto: string;
  powerScore: number;
}

export interface ActivitySession {
  id: string;
  type: string;
  customName: string;
  startTime: string;
  endTime: string;
  daysOfWeek: string[];
  pauseReminders: boolean;
  resumeAfterActivity: boolean;
}

export interface ReminderSettings {
  intelligentPacing: boolean;
  intervalMinutes: number;
  wakeUpTime: string;
  bedtime: string;
  firstReminderTime: string;
  lastReminderTime: string;
  sleepGuardActive: boolean;
  remindersEnabled: boolean;
  smartSkipLogic: boolean;
  pauseWhenGoalReached: boolean;
  reminderStyle: 'gentle' | 'balanced' | 'frequent';
  vibes: {
    hourlyVibeCheck: boolean;
    lockInCheck: boolean;
    headacheFix: boolean;
  };
}

export interface DrinkEntry {
  id: string;
  time: string;
  name: string;
  ml: number;
  tag: string;
  sub: string;
  icon: string;
  bg?: string;
  iconColor?: string;
  timestamp?: number;
}

export interface DayRecord {
  goal: number;
  drinks: DrinkEntry[];
}

export type TabType = 'home' | 'history' | 'insights' | 'profile';
export type TimeframeType = 'week' | 'month' | 'all';
export type ThemeMode = 'dark' | 'light';
