import React, { useState } from 'react';
import { useHydration } from '../context/HydrationContext.js';
import { ActivityLevel, UnitType } from '../types/hydration.js';
import { hydraAudio } from '../utils/audio.js';

type OnboardingViewMode = 'landing' | 'register' | 'login' | 'forgot' | 'wizard';

export const OnboardingModal: React.FC = () => {
  const {
    isOnboardingOpen,
    setIsOnboardingOpen,
    userProfile,
    setUserProfile,
    reminderSettings,
    setReminderSettings,
    activities,
    addActivity,
    deleteActivity,
    todayRecord,
    triggerToast
  } = useHydration();

  const [viewMode, setViewMode] = useState<OnboardingViewMode>('wizard');
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form states for auth views
  const [authName, setAuthName] = useState(userProfile.displayName || 'Alex Rivera');
  const [authEmail, setAuthEmail] = useState(userProfile.email || 'alex@example.com');
  const [authPass, setAuthPass] = useState('waterhero123');
  const [forgotSent, setForgotSent] = useState(false);

  // Wizard temporary states
  const [obName, setObName] = useState(userProfile.displayName || 'Alex Rivera');
  const [obAge, setObAge] = useState(userProfile.age || 28);
  const [obWeight, setObWeight] = useState(userProfile.weightKg || 72);
  const [obUnit, setObUnit] = useState<UnitType>(userProfile.preferredUnit || 'ml');
  const [obActivityLevel, setObActivityLevel] = useState<ActivityLevel>(userProfile.activityLevel || 'moderately_active');

  const [obWakeTime, setObWakeTime] = useState(reminderSettings.wakeUpTime || '07:00');
  const [obBedTime, setObBedTime] = useState(reminderSettings.bedtime || '22:30');
  const [obFirstAlert, setObFirstAlert] = useState(reminderSettings.firstReminderTime || '07:30');
  const [obLastAlert, setObLastAlert] = useState(reminderSettings.lastReminderTime || '21:45');
  const [scheduleSplit, setScheduleSplit] = useState(false);

  const [obGoal, setObGoal] = useState(todayRecord.goal || 2500);
  const [obInterval, setObInterval] = useState(reminderSettings.intervalMinutes || 60);
  const [obStyle, setObStyle] = useState<'gentle' | 'balanced' | 'frequent'>(reminderSettings.reminderStyle || 'balanced');
  const [obNotifications, setObNotifications] = useState(reminderSettings.remindersEnabled);
  const [obPauseOnGoal, setObPauseOnGoal] = useState(reminderSettings.pauseWhenGoalReached);

  if (!isOnboardingOpen) return null;

  const stepTitles = [
    "WHO'S THE THIRST BOSS?",
    "WHEN DOES YOUR DAY START?",
    "WHAT'S ON YOUR LIST?",
    "LET'S SET YOUR FLOW!",
    "YOUR CHUG! GAME PLAN"
  ];

  const handleFinishWizard = () => {
    // Save to global context
    setUserProfile(prev => ({
      ...prev,
      displayName: obName || 'Alex Rivera',
      age: obAge,
      weightKg: obWeight,
      preferredUnit: obUnit,
      activityLevel: obActivityLevel
    }));

    setReminderSettings(prev => ({
      ...prev,
      wakeUpTime: obWakeTime,
      bedtime: obBedTime,
      firstReminderTime: obFirstAlert,
      lastReminderTime: obLastAlert,
      intervalMinutes: obInterval,
      reminderStyle: obStyle,
      remindersEnabled: obNotifications,
      pauseWhenGoalReached: obPauseOnGoal
    }));

    todayRecord.goal = obGoal;

    hydraAudio.playVictory();
    triggerToast('🎉 ONBOARDING MISSION ACCOMPLISHED! MAIN CHARACTER UNLOCKED');
    setIsOnboardingOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 select-none">
      <div className="relative w-full max-w-md bg-chugCream text-chugInk rounded-3xl comic-border-thick shadow-pop-lg p-4 sm:p-5 my-auto max-h-[92vh] overflow-y-auto">
        {/* Modal Close Button */}
        <button
          type="button"
          onClick={() => setIsOnboardingOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg comic-border bg-white text-chugInk hover:bg-rose-100 flex items-center justify-center font-bold text-base z-30 cursor-pointer shadow-pop-sm"
        >
          ✕
        </button>

        {/* ========================================================================= */}
        {/* VIEW: LANDING                                                            */}
        {/* ========================================================================= */}
        {viewMode === 'landing' && (
          <div className="flex flex-col gap-4 pt-1">
            <div className="flex justify-between items-center pr-8">
              <div className="inline-flex items-center gap-1.5 bg-chugYellow comic-border px-3 py-0.5 rounded-full shadow-pop-sm -rotate-1">
                <span className="text-[11px] font-black font-body tracking-wide">
                  ⚡ ISSUE #1 — ZERO DEHYDRATION
                </span>
              </div>
              <div className="bg-white comic-border px-2 py-0.5 rounded-full text-[10px] font-body font-black text-chugInk/70">
                MOBILE V1.0
              </div>
            </div>

            <div className="relative w-full bg-chugYellow rounded-3xl comic-border-thick p-4 shadow-pop-lg overflow-hidden text-center">
              <div className="w-36 h-36 mx-auto relative flex items-center justify-center">
                <img
                  alt="CHUG Mascot"
                  className="w-full h-full object-contain rounded-2xl comic-border shadow-pop"
                  src="/assets/aistudio/Image_5_944e23bb.jpeg"
                />
              </div>
              <div className="mt-3 bg-white comic-border px-3 py-1 rounded-xl shadow-pop inline-flex items-center gap-2">
                <span className="text-lg">⚡</span>
                <div className="text-left">
                  <p className="text-[9px] font-black uppercase text-chugInk/60 leading-none">HERO STATUS</p>
                  <p className="font-headline text-sm text-chugBlue uppercase leading-tight">LEVEL 5 HYDRA-BEAST</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1.5 text-center pt-3 mt-3 border-t-2 border-chugInk">
                <div className="bg-white comic-border py-1 px-1 rounded-lg">
                  <p className="font-headline text-sm text-chugBlue">NO CAP</p>
                  <p className="text-[9px] font-black uppercase">VALID SIP</p>
                </div>
                <div className="bg-white comic-border py-1 px-1 rounded-lg">
                  <p className="font-headline text-sm text-chugPink">LOCK IN</p>
                  <p className="text-[9px] font-black uppercase">MAIN HERO</p>
                </div>
                <div className="bg-white comic-border py-1 px-1 rounded-lg">
                  <p className="font-headline text-sm text-emerald-600">0 DELULU</p>
                  <p className="text-[9px] font-black uppercase">LATTE ≠ H2O</p>
                </div>
              </div>
            </div>

            <div className="space-y-1 text-center">
              <h1 className="font-headline text-4xl text-chugInk uppercase leading-none">
                READY TO <span className="text-chugBlue underline decoration-chugPink decoration-4">CHUG?</span>
              </h1>
              <p className="font-body text-xs font-bold text-chugInk/80">
                Smash your daily hydration goals with personalized smart alerts and zero notification fatigue.
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  hydraAudio.playPop();
                  setViewMode('wizard');
                  setCurrentStep(1);
                }}
                className="w-full py-3 bg-chugBlue hover:bg-blue-600 text-white font-headline text-lg uppercase tracking-wide rounded-xl comic-border shadow-pop cursor-pointer"
              >
                ENTER HYDRATED ERA — START WIZARD
              </button>
              <button
                type="button"
                onClick={() => setViewMode('register')}
                className="w-full py-2.5 bg-chugYellow hover:bg-yellow-300 text-chugInk font-headline text-base uppercase rounded-xl comic-border shadow-pop cursor-pointer"
              >
                CREATE ACCOUNT
              </button>
              <button
                type="button"
                onClick={() => setViewMode('login')}
                className="w-full py-2 text-center text-xs font-body font-black text-chugInk/80 hover:text-chugBlue underline"
              >
                ALREADY HAVE ACCOUNT? LOG IN
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW: REGISTER                                                           */}
        {/* ========================================================================= */}
        {viewMode === 'register' && (
          <div className="w-full space-y-3">
            <button
              type="button"
              onClick={() => setViewMode('landing')}
              className="inline-flex items-center gap-1 font-body font-black text-xs text-chugInk/70 uppercase"
            >
              ← BACK TO WELCOME
            </button>
            <div className="bg-white comic-border-thick rounded-2xl p-4 shadow-pop-lg">
              <div className="inline-block bg-chugPink text-white font-body font-black text-[9px] px-2 py-0.5 rounded comic-border shadow-pop-sm -rotate-2 mb-1">
                FRONTEND DEMO AUTH
              </div>
              <h2 className="font-headline text-2xl text-chugInk uppercase leading-tight mb-1">
                JOIN THE <span className="text-chugBlue">CHUG!</span> SQUAD
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setUserProfile(p => ({ ...p, displayName: authName, email: authEmail }));
                  setViewMode('wizard');
                  setCurrentStep(1);
                }}
                className="space-y-2.5"
              >
                <div>
                  <label className="block font-body font-black text-[10px] uppercase text-chugInk mb-0.5">Handle / Name</label>
                  <input
                    type="text"
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-chugCream font-body font-bold text-xs text-chugInk comic-border rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-body font-black text-[10px] uppercase text-chugInk mb-0.5">Email</label>
                  <input
                    type="email"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-chugCream font-body font-bold text-xs text-chugInk comic-border rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-body font-black text-[10px] uppercase text-chugInk mb-0.5">Password</label>
                  <input
                    type="password"
                    value={authPass}
                    onChange={(e) => setAuthPass(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-chugCream font-body font-bold text-xs text-chugInk comic-border rounded-xl focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-chugYellow hover:bg-yellow-300 text-chugInk font-headline text-base uppercase rounded-xl comic-border shadow-pop cursor-pointer mt-1"
                >
                  LET'S GO! →
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW: LOGIN                                                              */}
        {/* ========================================================================= */}
        {viewMode === 'login' && (
          <div className="w-full space-y-3">
            <button
              type="button"
              onClick={() => setViewMode('landing')}
              className="inline-flex items-center gap-1 font-body font-black text-xs text-chugInk/70 uppercase"
            >
              ← BACK TO WELCOME
            </button>
            <div className="bg-white comic-border-thick rounded-2xl p-4 shadow-pop-lg">
              <div className="inline-block bg-chugCyan text-chugInk font-body font-black text-[9px] px-2 py-0.5 rounded comic-border shadow-pop-sm -rotate-2 mb-1">
                WELCOME BACK HERO
              </div>
              <h2 className="font-headline text-2xl text-chugInk uppercase leading-tight mb-1">
                LOG IN TO <span className="text-chugBlue">CHUG!</span>
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setUserProfile(p => ({ ...p, email: authEmail }));
                  setViewMode('wizard');
                  setCurrentStep(1);
                }}
                className="space-y-2.5"
              >
                <div>
                  <label className="block font-body font-black text-[10px] uppercase text-chugInk mb-0.5">Email Address</label>
                  <input
                    type="email"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-chugCream font-body font-bold text-xs text-chugInk comic-border rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-body font-black text-[10px] uppercase text-chugInk mb-0.5">Password</label>
                  <input
                    type="password"
                    value={authPass}
                    onChange={(e) => setAuthPass(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-chugCream font-body font-bold text-xs text-chugInk comic-border rounded-xl focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-chugBlue hover:bg-blue-600 text-white font-headline text-base uppercase rounded-xl comic-border shadow-pop cursor-pointer mt-1"
                >
                  LOG IN →
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW: 5-STEP ONBOARDING WIZARD                                            */}
        {/* ========================================================================= */}
        {viewMode === 'wizard' && (
          <div className="w-full space-y-3">
            {/* Mission Progress Indicator */}
            <div className="bg-white comic-border rounded-xl p-3 shadow-pop">
              <div className="flex items-center justify-between gap-2 mb-1">
                <div>
                  <span className="font-body font-black text-[9px] uppercase tracking-wider text-chugBlue">
                    ONBOARDING MISSION
                  </span>
                  <h2 className="font-headline text-base uppercase text-chugInk leading-tight">
                    STEP {currentStep} OF 5: {stepTitles[currentStep - 1]}
                  </h2>
                </div>
                <span className="font-headline text-base text-chugPink">
                  {currentStep * 20}%
                </span>
              </div>

              {/* Progress bar fill */}
              <div className="w-full bg-chugCream h-3.5 comic-border rounded-full overflow-hidden p-0.5">
                <div
                  className="bg-gradient-to-r from-chugCyan via-chugYellow to-chugPink h-full rounded-full transition-all duration-300 border-r-2 border-chugInk"
                  style={{ width: `${currentStep * 20}%` }}
                />
              </div>

              {/* Step tabs */}
              <div className="flex justify-between items-center mt-2 pt-1 border-t border-chugInk/20 text-[9px] font-body font-bold text-chugInk/60">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setCurrentStep(s)}
                    className={`flex items-center gap-1 ${currentStep === s ? 'text-chugBlue font-black' : ''}`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full comic-border flex items-center justify-center text-[8px] ${
                        currentStep === s ? 'bg-chugYellow font-black' : 'bg-white'
                      }`}
                    >
                      {s}
                    </span>
                    {s === 1 ? 'About' : s === 2 ? 'Cadence' : s === 3 ? 'Acts' : s === 4 ? 'Target' : 'Plan'}
                  </button>
                ))}
              </div>
            </div>

            {/* Step Contents */}
            <div className="bg-white comic-border rounded-2xl p-4 shadow-pop-lg">
              {/* STEP 1: IDENTITY */}
              {currentStep === 1 && (
                <div className="space-y-3">
                  <div>
                    <label className="block font-body font-black text-[10px] uppercase text-chugInk mb-1">
                      Superhero Name / Handle *
                    </label>
                    <input
                      type="text"
                      value={obName}
                      onChange={(e) => setObName(e.target.value)}
                      className="w-full px-3 py-2 bg-chugCream font-body font-bold text-xs text-chugInk comic-border rounded-xl focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-body font-black text-[10px] uppercase text-chugInk mb-1">Age</label>
                      <input
                        type="number"
                        value={obAge}
                        onChange={(e) => setObAge(Number(e.target.value))}
                        className="w-full px-3 py-1.5 bg-chugCream font-body font-bold text-xs text-chugInk comic-border rounded-xl focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-body font-black text-[10px] uppercase text-chugInk mb-1">Weight (KG)</label>
                      <input
                        type="number"
                        value={obWeight}
                        onChange={(e) => setObWeight(Number(e.target.value))}
                        className="w-full px-3 py-1.5 bg-chugCream font-body font-bold text-xs text-chugInk comic-border rounded-xl focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-body font-black text-[10px] uppercase text-chugInk mb-1">
                      Preferred Unit
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setObUnit('ml')}
                        className={`py-2 px-1 comic-border rounded-xl font-headline text-xs text-center ${
                          obUnit === 'ml' ? 'bg-chugBlue text-white shadow-pop' : 'bg-chugCream text-chugInk'
                        }`}
                      >
                        MILLILITRES (ML)
                      </button>
                      <button
                        type="button"
                        onClick={() => setObUnit('fl_oz')}
                        className={`py-2 px-1 comic-border rounded-xl font-headline text-xs text-center ${
                          obUnit === 'fl_oz' ? 'bg-chugBlue text-white shadow-pop' : 'bg-chugCream text-chugInk'
                        }`}
                      >
                        OUNCES (FL OZ)
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block font-body font-black text-[10px] uppercase text-chugInk mb-1">
                      Daily Activity Level
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { id: 'mostly_sitting', emoji: '🛋️', label: 'MOSTLY SITTING' },
                        { id: 'lightly_active', emoji: '🚶', label: 'LIGHTLY ACTIVE' },
                        { id: 'moderately_active', emoji: '🏃', label: 'MODERATELY ACTIVE' },
                        { id: 'very_active', emoji: '⚡', label: 'VERY ACTIVE' }
                      ].map((lvl) => (
                        <button
                          key={lvl.id}
                          type="button"
                          onClick={() => setObActivityLevel(lvl.id as ActivityLevel)}
                          className={`comic-border p-2 rounded-xl text-left flex items-center gap-1.5 ${
                            obActivityLevel === lvl.id ? 'bg-chugYellow shadow-pop font-black' : 'bg-chugCream'
                          }`}
                        >
                          <span className="text-base">{lvl.emoji}</span>
                          <span className="font-headline text-[11px] leading-tight text-chugInk">{lvl.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: CHRONO CADENCE */}
              {currentStep === 2 && (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setScheduleSplit(false)}
                      className={`flex-1 py-1.5 comic-border rounded-lg font-body text-[10px] font-black ${
                        !scheduleSplit ? 'bg-chugYellow shadow-pop-sm' : 'bg-white'
                      }`}
                    >
                      SAME SCHEDULE
                    </button>
                    <button
                      type="button"
                      onClick={() => setScheduleSplit(true)}
                      className={`flex-1 py-1.5 comic-border rounded-lg font-body text-[10px] font-black ${
                        scheduleSplit ? 'bg-chugYellow shadow-pop-sm' : 'bg-white'
                      }`}
                    >
                      SPLIT WEEKEND
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-chugCream comic-border p-2 rounded-xl">
                      <label className="block font-body font-black text-[9px] uppercase text-chugInk mb-0.5">
                        ☀️ WAKE-UP
                      </label>
                      <input
                        type="time"
                        value={obWakeTime}
                        onChange={(e) => setObWakeTime(e.target.value)}
                        className="w-full px-2 py-1 bg-white font-body font-black text-xs text-chugInk comic-border rounded-lg"
                      />
                    </div>
                    <div className="bg-chugCream comic-border p-2 rounded-xl">
                      <label className="block font-body font-black text-[9px] uppercase text-chugInk mb-0.5">
                        🌙 BEDTIME
                      </label>
                      <input
                        type="time"
                        value={obBedTime}
                        onChange={(e) => setObBedTime(e.target.value)}
                        className="w-full px-2 py-1 bg-white font-body font-black text-xs text-chugInk comic-border rounded-lg"
                      />
                    </div>
                    <div className="bg-white comic-border p-2 rounded-xl">
                      <label className="block font-body font-black text-[9px] uppercase text-chugInk mb-0.5">
                        ⏱️ 1ST ALERT
                      </label>
                      <input
                        type="time"
                        value={obFirstAlert}
                        onChange={(e) => setObFirstAlert(e.target.value)}
                        className="w-full px-2 py-1 bg-chugCream font-body font-black text-xs text-chugInk comic-border rounded-lg"
                      />
                    </div>
                    <div className="bg-white comic-border p-2 rounded-xl">
                      <label className="block font-body font-black text-[9px] uppercase text-chugInk mb-0.5">
                        ⏱️ LAST ALERT
                      </label>
                      <input
                        type="time"
                        value={obLastAlert}
                        onChange={(e) => setObLastAlert(e.target.value)}
                        className="w-full px-2 py-1 bg-chugCream font-body font-black text-xs text-chugInk comic-border rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="bg-chugInk text-white p-2.5 rounded-xl comic-border">
                    <div className="flex items-center justify-between text-[10px] font-body font-bold mb-1">
                      <span className="text-chugYellow">CHRONO FLOW</span>
                      <span className="text-chugCyan">15.5 WAKING HOURS</span>
                    </div>
                    <div className="w-full h-6 bg-chugInk/80 border-2 border-white/40 rounded flex overflow-hidden">
                      <div className="bg-chugBlue/70 h-full flex items-center justify-center text-[8px] font-bold" style={{ width: '29%' }}>
                        SLEEP
                      </div>
                      <div className="bg-chugCyan h-full flex items-center justify-center text-[8px] font-black text-chugInk" style={{ width: '65%' }}>
                        HYDRATION ACTIVE ({obWakeTime} - {obBedTime})
                      </div>
                      <div className="bg-chugBlue/70 h-full flex items-center justify-center text-[8px] font-bold" style={{ width: '6%' }}>
                        SLEEP
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: ACTIVITIES */}
              {currentStep === 3 && (
                <div className="space-y-3">
                  <div className="space-y-2">
                    {activities.map((act) => (
                      <div
                        key={act.id}
                        className="bg-white comic-border p-2.5 rounded-xl shadow-pop-sm flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{act.type === 'Running' ? '🏃' : '🏋️'}</span>
                          <div>
                            <p className="font-headline text-xs uppercase leading-tight">{act.customName}</p>
                            <p className="text-[10px] font-body text-chugInk/70">
                              {act.startTime} – {act.endTime} • {act.daysOfWeek.join(', ')}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => deleteActivity(act.id)}
                          className="text-chugRed font-body font-bold text-xs p-1"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      addActivity({
                        type: 'Study',
                        customName: 'Deep Work Session',
                        startTime: '10:00',
                        endTime: '12:00',
                        daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu'],
                        pauseReminders: true,
                        resumeAfterActivity: true
                      });
                    }}
                    className="w-full py-2 bg-chugYellow comic-border rounded-xl font-headline text-xs uppercase shadow-pop-sm"
                  >
                    + ADD QUICK PRESET SESSION
                  </button>
                </div>
              )}

              {/* STEP 4: TARGETS & REMINDERS */}
              {currentStep === 4 && (
                <div className="space-y-3">
                  <div className="bg-chugCream comic-border p-3 rounded-xl">
                    <label className="block font-body font-black text-[10px] uppercase text-chugInk mb-1">
                      🎯 DAILY WATER GOAL
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="500"
                        max="6000"
                        step="100"
                        value={obGoal}
                        onChange={(e) => setObGoal(Number(e.target.value))}
                        className="w-24 px-2 py-1.5 bg-white font-headline text-xl text-chugInk comic-border rounded-xl"
                      />
                      <span className="font-headline text-sm text-chugBlue uppercase flex-1">
                        {obUnit.toUpperCase()} / DAY
                      </span>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => setObGoal(g => Math.max(500, g - 250))}
                          className="w-8 h-8 bg-white comic-border rounded-lg font-headline text-base"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => setObGoal(g => Math.min(6000, g + 250))}
                          className="w-8 h-8 bg-white comic-border rounded-lg font-headline text-base"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block font-body font-black text-[10px] uppercase text-chugInk mb-1">
                      ⏱️ REMINDER FREQUENCY
                    </label>
                    <div className="grid grid-cols-5 gap-1">
                      {[30, 45, 60, 90, 120].map((mins) => (
                        <button
                          key={mins}
                          type="button"
                          onClick={() => setObInterval(mins)}
                          className={`py-1.5 text-center comic-border rounded-lg font-headline text-xs ${
                            obInterval === mins ? 'bg-chugBlue text-white shadow-pop' : 'bg-white text-chugInk'
                          }`}
                        >
                          {mins}M
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-body font-black text-[10px] uppercase text-chugInk mb-1">
                      💬 REMINDER VIBE
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { id: 'gentle', label: 'GENTLE', sub: 'Soft' },
                        { id: 'balanced', label: 'BALANCED', sub: 'Comic' },
                        { id: 'frequent', label: 'FREQUENT', sub: 'Hero' }
                      ].map((v) => (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setObStyle(v.id as 'gentle' | 'balanced' | 'frequent')}
                          className={`comic-border p-1.5 rounded-xl text-center ${
                            obStyle === v.id ? 'bg-chugYellow shadow-pop font-black' : 'bg-white'
                          }`}
                        >
                          <p className="font-headline text-xs">{v.label}</p>
                          <p className="text-[9px] font-body text-chugInk/70">{v.sub}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: GAME PLAN REVIEW */}
              {currentStep === 5 && (
                <div className="space-y-2.5">
                  <div className="bg-chugCream comic-border p-2.5 rounded-xl">
                    <p className="font-body font-black text-[9px] text-chugInk/60 uppercase">IDENTITY</p>
                    <p className="font-headline text-lg text-chugBlue uppercase leading-tight">{obName}</p>
                    <p className="text-[10px] font-bold text-chugInk/80 font-body">
                      Age {obAge} • {obWeight} kg • {obActivityLevel.replace('_', ' ').toUpperCase()}
                    </p>
                  </div>

                  <div className="bg-chugCream comic-border p-2.5 rounded-xl">
                    <p className="font-body font-black text-[9px] text-chugInk/60 uppercase">TARGET & CADENCE</p>
                    <p className="font-headline text-lg text-chugPink uppercase leading-tight">
                      {obGoal.toLocaleString()} {obUnit.toUpperCase()} / DAY
                    </p>
                    <p className="text-[10px] font-bold text-chugInk/80 font-body">
                      Every {obInterval} Minutes • {obStyle.toUpperCase()} Vibe
                    </p>
                  </div>

                  <div className="bg-chugYellow comic-border p-2.5 rounded-xl">
                    <p className="font-headline text-xs text-chugInk uppercase mb-1">SAMPLE TIMELINE</p>
                    <div className="flex flex-wrap gap-1">
                      {['07:30', '08:30', '09:30', '10:30', '11:30'].map((time) => (
                        <span key={time} className="bg-white comic-border px-2 py-0.5 rounded text-[10px] font-body font-black">
                          ⏰ {time}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Wizard Navigation Footer */}
            <div className="pt-2 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => {
                  if (currentStep === 1) {
                    setViewMode('landing');
                  } else {
                    setCurrentStep(prev => prev - 1);
                  }
                }}
                className="py-2.5 px-4 bg-white text-chugInk font-headline text-xs tracking-wider rounded-xl comic-border shadow-pop uppercase cursor-pointer"
              >
                ← BACK
              </button>

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={() => {
                    hydraAudio.playPop();
                    setCurrentStep(prev => prev + 1);
                  }}
                  className="py-2.5 px-5 bg-chugYellow hover:bg-yellow-300 text-chugInk font-headline text-xs tracking-wider rounded-xl comic-border shadow-pop uppercase cursor-pointer"
                >
                  CONTINUE →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinishWizard}
                  className="py-2.5 px-5 bg-emerald-400 hover:bg-emerald-300 text-chugInk font-headline text-xs tracking-wider rounded-xl comic-border shadow-pop uppercase cursor-pointer"
                >
                  LET'S CHUG! ⚡
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
