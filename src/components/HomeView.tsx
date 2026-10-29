import React, { useState } from 'react';
import { useHydration } from '../context/HydrationContext.js';
import {
  calculateDailyTotal,
  calculatePercentage,
  getCalloutBadge,
  MASCOT_QUOTES,
  formatVolume
} from '../utils/hydration.js';
import { hydraAudio } from '../utils/audio.js';

export const HomeView: React.FC = () => {
  const {
    todayRecord,
    todayKey,
    addDrink,
    undoLastDrink,
    deleteDrink,
    resetDay,
    toast,
    nextAlertMinutes,
    snoozeAlert,
    acknowledgeAlert,
    skipAlert,
    streak,
    userProfile,
    triggerToast
  } = useHydration();

  const [mascotQuoteIndex, setMascotQuoteIndex] = useState(0);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Custom modal inputs
  const [customMl, setCustomMl] = useState(300);
  const [customType, setCustomType] = useState('Mineral Water');

  const totalMl = calculateDailyTotal(todayRecord.drinks);
  const goalMl = todayRecord.goal || 2500;
  const percent = calculatePercentage(totalMl, goalMl, true);
  const remainingMl = Math.max(0, goalMl - totalMl);
  const callout = getCalloutBadge(percent, totalMl);

  const cycleMascot = () => {
    setMascotQuoteIndex((prev) => (prev + 1) % MASCOT_QUOTES.length);
    hydraAudio.playPop();
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(customMl) || 250;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    addDrink(
      {
        time: timeStr,
        name: customType,
        ml: amount,
        tag: 'CUSTOM',
        sub: 'Hydration Intake',
        icon: customType.includes('Tea') ? 'emoji_food_beverage' : customType.includes('Electrolyte') ? 'bolt' : 'water_drop',
        bg: 'bg-secondary-container',
        iconColor: 'text-on-surface'
      },
      todayKey
    );

    setIsCustomModalOpen(false);
    setCustomMl(300);
  };

  return (
    <div className="flex flex-col w-full gap-4 pb-28 pt-20 max-w-md mx-auto px-4 select-none">
      {/* Toast Alert Banner */}
      {toast && (
        <div className="transition-all transform duration-300 w-full bg-secondary-container text-on-secondary-container comic-border comic-shadow-md rounded-xl p-3 flex items-center justify-between z-30 animate-bounce">
          <div className="flex items-center gap-2">
            <span className="bg-error text-on-error font-headline text-sm px-2 py-0.5 rounded comic-border rotate-[-4deg]">
              SPLASH!
            </span>
            <span className="font-body text-xs uppercase font-black text-on-surface tracking-wide">
              {toast.text}
            </span>
          </div>
          <span className="material-symbols-outlined text-on-surface text-[22px]">verified</span>
        </div>
      )}

      {/* Section 1: Mascot Motivation & Comic Streak Badge */}
      <div className="relative w-full flex items-start justify-between gap-3 pt-1">
        {/* Speech Dialogue Balloon */}
        <button
          type="button"
          onClick={cycleMascot}
          className="relative flex-1 bg-surface-container-lowest comic-border comic-shadow-md rounded-xl p-3 text-left hover:scale-[1.01] transition-transform cursor-pointer"
        >
          <div className="flex items-center gap-1.5 mb-1">
            <span className="bg-secondary-container text-on-surface font-body text-[10px] px-1.5 py-0.5 rounded comic-border-2 uppercase rotate-[-2deg] font-bold">
              HYDRO-BOT VIBE CHECK
            </span>
            <span className="material-symbols-outlined text-tertiary-container text-base">electric_bolt</span>
          </div>
          <p className="font-body text-xs text-on-surface uppercase leading-tight font-extrabold">
            {MASCOT_QUOTES[mascotQuoteIndex]}
          </p>
          {/* Comic Bubble Vector Tail Pointing Down/Left */}
          <div className="absolute -bottom-2.5 left-6 w-3.5 h-3.5 bg-surface-container-lowest comic-border-2 border-t-0 border-r-0 rotate-[-45deg]" />
        </button>

        {/* Comic Streak Starburst Sticker */}
        <button
          type="button"
          onClick={() => {
            hydraAudio.playPop();
            triggerToast(`STREAK: ${streak} DAYS UNSTOPPABLE!`);
          }}
          className="shrink-0 flex flex-col items-center justify-center p-2 bg-secondary-container comic-border comic-shadow-md rounded-lg rotate-3 active:rotate-0 transition-transform cursor-pointer"
        >
          <span className="font-headline text-sm text-on-surface uppercase leading-none">STREAK</span>
          <div className="flex items-center gap-0.5 my-0.5">
            <span className="font-headline text-2xl text-on-surface leading-none font-bold">{streak}</span>
            <span className="text-sm">🔥</span>
          </div>
          <span className="font-body text-[9px] font-bold bg-surface-container-lowest text-on-surface comic-border-2 px-1 rounded uppercase tracking-wider">
            HYDRATED ERA
          </span>
        </button>
      </div>

      {/* Mascot Visual Anchor Row */}
      <div className="flex items-center gap-3 -mt-1 pl-1">
        <div className="w-11 h-11 rounded-full comic-border-2 comic-shadow-sm bg-tertiary-fixed flex items-center justify-center overflow-hidden shrink-0">
          <img
            alt="Hydro-Bot Mascot"
            className="w-full h-full object-contain p-0.5"
            src="/assets/aistudio/Image_5_944e23bb.jpeg"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-body text-[11px] uppercase text-on-surface-variant tracking-wider font-extrabold">
              TARGET PACE:
            </span>
            <span className="comic-border-2 px-1.5 py-0.5 rounded bg-surface-container-lowest font-body text-[10px] font-extrabold text-primary uppercase tracking-wide">
              LET HIM COOK ⚡ (OPTIMAL PACE)
            </span>
          </div>
        </div>
      </div>

      {/* Section 2: Hero Hydration Beaker Card */}
      <div
        className="relative w-full rounded-xl comic-border comic-shadow-md bg-primary-container text-on-primary p-4 overflow-hidden"
        style={{
          backgroundImage: 'radial-gradient(#002db3 2px, transparent 2px)',
          backgroundSize: '14px 14px'
        }}
      >
        <div className="flex items-center justify-between gap-2 mb-3 relative z-20">
          <div className="inline-flex items-center gap-1.5 bg-surface-container-lowest text-on-surface comic-border-2 comic-shadow-sm px-2.5 py-1 rounded uppercase font-body text-xs rotate-[-1deg]">
            <span className="material-symbols-outlined text-primary text-[16px]">water_full</span>
            <span className="font-bold tracking-wide">VOLUME SURGE</span>
          </div>
          <div className="comic-border comic-shadow-sm bg-secondary-container text-on-surface px-3 py-1 rounded-lg rotate-[-2deg] select-none shadow-md">
            <span className="font-headline text-sm uppercase tracking-wide font-bold">
              {percent}% HYDRATED
            </span>
          </div>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Volumetric Beaker Container */}
          <div className="relative w-40 h-56 comic-border bg-surface-container-lowest comic-shadow-md rounded-2xl overflow-hidden flex flex-col justify-end p-0 border-[3px] border-on-surface select-none shrink-0">
            {/* Tick Mark Levels */}
            <div className="absolute inset-y-2 left-2 z-30 flex flex-col justify-between text-on-surface font-body text-[10px] font-bold pointer-events-none select-none">
              <span className="flex items-center gap-1 leading-none">
                <span className="w-3 border-b-2 border-on-surface block" />2500
              </span>
              <span className="flex items-center gap-1 leading-none">
                <span className="w-2 border-b border-on-surface opacity-70 block" />2000
              </span>
              <span className="flex items-center gap-1 leading-none">
                <span className="w-3 border-b-2 border-on-surface block" />1500
              </span>
              <span className="flex items-center gap-1 leading-none">
                <span className="w-2 border-b border-on-surface opacity-70 block" />1000
              </span>
              <span className="flex items-center gap-1 leading-none">
                <span className="w-3 border-b-2 border-on-surface block" />500
              </span>
              <span className="flex items-center gap-1 leading-none">
                <span className="w-3 border-b-2 border-on-surface block" />0 ML
              </span>
            </div>

            {/* Specular highlights */}
            <div className="absolute top-2 right-3 bottom-2 w-2 rounded-full bg-white opacity-40 z-30 pointer-events-none" />
            <div className="absolute top-6 right-5 w-1.5 h-10 rounded-full bg-white opacity-50 z-30 pointer-events-none rotate-12" />

            {/* Fluid Column with dynamic height */}
            <div
              className="relative w-full transition-all duration-700 ease-out flex flex-col justify-start z-10"
              style={{
                height: `${percent === 0 ? 0 : Math.min(96, Math.max(12, percent))}%`,
                background: 'linear-gradient(rgb(41, 219, 231) 0%, rgb(0, 60, 215) 100%)'
              }}
            >
              {/* Wave crest */}
              <div className="absolute -top-3 left-0 w-[200%] h-4 overflow-hidden pointer-events-none z-20">
                <svg className="w-full h-full text-tertiary-fixed fill-current" preserveAspectRatio="none" viewBox="0 0 1200 40">
                  <path d="M0,20 C150,40 350,0 500,20 C650,40 850,0 1000,20 C1150,40 1350,0 1500,20 L1500,40 L0,40 Z" />
                </svg>
              </div>

              {/* Bouncing Bubbles */}
              <div className="absolute bottom-3 right-5 w-4 h-4 rounded-full bg-white opacity-75 comic-border-2 animate-bounce" />
              <div className="absolute bottom-10 left-12 w-2.5 h-2.5 rounded-full bg-white opacity-70 comic-border-2" />
              <div className="absolute bottom-20 right-8 w-3 h-3 rounded-full bg-white opacity-85 comic-border-2" />
            </div>
          </div>

          {/* Right Metrics & Details */}
          <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left z-20 w-full">
            <div className="flex items-baseline gap-1.5 my-1">
              <span className="font-headline text-4xl uppercase text-white tracking-normal leading-none drop-shadow-[3px_3px_0px_#171717]">
                {totalMl.toLocaleString()}
              </span>
              <span className="font-headline text-xl uppercase text-secondary-container drop-shadow-[2px_2px_0px_#171717]">
                {userProfile.preferredUnit === 'fl_oz' ? 'FL OZ' : 'ML'}
              </span>
            </div>

            {/* Comic status badge */}
            <div
              className={`comic-border-2 px-2 py-0.5 rounded font-body text-xs font-black uppercase shadow-sm mb-1 ${callout.bgClass} ${callout.textClass} ${callout.rotateClass}`}
            >
              {callout.title} ⚡
            </div>

            <div className="bg-surface-container-lowest text-on-surface comic-border-2 px-2.5 py-1 rounded-md font-body text-xs font-bold uppercase tracking-wide shadow-sm my-1 inline-block">
              GOAL: {formatVolume(goalMl, userProfile.preferredUnit)} • ({formatVolume(remainingMl, userProfile.preferredUnit)} TO GO)
            </div>

            <div className="text-white font-body text-[11px] font-bold uppercase tracking-wide drop-shadow-[2px_2px_0px_#171717] mt-1">
              {percent >= 100
                ? 'God-tier hydration achieved! 👑 Cells floating in victory.'
                : totalMl > 0
                ? 'Officially in your hydrated era. Keep chugging!'
                : 'Zero hydration detected. First gulp unlocks main character aura!'}
            </div>

            {/* Mini Progress Bar */}
            <div className="w-full mt-2 bg-surface-container-lowest comic-border-2 rounded-lg p-1.5 comic-shadow-sm flex items-center gap-2">
              <div className="w-full bg-surface-container rounded h-3 overflow-hidden comic-border-2 flex">
                <div
                  className="h-full bg-secondary-container transition-all duration-500 ease-out"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="font-body text-xs text-on-surface font-bold min-w-[34px] text-right">
                {percent}%
              </span>
            </div>

            {/* Undo & Reset buttons */}
            <div className="flex items-center gap-2 mt-3 w-full justify-center sm:justify-start">
              <button
                type="button"
                onClick={() => undoLastDrink(todayKey)}
                className="flex-1 max-w-[130px] h-10 inline-flex items-center justify-center gap-1.5 px-3 py-2 comic-border-2 bg-surface-container-lowest text-on-surface comic-shadow-sm rounded-lg font-body text-xs font-extrabold uppercase tracking-wide active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">undo</span>
                <span>UNDO SIP</span>
              </button>
              <button
                type="button"
                onClick={() => setIsResetModalOpen(true)}
                className="flex-1 max-w-[130px] h-10 inline-flex items-center justify-center gap-1.5 px-3 py-2 comic-border-2 bg-surface-container-lowest text-error comic-shadow-sm rounded-lg font-body text-xs font-extrabold uppercase tracking-wide active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">restart_alt</span>
                <span>RESET</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Quick-Sip Stamp Matrix */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]">local_cafe</span>
            <h2 className="font-headline text-lg uppercase text-on-surface tracking-wide">
              QUICK-SIP STAMP MATRIX
            </h2>
          </div>
          <span className="font-body text-[10px] uppercase bg-surface-container-high px-2 py-0.5 rounded font-extrabold text-on-surface-variant">
            TAP TO GULP
          </span>
        </div>

        {/* 4 Quick Stamps */}
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {/* +150 ML */}
          <button
            type="button"
            onClick={() =>
              addDrink(
                {
                  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  name: 'Espresso Quickie',
                  ml: 150,
                  tag: 'VALID SIP',
                  sub: 'Shot / Mini Cup',
                  icon: 'coffee',
                  bg: 'bg-tertiary-fixed',
                  iconColor: 'text-tertiary'
                },
                todayKey
              )
            }
            className="group relative flex flex-col items-center justify-center p-3 rounded-xl comic-border comic-shadow-md active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer text-on-surface"
            style={{ backgroundColor: 'rgb(41, 219, 231)' }}
          >
            <span className="absolute top-1 right-1.5 font-body text-[9px] font-bold bg-surface-container-lowest text-on-surface px-1 rounded comic-border-2">
              VALID SIP
            </span>
            <span className="material-symbols-outlined text-[28px] group-hover:scale-110 transition-transform">
              coffee
            </span>
            <span className="font-headline text-lg uppercase mt-1 leading-none">+150 ML</span>
            <span className="font-body text-[10px] uppercase font-bold text-on-surface opacity-80 mt-0.5">
              Espresso Quickie
            </span>
          </button>

          {/* +250 ML */}
          <button
            type="button"
            onClick={() =>
              addDrink(
                {
                  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  name: 'Crisp H2O',
                  ml: 250,
                  tag: "BUSSIN' FR",
                  sub: 'Pure Clean Water',
                  icon: 'water_full',
                  bg: 'bg-secondary-container',
                  iconColor: 'text-secondary'
                },
                todayKey
              )
            }
            className="group relative flex flex-col items-center justify-center p-3 rounded-xl comic-border comic-shadow-md active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer bg-secondary-container text-on-surface"
          >
            <span className="absolute top-1 right-1.5 font-body text-[9px] font-bold bg-error text-on-error px-1 rounded comic-border-2 rotate-2">
              BUSSIN' FR
            </span>
            <span className="material-symbols-outlined text-[28px] group-hover:scale-110 transition-transform">
              water_full
            </span>
            <span className="font-headline text-lg uppercase mt-1 leading-none">+250 ML</span>
            <span className="font-body text-[10px] uppercase font-bold text-on-surface opacity-80 mt-0.5">
              Crisp H2O
            </span>
          </button>

          {/* +350 ML */}
          <button
            type="button"
            onClick={() =>
              addDrink(
                {
                  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  name: 'Warm Brew',
                  ml: 350,
                  tag: 'ATE THAT',
                  sub: 'Large Ceramic Mug',
                  icon: 'emoji_food_beverage',
                  bg: 'bg-error-container',
                  iconColor: 'text-error'
                },
                todayKey
              )
            }
            className="group relative flex flex-col items-center justify-center p-3 rounded-xl comic-border comic-shadow-md active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer text-on-surface"
            style={{ backgroundColor: 'rgb(255, 218, 214)' }}
          >
            <span className="absolute top-1 right-1.5 font-body text-[9px] font-bold bg-surface-container-lowest text-on-surface px-1 rounded comic-border-2">
              ATE THAT
            </span>
            <span className="material-symbols-outlined text-[28px] group-hover:scale-110 transition-transform text-error">
              emoji_food_beverage
            </span>
            <span className="font-headline text-lg uppercase mt-1 leading-none text-on-surface">+350 ML</span>
            <span className="font-body text-[10px] uppercase font-bold text-on-surface opacity-80 mt-0.5">
              Warm Brew
            </span>
          </button>

          {/* +500 ML */}
          <button
            type="button"
            onClick={() =>
              addDrink(
                {
                  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  name: 'Gym Flask',
                  ml: 500,
                  tag: 'LOCK IN',
                  sub: 'Sport Flask Refill',
                  icon: 'fitness_center',
                  bg: 'bg-primary',
                  iconColor: 'text-primary'
                },
                todayKey
              )
            }
            className="group relative flex flex-col items-center justify-center p-3 rounded-xl comic-border comic-shadow-md active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer bg-primary text-on-primary"
          >
            <span className="absolute top-1 right-1.5 font-body text-[9px] font-bold bg-secondary-container text-on-surface px-1 rounded comic-border-2">
              LOCK IN
            </span>
            <span className="material-symbols-outlined text-[28px] text-tertiary-fixed group-hover:scale-110 transition-transform">
              fitness_center
            </span>
            <span className="font-headline text-lg uppercase mt-1 leading-none text-surface-container-lowest">
              +500 ML
            </span>
            <span className="font-body text-[10px] uppercase font-bold text-on-primary-container mt-0.5">
              Gym Flask
            </span>
          </button>
        </div>

        {/* Custom Volume Drawer Trigger */}
        <button
          type="button"
          onClick={() => {
            hydraAudio.playPop();
            setIsCustomModalOpen(true);
          }}
          className="w-full comic-border comic-shadow-md bg-surface-container-lowest text-on-surface py-2.5 px-4 rounded-xl flex items-center justify-between active:translate-x-0.5 active:translate-y-0.5 transition-transform cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary font-bold">add_circle</span>
            <span className="font-headline text-sm uppercase tracking-wide">ENTER CUSTOM LOG / BEVERAGE</span>
          </div>
          <span className="font-body text-[10px] bg-surface-variant text-on-surface-variant comic-border-2 px-2 py-0.5 rounded font-bold uppercase">
            CUSTOM +
          </span>
        </button>
      </div>

      {/* Section 4: Smart Reminder Action Panel */}
      <div className="relative w-full rounded-xl comic-border comic-shadow-md bg-secondary-container text-on-secondary-container p-3 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 rounded comic-border-2 bg-on-surface text-secondary-container flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[18px]">bolt</span>
            </div>
            <div>
              <span className="font-body text-[10px] uppercase font-bold tracking-wider text-on-surface opacity-80 leading-none block">
                RADAR DISPATCH
              </span>
              <span className="font-headline text-sm uppercase text-on-surface leading-tight">
                NEXT HYDRATION ALERT: HOURLY VIBE CHECK
              </span>
            </div>
          </div>
          <div className="bg-surface-container-lowest comic-border-2 px-2 py-1 rounded text-on-surface font-body text-xs font-bold uppercase shadow-sm">
            <span>3:45 PM</span> <span className="text-error font-bold">(IN {nextAlertMinutes} MINS)</span>
          </div>
        </div>

        <div className="font-body text-[11px] text-on-surface font-extrabold uppercase bg-surface-container-lowest comic-border-2 rounded-lg p-2 shadow-sm">
          That ice-cold water hits bussin' fr! No cap, your skin will thank you.
        </div>

        <div className="grid grid-cols-3 gap-2 mt-0.5">
          <button
            type="button"
            onClick={acknowledgeAlert}
            className="flex items-center justify-center gap-1 comic-border-2 bg-primary text-on-primary py-2 rounded-lg font-headline text-sm uppercase comic-shadow-sm active:translate-x-0.5 active:translate-y-0.5 transition-transform cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">check</span>
            <span>DRANK</span>
          </button>
          <button
            type="button"
            onClick={() => snoozeAlert(15)}
            className="flex items-center justify-center gap-1 comic-border-2 bg-surface-container-lowest text-on-surface py-2 rounded-lg font-body text-xs font-bold uppercase comic-shadow-sm active:translate-x-0.5 active:translate-y-0.5 transition-transform cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">snooze</span>
            <span>+15M</span>
          </button>
          <button
            type="button"
            onClick={skipAlert}
            className="flex items-center justify-center gap-1 comic-border-2 bg-surface-container-high text-on-surface-variant py-2 rounded-lg font-body text-xs font-bold uppercase comic-shadow-sm active:translate-x-0.5 active:translate-y-0.5 transition-transform cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
            <span>SKIP</span>
          </button>
        </div>

        <div className="flex items-center justify-between bg-surface-container-lowest comic-border-2 rounded-lg px-2.5 py-1 text-on-surface-variant font-body text-[10px] font-bold uppercase">
          <div className="flex items-center gap-1">
            <span>🌙</span>
            <span>SLEEP SHIELD ACTIVE</span>
          </div>
          <span className="text-primary font-bold">10:30 PM — 7:00 AM</span>
        </div>
      </div>

      {/* Section 5: Today's Comic Notebook Water Timeline */}
      <div className="w-full flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-on-surface text-[20px]">menu_book</span>
            <h3 className="font-headline text-base uppercase text-on-surface tracking-wide">
              TODAY'S COMIC INTAKE CHRONICLE
            </h3>
          </div>
          <span className="bg-primary text-on-primary comic-border-2 px-2 py-0.5 rounded font-body text-[10px] font-bold">
            {todayRecord.drinks.length} SIPS LOGGED
          </span>
        </div>

        <div className="comic-border comic-shadow-md rounded-xl bg-surface-container-lowest p-3 flex flex-col divide-y-2 divide-on-surface/10">
          <div className="flex flex-col gap-2">
            {todayRecord.drinks.length === 0 ? (
              <div className="py-4 px-2 text-center rounded-lg comic-border-2 bg-secondary-container/30 border-dashed border-on-surface">
                <div className="font-headline text-base uppercase text-on-surface mb-0.5">
                  NO SIPS YET TODAY • TIME TO LOCK IN!
                </div>
                <div className="font-body text-[10px] font-bold uppercase text-on-surface-variant tracking-wider">
                  TAP A QUICK-SIP STAMP TO CHUG YOUR FIRST GLASS! ⚡
                </div>
              </div>
            ) : (
              todayRecord.drinks.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-container transition-colors comic-border-2 bg-surface"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded comic-border-2 bg-secondary-container text-on-surface flex items-center justify-center font-bold">
                      <span className="material-symbols-outlined text-[18px]">{item.icon || 'water_drop'}</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="font-headline text-sm uppercase text-on-surface">
                          {formatVolume(item.ml, userProfile.preferredUnit)}
                        </span>
                        <span className="bg-secondary-container text-on-surface font-body text-[9px] px-1 rounded comic-border-2 font-bold uppercase">
                          {item.tag || 'SIP'}
                        </span>
                      </div>
                      <span className="font-body text-[10px] text-on-surface-variant font-bold">
                        {item.time} • {item.name}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteDrink(item.id, todayKey)}
                    className="text-on-surface-variant hover:text-error p-1 comic-border-2 rounded bg-surface-container-lowest active:translate-x-0.5 active:translate-y-0.5 transition-transform"
                    title="Remove Entry"
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="pt-2 mt-2 flex items-center justify-between text-on-surface-variant font-body text-[10px]">
            <span className="flex items-center gap-1 font-bold text-on-surface">
              <span className="w-2 h-2 rounded-full bg-secondary-container" />
              NO CAP: THINKING ICED LATTE COUNTS AS WATER IS PURE DELULU.
            </span>
            <button
              type="button"
              onClick={() => triggerToast('📸 EXPORTING HYDRATION LOG STRIP... POW!')}
              className="text-primary font-bold uppercase underline shrink-0 cursor-pointer"
            >
              EXPORT STRIP
            </button>
          </div>
        </div>
      </div>

      {/* Modal: Custom Water Dosage */}
      {isCustomModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-sm comic-border comic-shadow-md bg-surface-container-lowest rounded-xl p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between pb-1 border-b-2 border-on-surface">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[22px]">local_drink</span>
                <span className="font-headline text-base uppercase text-on-surface">CUSTOM WATER DOSAGE</span>
              </div>
              <button
                type="button"
                onClick={() => setIsCustomModalOpen(false)}
                className="w-7 h-7 comic-border-2 rounded bg-surface-container flex items-center justify-center font-bold text-on-surface"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCustomSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="font-body text-xs uppercase text-on-surface font-bold">
                  Volume Amount (ML):
                </label>
                <input
                  type="number"
                  min="50"
                  max="2000"
                  step="50"
                  value={customMl}
                  onChange={(e) => setCustomMl(Number(e.target.value))}
                  className="w-full comic-border-2 px-3 py-2 text-headline text-base text-on-surface bg-surface rounded focus:outline-none"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-body text-xs uppercase text-on-surface font-bold">
                  Fluid Category:
                </label>
                <select
                  value={customType}
                  onChange={(e) => setCustomType(e.target.value)}
                  className="w-full comic-border-2 px-3 py-2 font-body text-xs uppercase text-on-surface bg-surface rounded font-bold"
                >
                  <option value="Mineral Water">⚡ Mineral Water</option>
                  <option value="Electrolytes">🔥 Electrolyte Blend</option>
                  <option value="Iced Herbal Tea">🌿 Iced Herbal Tea</option>
                  <option value="Sparkling Citrus">🍋 Sparkling Citrus</option>
                  <option value="Coconut Water">🥥 Coconut Water</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-1">
                <button
                  type="submit"
                  className="w-full comic-border-2 comic-shadow-sm bg-primary text-on-primary py-2.5 rounded-lg font-headline text-sm uppercase active:translate-x-0.5 active:translate-y-0.5 transition-transform"
                >
                  LOG INTAKE!
                </button>
                <button
                  type="button"
                  onClick={() => setIsCustomModalOpen(false)}
                  className="w-full comic-border-2 comic-shadow-sm bg-surface-container text-on-surface py-2.5 rounded-lg font-headline text-sm uppercase active:translate-x-0.5 active:translate-y-0.5 transition-transform"
                >
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Confirm Reset */}
      {isResetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-xs comic-border comic-shadow-md bg-surface-container-lowest rounded-xl p-4 flex flex-col gap-3 text-center">
            <div className="flex justify-center -mt-8">
              <div className="w-14 h-14 rounded-full comic-border-2 comic-shadow-sm bg-secondary-container flex items-center justify-center text-error">
                <span className="material-symbols-outlined text-[32px]">warning</span>
              </div>
            </div>
            <span className="font-headline text-lg uppercase text-on-surface">PURGE FLUID TANK?</span>
            <p className="font-body text-xs text-on-surface-variant font-bold uppercase leading-tight">
              This will reset your intake back to 0 ML and clear today's intake chronicle logs!
            </p>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <button
                type="button"
                onClick={() => {
                  resetDay(todayKey);
                  setIsResetModalOpen(false);
                }}
                className="comic-border-2 comic-shadow-sm bg-error text-on-error py-2 rounded-lg font-headline text-sm uppercase active:translate-x-0.5 active:translate-y-0.5 transition-transform cursor-pointer"
              >
                RESET 0 ML!
              </button>
              <button
                type="button"
                onClick={() => setIsResetModalOpen(false)}
                className="comic-border-2 comic-shadow-sm bg-surface-container text-on-surface py-2 rounded-lg font-headline text-sm uppercase active:translate-x-0.5 active:translate-y-0.5 transition-transform cursor-pointer"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
