import { DayRecord, UserProfile, ReminderSettings, ActivitySession } from '../types/hydration.js';

export const DEFAULT_USER_PROFILE: UserProfile = {
  displayName: 'ALEX RIVERA',
  email: 'alex@example.com',
  age: 28,
  weightKg: 72,
  activityLevel: 'moderately_active',
  preferredUnit: 'ml',
  title: 'INTREPID RUNNER',
  motto: '“GLOWING WITH HYDRATED MAIN CHARACTER ENERGY! Sweat hard, hydrate harder! Let’s crush the 2.5L bar today!”',
  powerScore: 98
};

export const DEFAULT_REMINDER_SETTINGS: ReminderSettings = {
  intelligentPacing: true,
  intervalMinutes: 60,
  wakeUpTime: '07:00',
  bedtime: '22:30',
  firstReminderTime: '07:30',
  lastReminderTime: '21:45',
  sleepGuardActive: true,
  remindersEnabled: true,
  smartSkipLogic: true,
  pauseWhenGoalReached: true,
  reminderStyle: 'balanced',
  vibes: {
    hourlyVibeCheck: true,
    lockInCheck: true,
    headacheFix: true
  }
};

export const DEFAULT_ACTIVITIES: ActivitySession[] = [
  {
    id: 'act-1',
    type: 'Running',
    customName: 'MORNING TRAIL RUN',
    startTime: '07:30',
    endTime: '08:30',
    daysOfWeek: ['Mon', 'Wed', 'Fri'],
    pauseReminders: true,
    resumeAfterActivity: true
  },
  {
    id: 'act-2',
    type: 'Gym',
    customName: 'GYM STRENGTH PROTOCOL',
    startTime: '17:30',
    endTime: '18:45',
    daysOfWeek: ['Tue', 'Thu'],
    pauseReminders: true,
    resumeAfterActivity: true
  }
];

