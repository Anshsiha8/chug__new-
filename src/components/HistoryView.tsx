import React, { useState } from 'react';
import { useHydration } from '../context/HydrationContext.js';
import {
  calculateDailyTotal,
  calculatePercentage,
  getCalloutBadge,
  formatTime12h,
  formatVolume
} from '../utils/hydration.js';
import { hydraAudio } from '../utils/audio.js';

const MONTH_NAMES = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
];

const DAY_NAMES = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

export const HistoryView: React.FC = () => {
  const {
    database,
    selectedDate,
    setSelectedDate,
    selectedDateKey,
    selectedDayRecord,
    addDrink,
    deleteDrink,
    updateDrinkMl,
    userProfile
  } = useHydration();

  // Calendar view year and month (defaulting to selectedDate, 2026 & October index 9)
  const [viewYear, setViewYear] = useState<number>(selectedDate.getFullYear());
  const [viewMonth, setViewMonth] = useState<number>(selectedDate.getMonth());
  const [isLogModalOpen, setIsLogModalOpen] = useState<boolean>(false);

  // Modal fields
  const [modalDrinkType, setModalDrinkType] = useState('Plain Water');
  const [modalAmount, setModalAmount] = useState(350);
  const [modalTime, setModalTime] = useState('14:30');

  const prevMonth = () => {
    hydraAudio.playPop();
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(prev => prev - 1);
    } else {
      setViewMonth(prev => prev - 1);
    }
  };

  const nextMonth = () => {
    hydraAudio.playPop();
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(prev => prev + 1);
    } else {
      setViewMonth(prev => prev + 1);
    }
  };

  // Build calendar matrix
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();
  // Monday start: Sun is 6, Mon is 0, Tue is 1...
  const startingCol = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const prevMonthDays = new Date(viewYear, viewMonth, 0).getDate();

  const prevMonthTrailing: number[] = [];
  for (let i = startingCol - 1; i >= 0; i--) {
    prevMonthTrailing.push(prevMonthDays - i);
  }

  const currentMonthDays: number[] = [];
  for (let d = 1; d <= daysInMonth; d++) {
    currentMonthDays.push(d);
  }

  const totalRendered = startingCol + daysInMonth;
  const remainingCells = (7 - (totalRendered % 7)) % 7;
  const nextMonthLeading: number[] = [];
  for (let n = 1; n <= remainingCells; n++) {
    nextMonthLeading.push(n);
  }

  // Selected Day calculations
  const totalMl = calculateDailyTotal(selectedDayRecord.drinks);
  const goalMl = selectedDayRecord.goal || 2500;
  const percent = calculatePercentage(totalMl, goalMl, true);
  const callout = getCalloutBadge(percent, totalMl);

  const selectedDayOfWeek = DAY_NAMES[selectedDate.getDay()];
  const selectedMonthShort = MONTH_NAMES[selectedDate.getMonth()].slice(0, 3);
  const selectedDayNum = selectedDate.getDate();
  const selectedYear = selectedDate.getFullYear();

  const firstSip = selectedDayRecord.drinks.length > 0 ? selectedDayRecord.drinks[0].time : '--:--';
  const lastSip = selectedDayRecord.drinks.length > 0 ? selectedDayRecord.drinks[selectedDayRecord.drinks.length - 1].time : '--:--';

  const handleLogPastDrinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedTime = formatTime12h(modalTime);

    addDrink(
      {
        time: formattedTime,
        name: modalDrinkType,
        ml: modalAmount,
        tag: 'LOGGED',
        sub: 'Manual Entry',
        icon: modalDrinkType.includes('Tea') ? 'emoji_food_beverage' : modalDrinkType.includes('Electrolyte') ? 'bolt' : 'water_drop',
        bg: 'bg-secondary-container',
        iconColor: 'text-on-surface'
      },
      selectedDateKey
    );

    setIsLogModalOpen(false);
  };

  const handleEditItem = (item: { id: string; name: string; ml: number }) => {
    const input = window.prompt(`Update volume (ML) for ${item.name}:`, String(item.ml));
    if (input) {
      const parsed = parseInt(input, 10);
      if (!isNaN(parsed) && parsed > 0) {
        updateDrinkMl(item.id, parsed, selectedDateKey);
      }
    }
  };

  return (
    <div className="flex flex-col w-full gap-4 pb-28 pt-20 max-w-md mx-auto px-4 select-none">
      {/* Calendar Panel with Comic Frame */}
      <div className="relative w-full bg-surface-container-lowest comic-border comic-shadow-md rounded-xl p-3.5 overflow-hidden">
        {/* Retro Comic Corner Sticker */}
        <div className="absolute top-2 right-2 bg-secondary-container text-on-surface comic-border-2 font-body text-[9px] px-2 py-0.5 rounded shadow-sm rotate-[3deg] z-10 uppercase tracking-wider font-extrabold">
          ✨ IN MY HYDRATED ERA • ISSUE #322
        </div>

        {/* Calendar Month Switcher */}
        <div className="flex items-center justify-between gap-1 mb-2 mt-4">
          <button
            type="button"
            aria-label="Previous Month"
            onClick={prevMonth}
            className="w-9 h-9 flex items-center justify-center comic-border-2 comic-shadow-sm bg-surface-container hover:bg-secondary-container text-on-surface rounded-lg transition-transform active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
          >
            <span className="material-symbols-outlined font-bold text-[20px]">arrow_back_ios_new</span>
          </button>

          <div className="flex flex-col items-center">
            <span className="font-body text-[9px] uppercase tracking-widest text-primary font-extrabold">
              TIMELINE LOG • GOAL SLAYED
            </span>
            <h2 className="font-headline text-lg uppercase tracking-wider text-on-surface flex items-center gap-1">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </h2>
          </div>

          <button
            type="button"
            aria-label="Next Month"
            onClick={nextMonth}
            className="w-9 h-9 flex items-center justify-center comic-border-2 comic-shadow-sm bg-surface-container hover:bg-secondary-container text-on-surface rounded-lg transition-transform active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
          >
            <span className="material-symbols-outlined font-bold text-[20px]">arrow_forward_ios</span>
          </button>
        </div>

        {/* Days of Week Bar */}
        <div className="grid grid-cols-7 gap-1 bg-secondary-container comic-border-2 rounded-lg p-1 mb-2 text-center">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
            <span key={idx} className="font-body text-xs font-bold text-on-surface py-0.5">
              {day}
            </span>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 text-center select-none">
          {/* Previous month trailing */}
          {prevMonthTrailing.map((d) => (
            <div
              key={`prev-${d}`}
              className="h-10 flex items-center justify-center font-body text-xs text-outline opacity-40 select-none"
            >
              {d}
            </div>
          ))}

          {/* Current month days */}
          {currentMonthDays.map((day) => {
            const dateObj = new Date(viewYear, viewMonth, day);
            const key = `${viewYear}-${viewMonth}-${day}`;
            const dayData = database[key] || { goal: 2500, drinks: [] };
            const dayTotal = calculateDailyTotal(dayData.drinks);
            const dayGoal = dayData.goal || 2500;
            const dayPct = Math.min(100, Math.round((dayTotal / dayGoal) * 100));

            const isSelected =
              selectedDate.getFullYear() === viewYear &&
              selectedDate.getMonth() === viewMonth &&
              selectedDate.getDate() === day;

            let bgStyle = 'bg-surface-container';
            if (dayTotal >= dayGoal) {
              bgStyle = 'bg-secondary-container text-on-surface';
            } else if (dayTotal > 0) {
              bgStyle = 'bg-tertiary-fixed text-on-surface';
            }

            return (
              <button
                key={`curr-${day}`}
                type="button"
                onClick={() => {
                  hydraAudio.playPop();
                  setSelectedDate(dateObj);
                }}
                className={`h-10 rounded flex flex-col items-center justify-center relative transition-transform active:translate-x-0.5 active:translate-y-0.5 cursor-pointer ${
                  isSelected
                    ? 'border-[3px] border-primary-container bg-surface-container-lowest comic-shadow-md scale-105 z-10 pt-1'
                    : `comic-border-2 comic-shadow-sm ${bgStyle}`
                }`}
              >
                {isSelected && (
                  <span className="absolute -top-2.5 bg-error text-on-error font-body text-[7px] px-1 py-0.2 rounded uppercase tracking-tighter shadow-sm font-black z-10">
                    SELECTED
                  </span>
                )}
                <span
                  className={`font-body text-xs leading-none font-bold ${
                    isSelected ? 'text-primary' : 'text-on-surface'
                  }`}
                >
                  {day}
                </span>

                {dayTotal >= dayGoal ? (
                  <span
                    className="material-symbols-outlined text-[10px] text-primary mt-0.5"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    water_drop
                  </span>
                ) : dayTotal > 0 ? (
                  <span className="font-body text-[8px] leading-none font-extrabold text-on-tertiary-fixed-variant mt-0.5">
                    {dayPct}%
                  </span>
                ) : null}
              </button>
            );
          })}

          {/* Next month leading */}
          {nextMonthLeading.map((d) => (
            <div
              key={`next-${d}`}
              className="h-10 flex items-center justify-center font-body text-xs text-outline opacity-40 select-none"
            >
              {d}
            </div>
          ))}
        </div>
      </div>

      {/* Pop Art Selected Day Banner */}
      <div className="relative w-full bg-primary-container text-on-primary comic-border comic-shadow-md rounded-xl p-4 overflow-hidden">
        {/* Starburst SVG watermark */}
        <div className="absolute -right-6 -bottom-6 opacity-20 pointer-events-none">
          <svg fill="currentColor" height="150" viewBox="0 0 100 100" width="150">
            <polygon points="50,0 63,35 98,35 70,57 81,91 50,70 19,91 30,57 2,35 37,35" />
          </svg>
        </div>

        {/* Comic Ribbon Tag */}
        <div className="flex items-center mb-3">
          <div className="inline-flex items-center gap-1.5 bg-surface-container-lowest text-on-surface comic-border-2 comic-shadow-sm px-2.5 py-1 rounded font-body text-xs uppercase rotate-[-1.5deg]">
            <span
              className="material-symbols-outlined text-[16px] text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              event
            </span>
            <span className="font-bold text-[11px] tracking-wide">
              {selectedDayOfWeek}, {selectedMonthShort} {selectedDayNum}, {selectedYear}
            </span>
          </div>
        </div>

        {/* Hero Intakes & Celebratory Badge */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="font-body text-[10px] text-on-primary-container font-extrabold uppercase tracking-wider block">
              TOTAL INGESTED
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-headline text-3xl tracking-tight text-white">
                {totalMl.toLocaleString()}
              </span>
              <span className="font-body text-xs opacity-80 font-bold">
                / {formatVolume(goalMl, userProfile.preferredUnit)}
              </span>
            </div>
          </div>

          {/* Action Burst Callout Badge */}
          <div
            className={`comic-border-2 comic-shadow-sm px-2 py-1 rounded text-center flex flex-col items-center shrink-0 ${callout.bgClass} ${callout.textClass} ${callout.rotateClass}`}
          >
            <span className="font-headline text-sm leading-none">{callout.title}</span>
            <span className="font-body text-[8px] uppercase font-bold tracking-tighter leading-none mt-0.5">
              {callout.subtitle}
            </span>
          </div>
        </div>

        {/* Progress Meter with Pop-Art Segment Lines */}
        <div className="w-full bg-on-primary/20 comic-border-2 rounded-full h-4 mt-2 overflow-hidden p-0.5 flex">
          <div
            className="bg-secondary-container h-full rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* Quick Badges */}
        <div className="flex items-center justify-between gap-1 bg-surface-container-lowest/20 comic-border-2 rounded px-2 py-1 mt-2 text-[10px] font-body font-bold tracking-wide uppercase">
          <span className="flex items-center gap-1 text-white">✨ NO CAP, YOUR SKIN WILL THANK YOU</span>
          <span className="bg-secondary-container text-on-surface px-1 py-0.5 rounded text-[8px] font-bold">
            LEVEL UP YOUR DRIP: 2L+ REACHED 💧
          </span>
        </div>

        {/* Summary 3-pack */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-2 border-t border-on-primary/20 text-center font-body text-xs text-on-primary">
          <div className="bg-surface-container-lowest/15 rounded comic-border-2 p-1">
            <span className="block opacity-75 text-[9px] uppercase font-bold">DRINKS</span>
            <span className="font-headline text-sm">{selectedDayRecord.drinks.length} LOGS</span>
          </div>
          <div className="bg-surface-container-lowest/15 rounded comic-border-2 p-1">
            <span className="block opacity-75 text-[9px] uppercase font-bold">FIRST SIP</span>
            <span className="font-headline text-sm">{firstSip}</span>
          </div>
          <div className="bg-surface-container-lowest/15 rounded comic-border-2 p-1">
            <span className="block opacity-75 text-[9px] uppercase font-bold">LAST SIP</span>
            <span className="font-headline text-sm">{lastSip}</span>
          </div>
        </div>
      </div>

      {/* Activity Logs Timeline */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="material-symbols-outlined text-primary text-[20px] shrink-0">receipt_long</span>
            <h3 className="font-headline text-base uppercase text-on-surface tracking-wide truncate">
              ACTIVITY LOGS
            </h3>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="font-body text-[9px] uppercase bg-secondary-container text-on-surface px-2 py-0.5 rounded font-bold comic-border-2 tracking-wider rotate-[-1.5deg]">
              ⚡ VALID SIP LOGGED
            </span>
            <span className="font-body text-[10px] uppercase bg-surface-container text-on-surface-variant px-2 py-0.5 rounded font-bold comic-border-2 tracking-wider">
              CHRONO VIEW
            </span>
          </div>
        </div>

        {/* Log Entries Container */}
        <div className="flex flex-col gap-2">
          {selectedDayRecord.drinks.length === 0 ? (
            <div className="comic-border comic-shadow-sm bg-surface-container-lowest rounded-xl p-6 text-center flex flex-col items-center justify-center gap-2">
              <span className="material-symbols-outlined text-4xl text-outline">water_drop</span>
              <p className="font-headline uppercase text-on-surface text-base">No entries logged for this date!</p>
              <p className="font-body text-on-surface-variant text-xs">
                Tap the yellow button below to record past drinks.
              </p>
            </div>
          ) : (
            selectedDayRecord.drinks.map((item) => (
              <div
                key={item.id}
                className="comic-border comic-shadow-sm bg-surface-container-lowest rounded-xl p-3 flex items-center justify-between gap-3 transition-transform active:translate-x-0.5 active:translate-y-0.5"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-11 h-11 rounded-lg ${
                      item.bg || 'bg-tertiary-fixed'
                    } comic-border-2 comic-shadow-sm flex items-center justify-center shrink-0`}
                  >
                    <span
                      className={`material-symbols-outlined text-[24px] ${item.iconColor || 'text-tertiary'}`}
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {item.icon || 'water_drop'}
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-headline text-base text-on-surface leading-none">
                        {formatVolume(item.ml, userProfile.preferredUnit)}
                      </span>
                      <span className="bg-secondary-container text-on-surface font-body text-[9px] px-1 py-0.2 rounded font-bold uppercase">
                        {item.tag || 'DRINK'}
                      </span>
                    </div>
                    <span className="font-body text-xs font-bold text-on-surface truncate mt-0.5">
                      {item.name}
                    </span>
                    <span className="font-body text-[10px] text-outline uppercase font-medium">
                      {item.time} • {item.sub || 'Hydration'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    aria-label="Edit Entry"
                    onClick={() => handleEditItem(item)}
                    className="w-8 h-8 rounded comic-border-2 bg-surface-container hover:bg-secondary-container flex items-center justify-center text-on-surface cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                  </button>
                  <button
                    type="button"
                    aria-label="Delete Entry"
                    onClick={() => deleteDrink(item.id, selectedDateKey)}
                    className="w-8 h-8 rounded comic-border-2 bg-surface-container hover:bg-error-container hover:text-on-error-container flex items-center justify-center text-on-surface cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Sticky Retro Action Button: + LOG PAST DRINK */}
      <div className="sticky bottom-20 w-full pt-1 z-30">
        <button
          type="button"
          onClick={() => {
            hydraAudio.playPop();
            setIsLogModalOpen(true);
          }}
          className="w-full h-14 bg-secondary-container hover:bg-secondary-fixed text-on-surface comic-border comic-shadow-md rounded-xl font-headline text-base uppercase tracking-wide flex items-center justify-center gap-2 transition-transform active:translate-x-1 active:translate-y-1 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[26px] font-bold">add_circle</span>
          + LOG PAST DRINK
        </button>
      </div>

      {/* Modal: Log Past Drink */}
      {isLogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-surface-container-lowest comic-border comic-shadow-md rounded-xl p-4 flex flex-col gap-3 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-2xl font-bold">local_drink</span>
                <h3 className="font-headline text-base uppercase tracking-wide">QUICK LOG DRINK</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsLogModalOpen(false)}
                className="w-8 h-8 rounded comic-border-2 bg-surface-container hover:bg-error hover:text-white flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            {/* Delulu check banner */}
            <div className="bg-secondary-container/90 comic-border-2 rounded-lg p-2 text-center text-on-surface flex items-center justify-center gap-1.5 shadow-sm">
              <span className="material-symbols-outlined text-[18px] text-primary shrink-0">psychology_alt</span>
              <span className="font-body text-[10px] font-bold uppercase tracking-tight">
                REALITY CHECK: THINKING ICED LATTE COUNTS AS WATER IS PURE DELULU! 🙅‍♂️
              </span>
            </div>

            <form onSubmit={handleLogPastDrinkSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="font-body text-xs uppercase font-bold text-on-surface">DRINK TYPE</label>
                <select
                  value={modalDrinkType}
                  onChange={(e) => setModalDrinkType(e.target.value)}
                  className="w-full comic-border-2 rounded-lg p-2 font-body text-xs bg-surface font-bold text-on-surface focus:outline-none"
                >
                  <option value="Plain Water">💧 Plain Water</option>
                  <option value="Sparkling Water">🫧 Sparkling Water</option>
                  <option value="Electrolyte Hydration">⚡ Electrolyte Drink</option>
                  <option value="Green Tea">🍵 Green Tea</option>
                  <option value="Chamomile Tea">🌼 Chamomile Tea</option>
                  <option value="Cold Brew Coffee">☕ Iced Americano</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-body text-xs uppercase font-bold text-on-surface">AMOUNT (ML)</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[250, 350, 500, 750].map((ml) => (
                    <button
                      key={ml}
                      type="button"
                      onClick={() => setModalAmount(ml)}
                      className={`comic-border-2 rounded-lg py-1.5 font-bold font-headline text-sm ${
                        modalAmount === ml ? 'bg-secondary-container text-on-surface' : 'bg-surface text-on-surface'
                      }`}
                    >
                      {ml}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  value={modalAmount}
                  onChange={(e) => setModalAmount(Number(e.target.value))}
                  className="w-full comic-border-2 rounded-lg p-2 text-center font-headline text-lg bg-surface mt-1 focus:outline-none"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-body text-xs uppercase font-bold text-on-surface">TIME</label>
                <input
                  type="time"
                  value={modalTime}
                  onChange={(e) => setModalTime(e.target.value)}
                  className="w-full comic-border-2 rounded-lg p-2 font-body text-sm bg-surface font-bold text-center focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full h-12 bg-secondary-container hover:bg-secondary-fixed text-on-surface comic-border comic-shadow-sm rounded-lg font-headline text-sm uppercase tracking-wide flex items-center justify-center gap-2 mt-2 cursor-pointer"
              >
                <span className="material-symbols-outlined font-bold">bolt</span> LET HIM COOK ⚡ LOG TO ARCHIVE
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
