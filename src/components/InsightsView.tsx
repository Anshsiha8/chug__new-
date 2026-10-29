import React, { useState } from 'react';
import { useHydration } from '../context/HydrationContext.js';
import { TimeframeType } from '../types/hydration.js';
import { hydraAudio } from '../utils/audio.js';

export const InsightsView: React.FC = () => {
  const { triggerToast, streak } = useHydration();
  const [timeframe, setTimeframe] = useState<TimeframeType>('month');

  const handleShare = async () => {
    hydraAudio.playPop();
    const text = `⚡ CHUG! BATTLE LOG: 2,420 ML/Day avg, ${streak}-Day Streak, 86% Hit Rate. In my Hydrated Era! 💧`;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      }
    } catch {}
    triggerToast('⚡ BATTLE LOG COPIED TO CLIPBOARD!');
  };

  return (
    <div className="flex flex-col w-full gap-4 pb-28 pt-20 max-w-md mx-auto px-4 select-none">
      {/* Interactive Filter Tabs */}
      <div className="flex items-center justify-between gap-2 bg-surface-container p-1.5 rounded-lg comic-shadow-sm comic-border">
        {(['week', 'month', 'all'] as TimeframeType[]).map((tab) => {
          const isActive = timeframe === tab;
          const label = tab === 'week' ? 'Weekly' : tab === 'month' ? 'Monthly' : 'All-Time';
          return (
            <button
              key={tab}
              type="button"
              onClick={() => {
                hydraAudio.playPop();
                setTimeframe(tab);
              }}
              className={`flex-1 py-1.5 px-2 rounded font-body text-xs uppercase transition-transform active:translate-x-0.5 active:translate-y-0.5 cursor-pointer font-bold ${
                isActive
                  ? 'bg-secondary-container text-on-surface comic-shadow-sm comic-border-2'
                  : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Hero Insight Banner with Comic Bubble */}
      <div className="relative bg-surface-container-lowest comic-border comic-shadow-md rounded-xl p-4 overflow-hidden">
        <div
          className="absolute -right-6 -bottom-6 w-28 h-28 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#171717 2px, transparent 2px)',
            backgroundSize: '8px 8px'
          }}
        />
        <div className="flex items-start gap-3">
          <div className="relative shrink-0">
            <div className="w-12 h-12 bg-secondary-container rounded-full comic-border comic-shadow-sm flex items-center justify-center rotate-[-4deg]">
              <span
                className="material-symbols-outlined text-primary text-[28px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                bolt
              </span>
            </div>
            <div className="absolute -top-1 -right-1 bg-primary text-on-primary font-body text-[9px] font-black px-1 py-0.5 rounded-full comic-border-2">
              LVL 4
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="inline-block bg-tertiary text-surface-container-lowest font-bold font-body text-[10px] uppercase px-2 py-0.5 rounded comic-border-2 mb-1">
              VIBE CHECK #07
            </div>
            <h2 className="font-headline text-base uppercase text-on-surface leading-tight">
              LEVEL UP YOUR DRIP: 2L GOAL REACHED
            </h2>
            <p className="font-body text-xs text-on-surface-variant mt-0.5 leading-snug">
              Glowing with hydrated main character energy!{' '}
              <span className="font-bold text-primary underline decoration-2">
                You ate that and left zero crumbs
              </span>{' '}
              in Sector 4. Keep cooking!
            </p>
          </div>
        </div>
      </div>

      {/* Top KPI Bento Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Weekly Avg Card (Cobalt Primary) */}
        <div className="col-span-2 relative bg-primary-container text-on-primary comic-border comic-shadow-md rounded-xl p-4 overflow-hidden">
          <div className="absolute right-2 top-2 opacity-15 pointer-events-none">
            <span className="material-symbols-outlined text-[80px]">water_full</span>
          </div>
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="font-body text-[9px] uppercase tracking-wider text-on-primary-container bg-primary px-2 py-0.5 rounded comic-border-2 inline-block w-fit mb-1 font-bold">
                3 SIPS AWAY FROM YOUR GOAL. LET HIM COOK ⚡
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-headline text-4xl uppercase tracking-tight text-white leading-none">
                  2,420
                </span>
                <span className="font-headline text-base uppercase text-secondary-container">ML/DAY</span>
              </div>
            </div>

            {/* Target Badge */}
            <div className="bg-secondary-container text-on-surface comic-border-2 comic-shadow-sm px-2 py-1 rounded text-center rotate-2 shrink-0">
              <span className="font-body text-[9px] block uppercase leading-none font-bold">TARGET</span>
              <span className="font-headline text-base leading-none">97%</span>
            </div>
          </div>

          {/* Mini Progress Track */}
          <div className="w-full bg-primary h-3 rounded-full comic-border-2 mt-3 overflow-hidden flex">
            <div
              className="bg-secondary-container h-full transition-all duration-500 rounded-full"
              style={{ width: '97%' }}
            />
          </div>
        </div>

        {/* Streak Metric */}
        <div className="relative bg-surface-container-lowest comic-border comic-shadow-md rounded-xl p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-body text-[10px] uppercase text-on-surface-variant font-bold">Streak</span>
            <span
              className="material-symbols-outlined text-secondary-container text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_fire_department
            </span>
          </div>
          <div className="my-1">
            <span className="font-headline text-2xl text-on-surface leading-none block">{streak} DAYS</span>
          </div>
          <div className="bg-secondary-container text-on-surface font-body text-[9px] font-bold uppercase comic-border-2 px-1.5 py-0.5 rounded-sm inline-block self-start rotate-[-3deg] comic-shadow-sm">
            UNSTOPPABLE!
          </div>
        </div>

        {/* Completion Rate Metric */}
        <div className="relative bg-surface-container-lowest comic-border comic-shadow-md rounded-xl p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-body text-[10px] uppercase text-on-surface-variant font-bold">Hit Rate</span>
            <span className="material-symbols-outlined text-tertiary-container text-[20px]">verified</span>
          </div>
          <div className="my-1">
            <span className="font-headline text-2xl text-primary leading-none block">86%</span>
          </div>
          <div className="bg-tertiary-fixed text-on-tertiary-fixed font-body text-[9px] font-bold uppercase comic-border-2 px-1.5 py-0.5 rounded-sm inline-block self-start rotate-[2deg] comic-shadow-sm">
            GOAL SLAYED FR
          </div>
        </div>

        {/* Best Record Card */}
        <div className="col-span-2 bg-surface-container-low comic-border comic-shadow-sm rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary-fixed rounded comic-border-2 comic-shadow-sm flex items-center justify-center rotate-[-2deg]">
              <span className="material-symbols-outlined text-on-secondary-fixed text-[24px]">emoji_events</span>
            </div>
            <div>
              <span className="font-body text-[10px] uppercase text-on-surface-variant block leading-tight font-bold">
                High Water Mark
              </span>
              <span className="font-headline text-sm text-on-surface uppercase">
                Thursday (2,850 ML)
              </span>
            </div>
          </div>
          <span className="font-body text-[9px] font-bold bg-secondary-container text-surface-container-lowest px-2 py-1 rounded comic-border-2 uppercase whitespace-nowrap">
            GOAT SIPPER
          </span>
        </div>
      </div>

      {/* Weekly Intake Pop-Art Bar Chart */}
      <div className="bg-surface-container-lowest comic-border comic-shadow-md rounded-xl p-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col gap-0.5">
            <div className="bg-secondary-container text-surface-container-lowest font-bold font-body text-[9px] px-2 py-0.5 rounded comic-border-2 inline-block w-fit uppercase mb-0.5">
              VALID SIP FREQUENCY
            </div>
            <h3 className="font-headline text-base uppercase text-on-surface leading-tight">
              WEEKLY BATTLE LOG
            </h3>
          </div>
          <span className="font-body text-[10px] font-bold uppercase text-on-surface bg-surface-container-high px-2 py-1 rounded comic-border-2 whitespace-nowrap shrink-0">
            OCT 14 - 20
          </span>
        </div>

        {/* The Chart Panel */}
        <div className="relative w-full h-56 pt-6 pb-2 flex items-end justify-between px-1">
          {/* Mon */}
          <div className="flex flex-col items-center flex-1 h-full justify-end group cursor-pointer">
            <div className="relative w-7 sm:w-8 bg-secondary-fixed comic-border-2 comic-shadow-sm rounded-t-sm transition-transform active:scale-95" style={{ height: '66%' }}>
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-secondary-container text-on-surface font-body text-[8px] font-bold px-1 rounded-full comic-border-2">
                ★
              </div>
              <div className="w-full h-full opacity-20 halftone-dots" />
            </div>
            <span className="font-body text-[10px] font-bold uppercase mt-1 text-on-surface">MON</span>
          </div>

          {/* Tue */}
          <div className="flex flex-col items-center flex-1 h-full justify-end group cursor-pointer">
            <div className="relative w-7 sm:w-8 bg-tertiary-fixed-dim comic-border-2 comic-shadow-sm rounded-t-sm transition-transform active:scale-95" style={{ height: '58%' }}>
              <div className="w-full h-full opacity-20 halftone-dots" />
            </div>
            <span className="font-body text-[10px] font-bold uppercase mt-1 text-on-surface">TUE</span>
          </div>

          {/* Wed */}
          <div className="flex flex-col items-center flex-1 h-full justify-end group cursor-pointer">
            <div className="relative w-7 sm:w-8 bg-primary-container comic-border-2 comic-shadow-sm rounded-t-sm transition-transform active:scale-95" style={{ height: '74%' }}>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-error-container text-on-error-container font-headline text-[9px] px-1 rounded comic-border-2 rotate-[-4deg] whitespace-nowrap">
                POW!
              </div>
              <div className="w-full h-full opacity-20 halftone-dots-white" />
            </div>
            <span className="font-body text-[10px] font-bold uppercase mt-1 text-on-surface">WED</span>
          </div>

          {/* Thu */}
          <div className="flex flex-col items-center flex-1 h-full justify-end group cursor-pointer">
            <div className="relative w-7 sm:w-8 bg-secondary-container comic-border-2 comic-shadow-sm rounded-t-sm transition-transform active:scale-95" style={{ height: '78%' }}>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-on-primary font-headline text-[9px] px-1.5 py-0.5 rounded comic-border-2 rotate-6 whitespace-nowrap">
                MAX
              </div>
              <div className="w-full h-full opacity-20 halftone-dots" />
            </div>
            <span className="font-body text-[10px] font-extrabold uppercase mt-1 text-primary">THU</span>
          </div>

          {/* Fri */}
          <div className="flex flex-col items-center flex-1 h-full justify-end group cursor-pointer">
            <div className="relative w-7 sm:w-8 bg-tertiary-fixed-dim comic-border-2 comic-shadow-sm rounded-t-sm transition-transform active:scale-95" style={{ height: '63%' }}>
              <div className="w-full h-full opacity-20 halftone-dots" />
            </div>
            <span className="font-body text-[10px] font-bold uppercase mt-1 text-on-surface">FRI</span>
          </div>

          {/* Sat */}
          <div className="flex flex-col items-center flex-1 h-full justify-end group cursor-pointer">
            <div className="relative w-7 sm:w-8 bg-secondary-fixed-dim comic-border-2 comic-shadow-sm rounded-t-sm transition-transform active:scale-95" style={{ height: '55%' }}>
              <div className="w-full h-full opacity-20 halftone-dots" />
            </div>
            <span className="font-body text-[10px] font-bold uppercase mt-1 text-on-surface">SAT</span>
          </div>

          {/* Sun */}
          <div className="flex flex-col items-center flex-1 h-full justify-end group cursor-pointer">
            <div className="relative w-7 sm:w-8 bg-surface-container-high comic-border-2 comic-shadow-sm rounded-t-sm overflow-hidden" style={{ height: '38%' }}>
              <div
                className="absolute inset-0 bg-primary/20"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(0, 60, 215, 0.4) 4px, rgba(0, 60, 215, 0.4) 8px)'
                }}
              />
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-surface-container-lowest text-secondary font-bold font-body text-[8px] px-1 py-0.5 rounded comic-border-2 whitespace-nowrap z-30">
                DRIED SPONGE FR
              </div>
            </div>
            <span className="font-body text-[10px] font-extrabold uppercase mt-1 text-primary">SUN</span>
          </div>
        </div>

        {/* Chart Legend Footer */}
        <div className="flex items-center justify-around border-t-2 border-on-surface/10 pt-2 mt-2">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-secondary-container comic-border-2" />
            <span className="font-body text-[10px] font-bold uppercase text-on-surface-variant">
              Crushed (2.5k+)
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-tertiary-fixed-dim comic-border-2" />
            <span className="font-body text-[10px] font-bold uppercase text-on-surface-variant">
              Solid (&gt;2k)
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-surface-container-high comic-border-2" />
            <span className="font-body text-[10px] font-bold uppercase text-on-surface-variant">
              Active
            </span>
          </div>
        </div>
      </div>

      {/* 30-Day Stamp Sheet Heatmap */}
      <div className="bg-surface-container-lowest comic-border comic-shadow-md rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-col gap-0.5">
            <div className="bg-primary text-surface-container-lowest font-bold font-body text-[9px] px-2 py-0.5 rounded comic-border-2 inline-block w-fit uppercase mb-0.5">
              HABIT MATRIX
            </div>
            <h3 className="font-headline text-base uppercase text-on-surface leading-tight">
              30-DAY STAMP SHEET
            </h3>
          </div>
          <div className="font-body text-[10px] uppercase text-secondary font-bold bg-surface-container px-2 py-1 rounded comic-border-2 whitespace-nowrap shrink-0">
            26 / 30 ATE DOWN 🔥
          </div>
        </div>

        {/* Grid Matrix (7 Columns) */}
        <div className="grid grid-cols-7 gap-1.5 p-2 bg-surface-container rounded-lg comic-border">
          {/* Sample 30 items matching design */}
          {[
            '✓', '✓', '3', '✓', '✓', '6', '7',
            '✓', '✓', '✓', '11', '✓', '✓', '14',
            '15', '✓', '✓', '✓', '✓', '20', '✓',
            '✓', '23', '✓', '✓', '✓', '✓', '28',
            '✓', '★'
          ].map((val, idx) => {
            let bgClass = 'bg-secondary-container text-surface-container-lowest';
            if (val === '3' || val === '11' || val === '20') {
              bgClass = 'bg-primary-container text-white';
            } else if (val === '6' || val === '14' || val === '23') {
              bgClass = 'bg-tertiary-fixed-dim text-surface-container-lowest';
            } else if (val === '7' || val === '15' || val === '28') {
              bgClass = 'bg-surface-container-lowest text-on-surface';
            }

            return (
              <div
                key={idx}
                className={`aspect-square comic-border-2 rounded flex items-center justify-center font-body text-xs font-bold ${bgClass}`}
              >
                {val}
              </div>
            );
          })}
          {/* Fillers */}
          {[1, 2, 3, 4, 5].map((idx) => (
            <div key={`fill-${idx}`} className="aspect-square bg-surface-container-high comic-border-2 rounded opacity-40" />
          ))}
        </div>

        {/* Tiers Legend */}
        <div className="grid grid-cols-4 gap-1 mt-3 pt-2 border-t-2 border-on-surface/10 text-center font-body text-[10px]">
          <div className="flex flex-col items-center">
            <div className="w-3.5 h-3.5 bg-surface-container-lowest comic-border-2 mb-1" />
            <span className="text-on-surface-variant font-bold">&lt;1K ML</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-3.5 h-3.5 bg-tertiary-fixed-dim comic-border-2 mb-1" />
            <span className="text-on-surface-variant font-bold">1K-2K</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-3.5 h-3.5 bg-primary-container comic-border-2 mb-1" />
            <span className="text-on-surface-variant font-bold">2K-2.5K</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-3.5 h-3.5 bg-secondary-container comic-border-2 mb-1 flex items-center justify-center text-[8px] font-bold">
              ✓
            </div>
            <span className="text-on-surface font-bold">2.5K+ CRUSH</span>
          </div>
        </div>
      </div>

      {/* Beverage Breakdown */}
      <div className="bg-surface-container-lowest comic-border comic-shadow-md rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="bg-tertiary text-surface-container-lowest font-bold font-body text-[9px] px-2 py-0.5 rounded comic-border-2 inline-block uppercase mb-0.5">
              FLUID PURITY
            </div>
            <h3 className="font-headline text-base uppercase text-on-surface leading-tight">
              BEVERAGE SPLIT
            </h3>
          </div>
          <span className="material-symbols-outlined text-primary text-[28px]">local_bar</span>
        </div>

        {/* Stacked Gauge */}
        <div className="w-full h-8 comic-border-2 rounded flex overflow-hidden comic-shadow-sm mb-3">
          <div
            className="bg-primary-container flex items-center justify-center text-on-primary font-body text-xs font-bold border-r-2 border-on-surface"
            style={{ width: '75%' }}
          >
            75%
          </div>
          <div
            className="bg-tertiary-fixed-dim flex items-center justify-center text-on-surface font-body text-xs font-bold border-r-2 border-on-surface"
            style={{ width: '15%' }}
          >
            15%
          </div>
          <div
            className="bg-error-container flex items-center justify-center text-on-error-container font-body text-xs font-bold"
            style={{ width: '10%' }}
          >
            10%
          </div>
        </div>

        {/* Segment Labels */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-1.5 bg-surface-container rounded comic-border-2">
            <span className="font-body text-[9px] uppercase block text-primary font-bold">PURE WATER</span>
            <span className="font-headline text-sm text-on-surface leading-none">1,815 ML</span>
          </div>
          <div className="p-1.5 bg-surface-container rounded comic-border-2">
            <span className="font-body text-[9px] uppercase block text-tertiary font-bold">TEAS / HERBAL</span>
            <span className="font-headline text-sm text-on-surface leading-none">365 ML</span>
          </div>
          <div className="p-1.5 bg-surface-container rounded comic-border-2">
            <span className="font-body text-[9px] uppercase block text-error font-bold">ELECTROLYTES</span>
            <span className="font-headline text-sm text-on-surface leading-none">240 ML</span>
          </div>
        </div>

        {/* Comic Speech Bubble Tactical Tip */}
        <div className="relative mt-4 pt-1">
          <div className="absolute top-0 left-6 -translate-y-full w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-on-surface" />
          <div className="bg-secondary-container comic-border-2 comic-shadow-sm rounded-lg p-3 text-on-surface">
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[20px] text-surface-container-lowest shrink-0 mt-0.5">
                tips_and_updates
              </span>
              <div className="flex flex-col gap-1">
                <p className="font-body text-xs uppercase leading-snug font-bold text-surface-container-lowest">
                  DELULU CHECK: THINKING ICED LATTE COUNTS AS WATER IS PURE DELULU.
                </p>
                <p className="font-body text-xs uppercase leading-snug font-bold text-surface-container-lowest">
                  THAT 3:00 PM ICE-COLD WATER HITS BUSSIN' FR! STAY HYDRATED, BESTIE.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Stats Action Card */}
      <div className="bg-surface-container-high comic-border comic-shadow-md rounded-xl p-4 flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="font-headline text-base uppercase text-on-surface leading-tight">
            FLEX YOUR STATS!
          </span>
          <span className="font-body text-xs text-on-surface-variant font-bold text-primary">
            Goal slayed. See you tomorrow, bestie.
          </span>
        </div>
        <button
          type="button"
          onClick={handleShare}
          className="shrink-0 px-4 py-2 bg-primary text-on-primary font-headline text-sm uppercase comic-border-2 comic-shadow-sm rounded transition-transform active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-1 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">share</span>
          <span>SHARE</span>
        </button>
      </div>
    </div>
  );
};