export function createInitialDatabase(): Record<string, DayRecord> {
  const db: Record<string, DayRecord> = {
    // Key format: YYYY-M-D (M: 0-11, D: 1-31). October 2026 is month index 9.
    '2026-9-24': {
      goal: 2500,
      drinks: [
        { id: 'e1', time: '07:45 AM', name: 'Plain Water', ml: 300, tag: 'WAKE-UP', sub: 'Hydration Boost', icon: 'water_bottle', bg: 'bg-tertiary-fixed', iconColor: 'text-tertiary' },
        { id: 'e2', time: '09:30 AM', name: 'Organic Green Tea', ml: 250, tag: 'FOCUS', sub: 'Work Session', icon: 'emoji_food_beverage', bg: 'bg-secondary-container', iconColor: 'text-secondary' },
        { id: 'e3', time: '11:45 AM', name: 'Sparkling Mineral Water', ml: 500, tag: 'POST-WALK', sub: 'Outdoor Stroll', icon: 'local_drink', bg: 'bg-tertiary-fixed', iconColor: 'text-tertiary' },
        { id: 'e4', time: '01:15 PM', name: 'Filtered Chilled Water', ml: 350, tag: 'LUNCH', sub: 'Midday Meal', icon: 'glass_cup', bg: 'bg-primary-fixed', iconColor: 'text-primary' },
        { id: 'e5', time: '04:00 PM', name: 'Citrus Electrolyte Drink', ml: 500, tag: 'GYM BEAST', sub: 'Heavy Lifting', icon: 'bolt', bg: 'bg-secondary-container', iconColor: 'text-on-surface' },
        { id: 'e6', time: '06:45 PM', name: 'Crisp Ice Water', ml: 500, tag: 'DINNER', sub: 'Evening Meal', icon: 'ac_unit', bg: 'bg-tertiary-fixed-dim', iconColor: 'text-on-tertiary-fixed' },
        { id: 'e7', time: '09:30 PM', name: 'Chamomile Infusion', ml: 450, tag: 'NIGHT CAP', sub: 'Sleep Prep', icon: 'bedtime', bg: 'bg-secondary-fixed-dim', iconColor: 'text-on-secondary-fixed' }
      ]
    },
    '2026-9-23': {
      goal: 2500,
      drinks: [
        { id: 'e23-1', time: '08:00 AM', name: 'Plain Water', ml: 400, tag: 'MORNING', sub: 'Kickstart', icon: 'water_bottle', bg: 'bg-tertiary-fixed', iconColor: 'text-tertiary' },
        { id: 'e23-2', time: '12:30 PM', name: 'Ice Water', ml: 600, tag: 'LUNCH', sub: 'Hydrate', icon: 'glass_cup', bg: 'bg-primary-fixed', iconColor: 'text-primary' },
        { id: 'e23-3', time: '03:15 PM', name: 'Sparkling Water', ml: 500, tag: 'SNACK', sub: 'Fizz', icon: 'local_drink', bg: 'bg-tertiary-fixed', iconColor: 'text-tertiary' },
        { id: 'e23-4', time: '07:00 PM', name: 'Electrolyte Splash', ml: 600, tag: 'TRAINING', sub: 'Run Recovery', icon: 'bolt', bg: 'bg-secondary-container', iconColor: 'text-on-surface' },
        { id: 'e23-5', time: '09:45 PM', name: 'Warm Mint Tea', ml: 450, tag: 'RELAX', sub: 'Night Chill', icon: 'bedtime', bg: 'bg-secondary-fixed-dim', iconColor: 'text-on-secondary-fixed' }
      ]
    },
    '2026-9-22': {
      goal: 2500,
      drinks: [
        { id: 'e22-1', time: '08:30 AM', name: 'Spring Water', ml: 500, tag: 'WAKE-UP', sub: 'Fresh start', icon: 'water_bottle', bg: 'bg-tertiary-fixed', iconColor: 'text-tertiary' },
        { id: 'e22-2', time: '01:00 PM', name: 'Chilled Water', ml: 500, tag: 'LUNCH', sub: 'Hydration', icon: 'glass_cup', bg: 'bg-primary-fixed', iconColor: 'text-primary' },
        { id: 'e22-3', time: '05:30 PM', name: 'Citrus Water', ml: 800, tag: 'WORKOUT', sub: 'Cycling', icon: 'bolt', bg: 'bg-secondary-container', iconColor: 'text-on-surface' },
        { id: 'e22-4', time: '08:45 PM', name: 'Herbal Infusion', ml: 700, tag: 'REST', sub: 'Decompress', icon: 'emoji_food_beverage', bg: 'bg-secondary-container', iconColor: 'text-secondary' }
      ]
    }
  };

  // Seed October 2026 days to match the rich visual pattern
  for (let d = 1; d <= 21; d++) {
    const key = `2026-9-${d}`;
    if (!db[key]) {
      if (d === 3 || d === 11 || d === 20) {
        // High 2k-2.5k
        db[key] = {
          goal: 2500,
          drinks: [
            { id: `auto-${d}-1`, time: '09:00 AM', name: 'Tap Water', ml: 600, tag: 'MORNING', sub: 'Day starter', icon: 'water_bottle', bg: 'bg-tertiary-fixed', iconColor: 'text-tertiary' },
            { id: `auto-${d}-2`, time: '02:00 PM', name: 'Sparkling Lime', ml: 650, tag: 'AFTERNOON', sub: 'Fizzy thirst', icon: 'local_drink', bg: 'bg-secondary-container', iconColor: 'text-secondary' },
            { id: `auto-${d}-3`, time: '07:30 PM', name: 'Filtered Water', ml: 900, tag: 'DINNER', sub: 'Evening sip', icon: 'glass_cup', bg: 'bg-primary-fixed', iconColor: 'text-primary' }
          ]
        };
      } else if (d === 6 || d === 14 || d === 23) {
        // Medium 1k-2k
        db[key] = {
          goal: 2500,
          drinks: [
            { id: `auto-${d}-1`, time: '08:30 AM', name: 'Plain Water', ml: 500, tag: 'MORNING', sub: 'Wake', icon: 'water_bottle', bg: 'bg-tertiary-fixed', iconColor: 'text-tertiary' },
            { id: `auto-${d}-2`, time: '01:00 PM', name: 'Mineral Water', ml: 500, tag: 'LUNCH', sub: 'Table', icon: 'local_drink', bg: 'bg-tertiary-fixed', iconColor: 'text-tertiary' },
            { id: `auto-${d}-3`, time: '06:00 PM', name: 'Cold Tea', ml: 400, tag: 'BREAK', sub: 'Cool', icon: 'emoji_food_beverage', bg: 'bg-secondary-container', iconColor: 'text-secondary' }
          ]
        };
      } else if (d === 7 || d === 15 || d === 28) {
        // Under 1k
        db[key] = {
          goal: 2500,
          drinks: [
            { id: `auto-${d}-1`, time: '10:00 AM', name: 'Plain Water', ml: 350, tag: 'DESK', sub: 'Morning', icon: 'water_bottle', bg: 'bg-tertiary-fixed', iconColor: 'text-tertiary' },
            { id: `auto-${d}-2`, time: '03:30 PM', name: 'Ice Water', ml: 400, tag: 'AFTERNOON', sub: 'Office', icon: 'glass_cup', bg: 'bg-primary-fixed', iconColor: 'text-primary' }
          ]
        };
      } else {
        // Goal Smashed (2,500+ ML)
        db[key] = {
          goal: 2500,
          drinks: [
            { id: `auto-${d}-1`, time: '08:00 AM', name: 'Plain Water', ml: 500, tag: 'WAKE-UP', sub: 'Kickstart', icon: 'water_bottle', bg: 'bg-tertiary-fixed', iconColor: 'text-tertiary' },
            { id: `auto-${d}-2`, time: '11:30 AM', name: 'Spring Water', ml: 600, tag: 'MIDDAY', sub: 'Desk boost', icon: 'water_bottle', bg: 'bg-tertiary-fixed', iconColor: 'text-tertiary' },
            { id: `auto-${d}-3`, time: '02:30 PM', name: 'Electrolyte', ml: 650, tag: 'WORKOUT', sub: 'Power', icon: 'bolt', bg: 'bg-secondary-container', iconColor: 'text-on-surface' },
            { id: `auto-${d}-4`, time: '06:00 PM', name: 'Sparkling Mineral', ml: 500, tag: 'DINNER', sub: 'Table glass', icon: 'local_drink', bg: 'bg-tertiary-fixed', iconColor: 'text-tertiary' },
            { id: `auto-${d}-5`, time: '09:00 PM', name: 'Chamomile', ml: 400, tag: 'RELAX', sub: 'Snooze', icon: 'bedtime', bg: 'bg-secondary-fixed-dim', iconColor: 'text-on-secondary-fixed' }
          ]
        };
      }
    }
  }

  return db;
}
