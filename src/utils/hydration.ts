import { DrinkEntry, UnitType } from '../types/hydration.js';

/**
 * Convert milliliters to US fluid ounces (1 ml ~ 0.033814 fl oz)
 */
export function mlToFlOz(ml: number): number {
  return Math.round(ml * 0.033814 * 10) / 10;
}

/**
 * Convert US fluid ounces to milliliters (1 fl oz ~ 29.5735 ml)
 */
export function flOzToMl(flOz: number): number {
  return Math.round(flOz * 29.5735);
}

/**
 * Format volume in either ML or FL OZ
 */
export function formatVolume(ml: number, unit: UnitType = 'ml'): string {
  if (unit === 'fl_oz') {
    return `${mlToFlOz(ml)} FL OZ`;
  }
  return `${ml.toLocaleString()} ML`;
}

/**
 * Calculate total volume in ml from an array of DrinkEntry
 */
export function calculateDailyTotal(drinks: DrinkEntry[]): number {
  return drinks.reduce((sum, item) => sum + (item.ml || 0), 0);
}

/**
 * Calculate percentage completed (clamped 0 to 100 or unbounded)
 */
export function calculatePercentage(total: number, goal: number, clamp = true): number {
  if (!goal || goal <= 0) return 0;
  const pct = Math.round((total / goal) * 100);
  return clamp ? Math.min(100, Math.max(0, pct)) : pct;
}

/**
 * Get comic callout badge status depending on percentage
 */
export function getCalloutBadge(percent: number, total: number) {
  if (percent >= 100) {
    return {
      title: 'NO CRUMBS!',
      subtitle: 'YOU ATE THAT BOTTLE & LEFT ZERO CRUMBS!',
      bgClass: 'bg-secondary-container',
      textClass: 'text-on-surface',
      rotateClass: 'rotate-[3deg]'
    };
  }
  if (percent >= 75) {
    return {
      title: 'BOOM!',
      subtitle: 'SO CLOSE TO MAXIMUM SPLASH!',
      bgClass: 'bg-secondary-container',
      textClass: 'text-on-surface',
      rotateClass: 'rotate-[-2deg]'
    };
  }
  if (percent >= 40) {
    return {
      title: 'NICE!',
      subtitle: `${percent}% CRUSHED. KEEP COOKING!`,
      bgClass: 'bg-tertiary-fixed',
      textClass: 'text-on-tertiary-fixed',
      rotateClass: 'rotate-[-1.5deg]'
    };
  }
  if (total > 0) {
    return {
      title: 'CHUG!',
      subtitle: 'MORE WATER NEEDED!',
      bgClass: 'bg-surface-container-highest',
      textClass: 'text-on-surface',
      rotateClass: 'rotate-[2deg]'
    };
  }
  return {
    title: 'DRY!',
    subtitle: 'TANK EMPTY — TIME TO CHUG!',
    bgClass: 'bg-surface-container-highest',
    textClass: 'text-on-surface-variant',
    rotateClass: 'rotate-[0deg]'
  };
}

/**
 * Mascot dialogue quotes matching the pop comic vibe
 */
export const MASCOT_QUOTES = [
  '“Hourly vibe check: Time to lock in. It’s giving dried sponge right now, take a sip!”',
  '“You ate that bottle and left zero crumbs! Stay glowing in your hydrated era!”',
  '“Ka-pow! Your cells are dancing with pure hydration! Keep guzzling!”',
  '“No cap, thinking iced latte counts as water is pure delulu. Grab your H2O!”',
  '“Level up your drip! 2L+ reached. Main character hydration unlocked!”',
  '“Supercharged sip complete! Water levels surging through the roof!”'
];

/**
 * Format 24-hour time "14:30" into 12-hour "02:30 PM"
 */
export function formatTime12h(time24: string): string {
  if (!time24 || !time24.includes(':')) return time24 || '12:00 PM';
  const [hStr, mStr] = time24.split(':');
  let h = parseInt(hStr, 10);
  const m = mStr || '00';
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${String(h).padStart(2, '0')}:${m} ${ampm}`;
}

/**
 * Convert Date to YYYY-M-D key (matching prototypes: month index 0-11)
 */
export function getDateKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}
