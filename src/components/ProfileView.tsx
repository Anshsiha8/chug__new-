import React, { useState } from 'react';
import { useHydration } from '../context/HydrationContext.js';
import { hydraAudio } from '../utils/audio.js';
import { ActivitySession } from '../types/hydration.js';

export const ProfileView: React.FC = () => {
  const {
    userProfile,
    setUserProfile,
    reminderSettings,
    setReminderSettings,
    activities,
    addActivity,
    updateActivity,
    deleteActivity,
    theme,
    toggleTheme,
    resetAllData,
    triggerToast,
    todayRecord,
    todayKey,
    setIsOnboardingOpen
  } = useHydration();

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [tempGoal, setTempGoal] = useState(todayRecord.goal || 2500);

  // Activity modal
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [editingActivityId, setEditingActivityId] = useState<string | null>(null);
  const [activityType, setActivityType] = useState('Running');
  const [activityName, setActivityName] = useState('Morning Trail Run');
  const [activityStart, setActivityStart] = useState('07:30');
  const [activityEnd, setActivityEnd] = useState('08:30');

  const handleInstallPwa = () => {
    hydraAudio.playPop();
    triggerToast('⚡ PWA READY! HOME SCREEN SHORTCUT GENERATED');
  };

  const handleSaveGoal = (e: React.FormEvent) => {
    e.preventDefault();
    todayRecord.goal = tempGoal;
    setIsGoalModalOpen(false);
    triggerToast(`UPDATED DAILY QUOTA: ${tempGoal.toLocaleString()} ML`);
    hydraAudio.playPop();
  };

  const handleSaveActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingActivityId) {
      updateActivity(editingActivityId, {
        type: activityType,
        customName: activityName || activityType,
        startTime: activityStart,
        endTime: activityEnd
      });
    } else {
      addActivity({
        type: activityType,
        customName: activityName || activityType,
        startTime: activityStart,
        endTime: activityEnd,
        daysOfWeek: ['Mon', 'Wed', 'Fri'],
        pauseReminders: true,
        resumeAfterActivity: true
      });
    }
    setIsActivityModalOpen(false);
    setEditingActivityId(null);
  };

  const handleOpenEditActivity = (act: ActivitySession) => {
    setEditingActivityId(act.id);
    setActivityType(act.type);
    setActivityName(act.customName);
    setActivityStart(act.startTime);
    setActivityEnd(act.endTime);
    setIsActivityModalOpen(true);
  };

  return (
    <div className="flex flex-col w-full gap-4 pb-28 pt-20 max-w-md mx-auto px-4 select-none">
      {/* Top Notification Banner / PWA Install */}
      <div className="w-full bg-secondary-container text-on-surface p-3 rounded-lg comic-border comic-shadow-sm flex items-center justify-between gap-3 rotate-[-1deg] transition-transform hover:rotate-0">
        <div className="flex items-center gap-2 min-w-0">
          <span className="material-symbols-outlined text-primary text-[24px] animate-bounce">
            install_mobile
          </span>
          <div className="flex flex-col min-w-0">
            <span className="font-headline text-sm uppercase tracking-wide leading-none truncate">
              PWA READY!
            </span>
            <span className="font-body text-[10px] uppercase tracking-wider text-on-surface-variant truncate font-bold">
              ADD TO HOMESCREEN FOR INSTANT POP SFX
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={handleInstallPwa}
          className="bg-primary text-on-primary font-body font-bold text-xs uppercase px-3 py-1.5 rounded comic-border-2 comic-shadow-sm active:translate-x-0.5 active:translate-y-0.5 shrink-0 cursor-pointer"
        >
          INSTALL
        </button>
      </div>

      {/* Section 1: Hero User Profile */}
      <section className="relative bg-surface-container-lowest rounded-xl p-4 comic-border comic-shadow-md">
        {/* Comic Sticker */}
        <div className="absolute -top-3.5 right-4 bg-secondary-container text-on-surface px-2.5 py-0.5 rounded comic-border-2 comic-shadow-sm rotate-[2.5deg] z-10 flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
            star
          </span>
          <span className="font-body text-[10px] uppercase tracking-wider font-extrabold">
            OFFICIALLY ENTERING MY HYDRATED ERA
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-1">
          {/* Avatar with Power Badge */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 rounded-full comic-border overflow-hidden bg-primary-fixed comic-shadow-sm relative z-0">
              <img
                alt="Alex Rivera Avatar"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-ua20YpWxt4HgkugZCskywBEdRyqErMEirHxAdwGToPk5hSsDvoT6s8L_jaxQ1aGed7vRHm6bv5oUlvinXEl-pE0XpYafAJTJh7xjrDNNlgfYn1LVSTA4WqomIUkaerDHBKuI07CS7Bi7jBWTy2YP9nhfTtYYvVYXF8vzC_1JAQ3q_JHtahqBQmWH7UAnhsw5XpSUFnGsLWJJPLCyE68s9ZcJpORZax1-qLjes89C7956L3x8U1bxcw"
              />
            </div>
            <div className="absolute -bottom-1 -left-2 bg-primary text-on-primary font-headline text-[11px] leading-tight px-1.5 py-0.5 rounded comic-border-2 comic-shadow-sm rotate-[-6deg] z-10">
              POWER: {userProfile.powerScore}%
            </div>
          </div>

          {/* Identity & Details */}
          <div className="flex flex-col text-center sm:text-left min-w-0 flex-1">
            <div className="flex items-center justify-center sm:justify-start gap-1.5">
              <h1 className="font-headline text-2xl uppercase tracking-wide text-on-surface m-0 leading-none">
                {userProfile.displayName}
              </h1>
              <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
              <span className="font-body text-[10px] text-on-surface-variant uppercase font-bold">
                AGE: {userProfile.age}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-outline" />
              <span className="font-body text-[10px] text-on-surface-variant uppercase font-bold">
                WEIGHT: {userProfile.weightKg} KG
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-outline" />
              <span className="font-body text-[10px] text-primary uppercase font-bold">
                {userProfile.title}
              </span>
            </div>

            {/* Speech Bubble */}
            <div className="relative mt-2.5 bg-surface-container-high rounded-lg p-2 px-3 comic-border-2 comic-shadow-sm text-left">
              <span className="font-body text-xs text-on-surface italic font-bold">
                {userProfile.motto}
              </span>
              <div className="absolute -top-2 left-6 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-surface-container-high" />
            </div>
          </div>
        </div>

        {/* Daily Target Pill Banner */}
        <div className="mt-4 pt-2 flex flex-wrap items-center justify-between gap-2 bg-surface-container-low rounded-lg p-3 comic-border-2">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center comic-border-2 comic-shadow-sm">
              <span className="material-symbols-outlined text-[20px]">water_drop</span>
            </div>
            <div className="flex flex-col">
              <span className="font-body text-[9px] text-on-surface-variant font-extrabold uppercase">
                LEVEL UP YOUR DRIP • DAILY QUOTA
              </span>
              <span className="font-headline text-base text-primary uppercase tracking-wide">
                {(todayRecord.goal || 2500).toLocaleString()} ML / DAY
              </span>
              <span className="font-body text-[9px] text-on-surface-variant uppercase font-bold">
                GOAL SLAYED. SEE YOU TOMORROW, BESTIE.
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setTempGoal(todayRecord.goal || 2500);
              setIsGoalModalOpen(true);
            }}
            className="bg-secondary-container text-on-secondary-container font-body font-bold text-xs uppercase px-3 py-1.5 rounded comic-border-2 comic-shadow-sm hover:bg-secondary-fixed transition-transform active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
          >
            EDIT GOAL
          </button>
        </div>
      </section>

      {/* Section 2: Smart Reminder Engine */}
      <section className="flex flex-col w-full bg-surface-container-lowest rounded-xl comic-border comic-shadow-md overflow-hidden">
        {/* Header Bar */}
        <div className="bg-primary p-3 px-4 flex items-center justify-between text-on-primary">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary-container text-[24px]">bolt</span>
            <h2 className="font-headline text-base uppercase tracking-wider text-on-primary m-0">
              SMART REMINDER ENGINE
            </h2>
          </div>
          <span className="bg-secondary-container text-on-surface font-body text-[10px] px-2 py-0.5 rounded comic-border-2 comic-shadow-sm uppercase font-bold">
            AI SYNC
          </span>
        </div>

        <div className="p-4 flex flex-col gap-3">
          {/* Master Switch */}
          <div className="flex items-center justify-between gap-2 pb-2 border-b border-on-surface/10">
            <div className="flex flex-col">
              <span className="font-headline text-sm text-on-surface uppercase">INTELLIGENT PACING</span>
              <span className="font-body text-xs text-on-surface-variant">
                Triggers adaptive prompts based on metabolic load
              </span>
            </div>
            <button
              type="button"
              aria-label="Toggle Reminders"
              onClick={() => {
                hydraAudio.playPop();
                setReminderSettings(prev => ({ ...prev, intelligentPacing: !prev.intelligentPacing }));
              }}
              className={`w-14 h-8 rounded-full comic-border-2 p-0.5 flex items-center px-1 comic-shadow-sm transition-colors cursor-pointer ${
                reminderSettings.intelligentPacing
                  ? 'justify-end bg-primary-container'
                  : 'justify-start bg-surface-container-high'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full comic-border-2 comic-shadow-sm block ${
                  reminderSettings.intelligentPacing ? 'bg-secondary-container' : 'bg-outline-variant'
                }`}
              />
            </button>
          </div>

          {/* Cadence Selector */}
          <div className="flex flex-col gap-1.5">
            <label className="font-body text-xs font-bold uppercase text-on-surface flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-primary">timer</span>
              INTERVAL CADENCE
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[45, 60, 90, 120].map((mins) => {
                const isSelected = reminderSettings.intervalMinutes === mins;
                return (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => {
                      hydraAudio.playPop();
                      setReminderSettings(prev => ({ ...prev, intervalMinutes: mins }));
                    }}
                    className={`py-2 text-center rounded comic-border-2 comic-shadow-sm font-body text-xs uppercase font-bold cursor-pointer ${
                      isSelected
                        ? 'bg-secondary-container text-on-secondary-container rotate-[-1deg]'
                        : 'bg-surface-container-high text-on-surface hover:bg-secondary-container'
                    }`}
                  >
                    {mins} MIN
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sleep Schedule Guard Panel */}
          <div className="bg-surface-container-low rounded-lg p-3 comic-border-2 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-body text-xs font-bold uppercase text-on-surface flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-tertiary">bedtime</span>
                SLEEP SCHEDULE GUARD
              </span>
              <span className="font-body text-[10px] text-tertiary uppercase font-extrabold bg-tertiary-fixed px-1.5 py-0.5 rounded comic-border-2">
                ACTIVE
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-1">
              <div className="flex flex-col bg-surface-container-lowest p-2 rounded comic-border-2">
                <span className="font-body text-[9px] uppercase text-on-surface-variant font-bold">
                  WAKE-UP TIME
                </span>
                <span className="font-headline text-base text-on-surface uppercase">
                  {reminderSettings.wakeUpTime} AM
                </span>
              </div>
              <div className="flex flex-col bg-surface-container-lowest p-2 rounded comic-border-2">
                <span className="font-body text-[9px] uppercase text-on-surface-variant font-bold">
                  BEDTIME DND
                </span>
                <span className="font-headline text-base text-on-surface uppercase">
                  {reminderSettings.bedtime} PM
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-on-surface-variant font-body text-xs">
              <span className="material-symbols-outlined text-[16px] text-error">do_not_disturb_on</span>
              <span>Reminders silenced during sleep automatically.</span>
            </div>
          </div>

          {/* Active Reminder Vibes */}
          <div className="flex flex-col gap-1.5 mt-1">
            <label className="font-body text-xs font-bold uppercase text-on-surface flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-primary">notifications_active</span>
              ACTIVE REMINDER VIBES
            </label>
            <div className="flex flex-col gap-1.5">
              {[
                { key: 'hourlyVibeCheck', label: 'HOURLY VIBE CHECK: GRAB YOUR BOTTLE AND DRINK UP', dot: 'bg-primary' },
                { key: 'lockInCheck', label: 'TIME TO LOCK IN: DOWN 500ML BEFORE YOUR NEXT TASK', dot: 'bg-secondary' },
                { key: 'headacheFix', label: 'THAT AFTERNOON HEADACHE LIVING RENT FREE? FIX IT WITH H2O', dot: 'bg-error' }
              ].map((vibe) => (
                <div
                  key={vibe.key}
                  className="flex items-center justify-between p-2 bg-surface-container-low rounded comic-border-2"
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${vibe.dot}`} />
                    <span className="font-body text-[10px] uppercase font-bold text-on-surface">
                      {vibe.label}
                    </span>
                  </div>
                  <span className="font-body text-[10px] uppercase text-primary font-bold">ON</span>
                </div>
              ))}
            </div>
          </div>

          {/* Smart Skip Logic */}
          <div className="flex items-center justify-between p-2 bg-surface-container rounded comic-border-2">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-primary text-on-primary flex items-center justify-center comic-border-2 comic-shadow-sm font-bold text-xs">
                ✓
              </span>
              <span className="font-body text-xs uppercase text-on-surface font-bold">
                SMART SKIP LOGIC (PAUSE AFTER 3 SKIPS)
              </span>
            </div>
            <span className="font-body text-[10px] uppercase text-primary font-bold">ENABLED</span>
          </div>
        </div>
      </section>

      {/* Section 3: Workout Adaptations */}
      <section className="flex flex-col w-full bg-surface-container-lowest rounded-xl comic-border comic-shadow-md overflow-hidden">
        {/* Header Bar */}
        <div className="bg-secondary-container p-3 px-4 flex items-center justify-between text-on-surface">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px]">directions_run</span>
            <h2 className="font-headline text-base uppercase tracking-wider text-on-surface m-0">
              WORKOUT ADAPTATIONS
            </h2>
          </div>
          <span className="bg-surface-container-lowest text-on-surface font-body text-[10px] px-2 py-0.5 rounded comic-border-2 font-bold uppercase">
            {activities.length} ACTIVE
          </span>
        </div>

        <div className="p-4 flex flex-col gap-3">
          <p className="font-body text-xs text-on-surface-variant m-0">
            Chug calculates pre-hydration primers & post-session sweat replenishment windows based on scheduled drills.
          </p>

          <div className="grid grid-cols-1 gap-1.5">
            <div className="bg-secondary-container/30 p-2 px-3 rounded-lg comic-border-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
              <span className="font-body text-[10px] uppercase text-on-surface font-bold">
                NO CAP: YOUR SKIN WILL THANK YOU FOR THIS GLASS
              </span>
            </div>
            <div className="bg-error-container/30 p-2 px-3 rounded-lg comic-border-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-error text-[18px]">psychology_alt</span>
              <span className="font-body text-[10px] uppercase text-on-surface font-bold">
                THINKING ICED LATTE COUNTS AS WATER IS PURE DELULU
              </span>
            </div>
          </div>

          {/* Activities list */}
          {activities.map((act) => (
            <div
              key={act.id}
              className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg comic-border-2 comic-shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded ${
                    act.type === 'Running' ? 'bg-primary text-on-primary rotate-[-2deg]' : 'bg-tertiary-fixed text-on-tertiary-fixed rotate-[2deg]'
                  } flex items-center justify-center comic-border-2 comic-shadow-sm`}
                >
                  <span className="material-symbols-outlined text-[22px]">
                    {act.type === 'Running' ? 'sprint' : 'fitness_center'}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-headline text-sm uppercase text-on-surface leading-tight">
                    {act.customName}
                  </span>
                  <span className="font-body text-[10px] text-primary uppercase font-bold">
                    {act.startTime} - {act.endTime} • {act.type === 'Running' ? 'PRE & POST ALERTS' : 'HYDRA BOOSTER MODE'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label="Edit routine"
                  onClick={() => handleOpenEditActivity(act)}
                  className="text-on-surface-variant hover:text-primary transition-colors p-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                </button>
                <button
                  type="button"
                  aria-label="Delete routine"
                  onClick={() => deleteActivity(act.id)}
                  className="text-on-surface-variant hover:text-error transition-colors p-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>
          ))}

          {/* Add Activity Button */}
          <button
            type="button"
            onClick={() => {
              setEditingActivityId(null);
              setActivityName('');
              setIsActivityModalOpen(true);
            }}
            className="w-full py-2.5 bg-surface-container text-on-surface rounded-lg comic-border-2 comic-shadow-sm font-body text-xs font-bold uppercase flex items-center justify-center gap-2 hover:bg-surface-container-high transition-transform active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-primary">add_circle</span>
            + ADD ACTIVITY SESSION
          </button>
        </div>
      </section>

      {/* Section 4: Preferences, Theme & Data Storage */}
      <section className="flex flex-col w-full bg-surface-container-lowest rounded-xl comic-border comic-shadow-md overflow-hidden">
        {/* Header Bar */}
        <div className="bg-surface-container-highest p-3 px-4 flex items-center justify-between text-on-surface">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px]">tune</span>
            <h2 className="font-headline text-base uppercase tracking-wider text-on-surface m-0">
              PREFERENCES
            </h2>
          </div>
          <span className="bg-secondary-container text-on-surface font-body text-[10px] px-2 py-0.5 rounded comic-border-2 font-bold uppercase">
            LOCAL GUEST
          </span>
        </div>

        <div className="p-4 flex flex-col gap-3">
          {/* Unit Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col bg-surface-container-low p-3 rounded-lg comic-border-2">
              <span className="font-body text-[10px] uppercase text-on-surface-variant font-bold">
                MEASUREMENT UNIT
              </span>
              <div className="flex items-center gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setUserProfile(p => ({ ...p, preferredUnit: 'ml' }))}
                  className={`flex-1 py-1.5 rounded comic-border-2 font-body text-xs uppercase text-center font-bold ${
                    userProfile.preferredUnit === 'ml'
                      ? 'bg-primary text-on-primary comic-shadow-sm'
                      : 'bg-surface-container-lowest text-on-surface'
                  }`}
                >
                  ML (METRIC)
                </button>
                <button
                  type="button"
                  onClick={() => setUserProfile(p => ({ ...p, preferredUnit: 'fl_oz' }))}
                  className={`flex-1 py-1.5 rounded comic-border-2 font-body text-xs uppercase text-center font-bold ${
                    userProfile.preferredUnit === 'fl_oz'
                      ? 'bg-primary text-on-primary comic-shadow-sm'
                      : 'bg-surface-container-lowest text-on-surface'
                  }`}
                >
                  FL OZ
                </button>
              </div>
            </div>

            {/* Pop Audio SFX */}
            <div className="flex flex-col bg-surface-container-low p-3 rounded-lg comic-border-2">
              <span className="font-body text-[10px] uppercase text-on-surface-variant font-bold">
                AUDIO & HAPTIC IMPACT
              </span>
              <div className="flex items-center justify-between mt-2">
                <span className="font-headline text-sm uppercase text-on-surface">COMIC SFX</span>
                <button
                  type="button"
                  onClick={() => {
                    hydraAudio.enabled = !hydraAudio.enabled;
                    hydraAudio.playPop();
                    triggerToast(hydraAudio.enabled ? 'COMIC SFX: ON ⚡' : 'COMIC SFX: MUTED 🔇');
                  }}
                  className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded comic-border-2 font-body text-xs uppercase font-extrabold comic-shadow-sm cursor-pointer"
                >
                  BOING & POP ON
                </button>
              </div>
            </div>
          </div>

          {/* Theme Switcher */}
          <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg comic-border-2">
            <div className="flex flex-col">
              <span className="font-headline text-sm uppercase text-on-surface">VISUAL THEME</span>
              <span className="font-body text-xs text-on-surface-variant">
                High-voltage Pop Art aesthetic profile
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  if (theme !== 'light') toggleTheme();
                }}
                className={`px-3 py-1 rounded comic-border-2 font-body text-xs uppercase font-extrabold cursor-pointer ${
                  theme === 'light'
                    ? 'bg-secondary-container text-on-secondary-container comic-shadow-sm'
                    : 'bg-surface-container-lowest text-on-surface-variant'
                }`}
              >
                ☀️ POP CREAM
              </button>
              <button
                type="button"
                onClick={() => {
                  if (theme !== 'dark') toggleTheme();
                }}
                className={`px-3 py-1 rounded comic-border-2 font-body text-xs uppercase font-extrabold cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-secondary-container text-on-secondary-container comic-shadow-sm'
                    : 'bg-surface-container-lowest text-on-surface-variant'
                }`}
              >
                🌙 MIDNIGHT INK
              </button>
            </div>
          </div>

          {/* Launch Onboarding Flow Wizard */}
          <button
            type="button"
            onClick={() => {
              hydraAudio.playPop();
              setIsOnboardingOpen(true);
            }}
            className="w-full py-3 bg-primary-container text-white comic-border comic-shadow-md rounded-xl font-headline text-base uppercase tracking-wide flex items-center justify-center gap-2 active:translate-x-0.5 active:translate-y-0.5 transition-transform cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">rocket_launch</span>
            LAUNCH 5-STEP ONBOARDING MISSION
          </button>

          {/* Reset Data Button */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setIsResetModalOpen(true)}
              className="w-full py-2.5 bg-error-container text-on-error-container rounded-lg comic-border-2 comic-shadow-sm font-body text-xs font-bold uppercase flex items-center justify-center gap-1 hover:bg-error hover:text-on-error transition-transform active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">delete_forever</span>
              RESET DATA
            </button>
          </div>
        </div>
      </section>

      {/* Modal: Danger Zone Reset */}
      {isResetModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-xl p-4 comic-border comic-shadow-md w-full max-w-sm flex flex-col gap-3 rotate-[1deg]">
            <div className="flex items-center gap-2 text-error">
              <span className="material-symbols-outlined text-[32px]">warning</span>
              <h3 className="font-headline text-lg uppercase m-0">DANGER ZONE!</h3>
            </div>
            <p className="font-body text-xs text-on-surface m-0">
              This will wipe all local hydration logs and reset your profile settings. Are you super sure, hero?
            </p>
            <div className="flex items-center justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={() => setIsResetModalOpen(false)}
                className="px-4 py-1.5 bg-surface-container text-on-surface rounded comic-border-2 font-body text-xs uppercase font-bold"
              >
                CANCEL
              </button>
              <button
                type="button"
                onClick={() => {
                  resetAllData();
                  setIsResetModalOpen(false);
                }}
                className="px-4 py-1.5 bg-error text-on-error rounded comic-border-2 comic-shadow-sm font-body text-xs uppercase font-bold"
              >
                WIPE ALL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Edit Daily Goal */}
      {isGoalModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-xl p-4 comic-border comic-shadow-md w-full max-w-sm flex flex-col gap-3">
            <div className="flex items-center justify-between pb-1 border-b-2 border-on-surface">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[22px]">target</span>
                <h3 className="font-headline text-base uppercase text-on-surface">EDIT DAILY QUOTA</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsGoalModalOpen(false)}
                className="w-7 h-7 comic-border-2 rounded bg-surface-container flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveGoal} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="font-body text-xs uppercase text-on-surface font-bold">
                  Target Volume (ML):
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="500"
                    max="6000"
                    step="100"
                    value={tempGoal}
                    onChange={(e) => setTempGoal(Number(e.target.value))}
                    className="w-full comic-border-2 px-3 py-2 text-headline text-xl text-on-surface bg-surface rounded"
                    required
                  />
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => setTempGoal(prev => Math.max(500, prev - 250))}
                      className="w-9 h-9 bg-surface-container comic-border-2 rounded font-headline text-lg"
                    >
                      -
                    </button>
                    <button
                      type="button"
                      onClick={() => setTempGoal(prev => Math.min(6000, prev + 250))}
                      className="w-9 h-9 bg-surface-container comic-border-2 rounded font-headline text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-1">
                <button
                  type="submit"
                  className="w-full py-2 bg-secondary-container text-on-surface font-headline text-sm uppercase comic-border-2 comic-shadow-sm rounded"
                >
                  SAVE GOAL
                </button>
                <button
                  type="button"
                  onClick={() => setIsGoalModalOpen(false)}
                  className="w-full py-2 bg-surface-container text-on-surface font-headline text-sm uppercase comic-border-2 rounded"
                >
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add/Edit Activity Session */}
      {isActivityModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-xl p-4 comic-border comic-shadow-md w-full max-w-sm flex flex-col gap-3">
            <div className="flex items-center justify-between pb-1 border-b-2 border-on-surface">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[22px]">fitness_center</span>
                <h3 className="font-headline text-base uppercase text-on-surface">
                  {editingActivityId ? 'EDIT SESSION' : 'ADD SESSION'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsActivityModalOpen(false)}
                className="w-7 h-7 comic-border-2 rounded bg-surface-container flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveActivity} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="font-body text-xs uppercase text-on-surface font-bold">Activity Type</label>
                <select
                  value={activityType}
                  onChange={(e) => {
                    setActivityType(e.target.value);
                    if (!activityName) setActivityName(e.target.value);
                  }}
                  className="w-full comic-border-2 px-3 py-2 font-body text-xs uppercase text-on-surface bg-surface rounded font-bold"
                >
                  <option value="Running">Running / Trail 🏃</option>
                  <option value="Gym">Gym Strength Protocol 🏋️</option>
                  <option value="Cycling">Cycling / Cardio 🚴</option>
                  <option value="Team Sports">Team Sports ⚽</option>
                  <option value="Yoga">Yoga / Mobility 🧘</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-body text-xs uppercase text-on-surface font-bold">Session Name</label>
                <input
                  type="text"
                  value={activityName}
                  onChange={(e) => setActivityName(e.target.value)}
                  placeholder="e.g. Morning Trail Run"
                  className="w-full comic-border-2 px-3 py-2 font-body text-xs text-on-surface bg-surface rounded font-bold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="font-body text-[10px] uppercase text-on-surface font-bold">Start Time</label>
                  <input
                    type="time"
                    value={activityStart}
                    onChange={(e) => setActivityStart(e.target.value)}
                    className="w-full comic-border-2 px-2 py-1.5 font-body text-xs text-on-surface bg-surface rounded font-bold"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-body text-[10px] uppercase text-on-surface font-bold">End Time</label>
                  <input
                    type="time"
                    value={activityEnd}
                    onChange={(e) => setActivityEnd(e.target.value)}
                    className="w-full comic-border-2 px-2 py-1.5 font-body text-xs text-on-surface bg-surface rounded font-bold"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-1">
                <button
                  type="submit"
                  className="w-full py-2 bg-secondary-container text-on-surface font-headline text-sm uppercase comic-border-2 comic-shadow-sm rounded"
                >
                  SAVE SESSION
                </button>
                <button
                  type="button"
                  onClick={() => setIsActivityModalOpen(false)}
                  className="w-full py-2 bg-surface-container text-on-surface font-headline text-sm uppercase comic-border-2 rounded"
                >
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
