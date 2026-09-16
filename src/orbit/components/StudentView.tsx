import { useState, useEffect } from 'react';
import SwipeToStart from './SwipeToStart';
import WingedMLogo from './WingedMLogo';
import {
  StudentScreen,
  Lesson,
  Quiz,
  ScheduleEvent,
  AppNotification
} from '../types';
import {
  Sparkles,
  Bell,
  Clock,
  BookOpen,
  CheckCircle2,
  FileText,
  Download,
  Moon,
  Shield,
  Smartphone,
  ChevronRight,
  Play,
  Pause,
  ArrowRight,
  MoreVertical,
  Calendar,
  Layers,
  HelpCircle,
  Settings,
  ChevronLeft,
  Lock,
  User,
  DownloadCloud
} from 'lucide-react';

interface StudentViewProps {
  currentScreen: StudentScreen;
  onNavigate: (screen: StudentScreen) => void;
  lessons: Lesson[];
  quizzes: Quiz[];
  scheduleDays: { day: number; dayName: string }[];
  scheduleEvents: ScheduleEvent[];
  notifications: AppNotification[];
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenAITutor: () => void;
  onTakeQuiz: (quiz: Quiz) => void;
  onNotify: (msg: string) => void;
  onOpenAPKModal?: () => void;
}

export default function StudentView({
  currentScreen,
  onNavigate,
  lessons,
  quizzes,
  scheduleDays,
  scheduleEvents,
  notifications,
  isDarkMode,
  onToggleDarkMode,
  onOpenAITutor,
  onTakeQuiz,
  onNotify,
  onOpenAPKModal
}: StudentViewProps) {
  // Login Form State
  const [loginInput, setLoginInput] = useState('sardor');
  const [passwordInput, setPasswordInput] = useState('1234');

  // Notification panel toggle
  const [showNotifs, setShowNotifs] = useState(false);

  // Lesson player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(38);
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Dynamic DRM Watermark drift simulation (Always active)
  const [watermarkPos, setWatermarkPos] = useState({ top: 15, left: 15 });

  // Schedule selected day
  const [selectedDay, setSelectedDay] = useState(14);

  // Settings switches
  const [notifEnabled, setNotifEnabled] = useState(true);

  // Watermark drifting effect
  useEffect(() => {
    if (currentScreen !== 's-lesson') return;
    const interval = setInterval(() => {
      const randomTop = Math.floor(Math.random() * 65) + 10;
      const randomLeft = Math.floor(Math.random() * 60) + 10;
      setWatermarkPos({ top: randomTop, left: randomLeft });
    }, 4000);
    return () => clearInterval(interval);
  }, [currentScreen]);

  // Video progress simulation
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setPlaybackProgress(prev => (prev >= 100 ? 0 : prev + 1));
    }, 800);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const activeLesson = lessons[selectedLessonIndex] || lessons[0];

  const handleNextLesson = () => {
    if (selectedLessonIndex < lessons.length - 1) {
      setSelectedLessonIndex(prev => prev + 1);
      setPlaybackProgress(0);
      setIsCompleted(false);
      onNotify("Keyingi darsga o'tildi");
    } else {
      onNotify("Siz oxirgi darsdasiz");
    }
  };

  const handlePrevLesson = () => {
    if (selectedLessonIndex > 0) {
      setSelectedLessonIndex(prev => prev - 1);
      setPlaybackProgress(0);
      setIsCompleted(false);
      onNotify("Oldingi darsga o'tildi");
    } else {
      onNotify("Siz birinchi darsdasiz");
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#F4F4F4] dark:bg-neutral-950 text-[#0E0E0E] dark:text-neutral-100 transition-colors">
      {/* ================= 1. ONBOARDING SCREEN ================= */}
      {currentScreen === 's-onboard' && (
        <div className="flex-1 flex flex-col justify-end p-0 overflow-y-auto no-scrollbar relative min-h-[calc(100vh-20px)] pb-8">

          {/* Animated Orbit Rings Hero */}
          <div className="flex-1 w-full flex items-center justify-center bg-gradient-to-b from-[#EDEDED] to-[#F4F4F4] dark:from-neutral-900 dark:to-neutral-950 relative overflow-hidden pt-12 pb-6">
            <div className="relative w-64 h-64 flex items-center justify-center mt-8">
              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-neutral-800 border-r-neutral-800 dark:border-t-neutral-200 dark:border-r-neutral-200 animate-orbit-1" />
              <div className="absolute inset-8 rounded-full border-2 border-transparent border-b-neutral-500 border-l-neutral-500 dark:border-b-neutral-400 dark:border-l-neutral-400 animate-orbit-2" />
              <div className="w-28 h-28 rounded-full overflow-hidden bg-black flex items-center justify-center shadow-2xl z-10 border-2 border-neutral-700/80 p-0.5 hover:scale-105 transition-transform duration-300">
                <img src="/assets/user-logo.jpg" alt="Orbit Logo" className="w-full h-full object-cover rounded-full" />
              </div>
            </div>
          </div>

          {/* Copy & CTA */}
          <div className="p-7 pb-6 space-y-4 mt-auto max-w-lg mx-auto w-full">
            <h1 className="font-display text-3xl font-bold tracking-tight text-neutral-900 dark:text-white leading-tight">
              Bilimga ochilgan <br />
              aqlli darcha
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed max-w-sm">
              Interaktiv darslar, tezkor testlar va kunlik davomiylikni saqlaydigan o'quv rejasi — bari bitta ilovada.
            </p>

            {/* Login & Password Inputs */}
            <div className="space-y-3 pt-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={loginInput}
                  onChange={e => setLoginInput(e.target.value)}
                  placeholder="Login (masalan: sardor)"
                  className="w-full h-14 bg-white/90 dark:bg-neutral-900/90 border-2 border-neutral-300 dark:border-neutral-700/80 rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-neutral-500 dark:focus:border-white transition-all shadow-md"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={e => setPasswordInput(e.target.value)}
                  placeholder="Parol (masalan: 1234)"
                  className="w-full h-14 bg-white/90 dark:bg-neutral-900/90 border-2 border-neutral-300 dark:border-neutral-700/80 rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-neutral-500 dark:focus:border-white transition-all shadow-md"
                />
              </div>
            </div>

            <div className="pt-2">
              <SwipeToStart
                label="Boshlash uchun o'ngga suring"
                onValidate={() => {
                  const trimmedLogin = loginInput.trim().toLowerCase();
                  const trimmedPassword = passwordInput.trim();

                  if (!trimmedLogin || !trimmedPassword) {
                    return { valid: false, errorMsg: "X Login va parolni kiriting!" };
                  }

                  const isLoginOk = ['sardor', 'user', 'admin', 'talaba', 'ustoz'].includes(trimmedLogin) || trimmedLogin.length >= 3;
                  const isPassOk = ['1234', '123', 'admin', 'password'].includes(trimmedPassword) || trimmedPassword.length >= 3;

                  if (isLoginOk && isPassOk) {
                    return { valid: true };
                  } else {
                    return { valid: false, errorMsg: "X Noto'g'ri login yoki parol" };
                  }
                }}
                onSuccess={() => {
                  onNavigate('s-home');
                  onNotify("Orbit LMS ga xush kelibsiz!");
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ================= 2. HOME SCREEN ================= */}
      {currentScreen === 's-home' && (
        <div className="flex-1 overflow-y-auto px-5 pt-3 pb-24 space-y-4 no-scrollbar">


          {/* Greeting */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 flex items-center justify-center font-display font-bold text-sm shadow-xs">
                SR
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-neutral-900 dark:text-white leading-tight">
                  Salom, Sardor!
                </h2>
                <p className="text-xs text-neutral-500">Bugun ham o'rganishni davom ettiring</p>
              </div>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowNotifs(!showNotifs)}
                className="w-10 h-10 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-800 dark:text-neutral-200 relative hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-neutral-900 dark:bg-white border-2 border-white dark:border-neutral-800" />
              </button>

              {/* Notification dropdown */}
              {showNotifs && (
                <div className="absolute right-0 top-12 w-64 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-3 shadow-xl z-30 space-y-2 animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-700 pb-2">
                    <span className="text-xs font-bold text-neutral-900 dark:text-white">
                      Bildirishnomalar
                    </span>
                    <span className="text-[10px] text-neutral-400">3 ta yangi</span>
                  </div>
                  {notifications.map(n => (
                    <div key={n.id} className="text-xs space-y-0.5 border-b border-neutral-100 dark:border-neutral-700/50 pb-1.5 last:border-none">
                      <p className="font-semibold text-neutral-900 dark:text-white">{n.title}</p>
                      <p className="text-neutral-500 text-[11px] leading-tight">{n.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* AI Banner Card */}
          <div
            onClick={onOpenAITutor}
            className="bg-neutral-900 dark:bg-neutral-800 text-white rounded-3xl p-5 relative overflow-hidden cursor-pointer shadow-md group hover:shadow-lg transition-all"
          >
            <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            <span className="inline-flex items-center gap-1 text-[11px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-white mb-2">
              <Sparkles className="w-3 h-3" />
              AI Tutor
            </span>
            <h3 className="font-display text-lg font-bold leading-snug max-w-[210px]">
              Sun'iy intellekt bilan aqlliroq o'rganing
            </h3>
            <button className="mt-4 px-4 py-2 rounded-full bg-white text-neutral-900 text-xs font-bold flex items-center gap-1.5 shadow-sm group-hover:scale-105 transition-transform">
              Yordamchini ishga tushirish
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Stat Row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-2.5">
                <Clock className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
              </div>
              <b className="font-display text-lg font-bold text-neutral-900 dark:text-white block">
                1.5 soat
              </b>
              <span className="text-xs text-neutral-500">Bugungi darslar</span>
            </div>

            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-2.5">
                <BookOpen className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
              </div>
              <b className="font-display text-lg font-bold text-neutral-900 dark:text-white block">
                10 ta
              </b>
              <span className="text-xs text-neutral-500">Barcha kurslar</span>
            </div>
          </div>

          {/* Active Lessons Section */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h4 className="font-display text-sm font-bold text-neutral-900 dark:text-white">
                Faol darslar
              </h4>
              <button
                onClick={() => onNotify("Barcha darslar ro'yxati ochildi")}
                className="text-xs font-semibold text-neutral-400 hover:text-neutral-800 dark:hover:text-white"
              >
                Barchasi
              </button>
            </div>

            {lessons.map((les, index) => (
              <div
                key={les.id}
                onClick={() => {
                  setSelectedLessonIndex(index);
                  onNavigate('s-lesson');
                }}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-600 transition-all shadow-xs space-y-2.5 active:scale-[0.99]"
              >
                <div className="flex items-center justify-between">
                  <div className="w-7 h-7 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center text-[11px] font-bold">
                    {les.avatarLetter}
                  </div>
                  <span className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-full">
                    ★ {les.rating}
                  </span>
                </div>

                <div>
                  <h5 className="text-sm font-bold text-neutral-900 dark:text-white leading-tight">
                    {les.title}
                  </h5>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {les.studentsCount}+ o'quvchi · {les.durationMinutes} daq
                  </p>
                </div>

                <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-neutral-900 dark:bg-white h-full rounded-full transition-all"
                    style={{ width: `${les.progressPercent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= 3. LESSON SCREEN ================= */}
      {currentScreen === 's-lesson' && (
        <div className="flex-1 overflow-y-auto px-5 pt-3 pb-24 space-y-4 no-scrollbar">


          {/* Topbar */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigate('s-home')}
              className="w-9 h-9 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-800 dark:text-neutral-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h4 className="font-display text-sm font-bold text-neutral-900 dark:text-white">
              Dars
            </h4>
            <button
              onClick={() => onNotify("Dars sozlamalari ochildi")}
              className="w-9 h-9 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-800 dark:text-neutral-200"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          {/* DRM Interactive Video Player Simulation */}
          <div className="relative w-full aspect-video rounded-3xl bg-neutral-950 overflow-hidden flex items-center justify-center shadow-lg border border-neutral-900">
            {/* Drifting Dynamic Watermark (Always Active) */}
            <div
              className="absolute text-[10px] font-mono tracking-wider text-white/50 pointer-events-none transition-all duration-700 ease-in-out select-none"
              style={{ top: `${watermarkPos.top}%`, left: `${watermarkPos.left}%` }}
            >
              SARDOR R. · ID 20481 · {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>

            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-14 h-14 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-xs flex items-center justify-center text-white transition-transform active:scale-95 shadow-xl"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </button>

            {/* Scrub bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20">
              <div
                className="h-full bg-neutral-300 transition-all duration-300"
                style={{ width: `${playbackProgress}%` }}
              />
            </div>
          </div>

          {/* Lesson Title & Info */}
          <div className="space-y-1">
            <h3 className="font-display text-lg font-bold text-neutral-900 dark:text-white">
              {activeLesson.title}
            </h3>
            <p className="text-xs text-neutral-500">
              {activeLesson.subtitle}
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={handlePrevLesson}
              className="py-3 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-bold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
            >
              ← Oldingi
            </button>
            <button
              onClick={handleNextLesson}
              className="py-3 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold shadow-xs hover:opacity-90 transition-opacity"
            >
              Keyingi →
            </button>
          </div>

          {/* Mark Complete Action */}
          <button
            onClick={() => {
              setIsCompleted(!isCompleted);
              onNotify(isCompleted ? "Bajarilmagan deb belgilandi" : "✓ Dars bajarildi deb belgilandi!");
            }}
            className={`w-full py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
              isCompleted
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white'
                : 'bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            {isCompleted ? '✓ Bajarildi' : 'Bajarildi deb belgilash'}
          </button>

          {/* Resources */}
          <div className="space-y-2.5 pt-2">
            <h4 className="font-display text-sm font-bold text-neutral-900 dark:text-white">
              Resurslar
            </h4>

            {activeLesson.resources.map(res => (
              <div
                key={res.id}
                onClick={() => onNotify(`Yuklab olinmoqda: ${res.title}`)}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/70 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-300">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-900 dark:text-white">
                      {res.title}
                    </p>
                    <span className="text-[11px] text-neutral-400">{res.size}</span>
                  </div>
                </div>
                <Download className="w-4 h-4 text-neutral-400 hover:text-neutral-900 dark:hover:text-white" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= 4. SCHEDULE SCREEN ================= */}
      {currentScreen === 's-schedule' && (
        <div className="flex-1 overflow-y-auto px-5 pt-3 pb-24 space-y-4 no-scrollbar">


          {/* Topbar */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigate('s-home')}
              className="w-9 h-9 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-800 dark:text-neutral-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h4 className="font-display text-sm font-bold text-neutral-900 dark:text-white">
              Dars jadvali
            </h4>
            <div className="w-9" />
          </div>

          {/* Day Strip */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
            {scheduleDays.map(item => {
              const isActive = selectedDay === item.day;
              return (
                <button
                  key={item.day}
                  onClick={() => setSelectedDay(item.day)}
                  className={`min-w-[54px] py-3 rounded-2xl border flex flex-col items-center gap-1 transition-all ${
                    isActive
                      ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white shadow-sm'
                      : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                  }`}
                >
                  <span className="text-[11px] font-medium">{item.dayName}</span>
                  <b className="font-display text-base font-bold">{item.day}</b>
                </button>
              );
            })}
          </div>

          {/* My Plan Timeline */}
          <div className="space-y-3 pt-2">
            <h4 className="font-display text-sm font-bold text-neutral-900 dark:text-white">
              Mening rejam
            </h4>

            {scheduleEvents.map((ev, idx) => (
              <div key={ev.id} className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-12 text-xs font-bold text-neutral-400 shrink-0 pt-3">
                    {ev.time}
                  </div>
                  <div className="w-1 self-stretch bg-neutral-400 dark:bg-neutral-600 rounded-full shrink-0" />
                  <div className="flex-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-3.5 shadow-xs">
                    <h5 className="text-xs font-bold text-neutral-900 dark:text-white">
                      {ev.title}
                    </h5>
                    <span className="text-[11px] text-neutral-500 block mt-0.5">
                      {ev.duration} · {ev.category}
                    </span>
                  </div>
                </div>

                {/* Gap note between 2nd and 3rd event */}
                {idx === 1 && (
                  <div className="pl-16 text-[11px] text-neutral-400 italic">
                    12:00 – 14:00 oralig'ida darslar yo'q
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= 5. QUIZZES SCREEN ================= */}
      {currentScreen === 's-quizzes' && (
        <div className="flex-1 overflow-y-auto px-5 pt-3 pb-24 space-y-4 no-scrollbar">


          <div className="flex items-center justify-between">
            <h4 className="font-display text-lg font-bold text-neutral-900 dark:text-white">
              Testlar
            </h4>
            <button
              onClick={() => onNotify("Barcha testlar ro'yxati yangilandi")}
              className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            >
              Yangilash
            </button>
          </div>

          <div className="space-y-3">
            {quizzes.map(quiz => (
              <div
                key={quiz.id}
                onClick={() => onTakeQuiz(quiz)}
                className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-600 transition-all shadow-xs active:scale-[0.99]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-800 dark:text-neutral-200">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-neutral-900 dark:text-white">
                      {quiz.title}
                    </h5>
                    <span className="text-[11px] text-neutral-500 block mt-0.5">
                      {quiz.description}
                    </span>
                  </div>
                </div>

                <div
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    quiz.score !== null && quiz.score !== undefined
                      ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white'
                      : 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                  }`}
                >
                  {quiz.score !== null && quiz.score !== undefined ? `${quiz.score}%` : 'Boshlash'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= 6. SETTINGS SCREEN ================= */}
      {currentScreen === 's-settings' && (
        <div className="flex-1 overflow-y-auto px-5 pt-3 pb-24 space-y-4 no-scrollbar">


          {/* Profile Head */}
          <div className="flex flex-col items-center text-center py-2">
            <div className="w-20 h-20 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center font-display font-bold text-2xl mb-2.5 shadow-md">
              SR
            </div>
            <h3 className="font-display text-base font-bold text-neutral-900 dark:text-white">
              Sardor Rasulov
            </h3>
            <span className="text-xs text-neutral-500">O'quvchi · ID 20481</span>
          </div>

          {/* Settings Rows */}
          <div className="space-y-1 divide-y divide-neutral-200 dark:divide-neutral-800 text-xs">
            {/* Dark mode switch */}
            <div
              onClick={onToggleDarkMode}
              className="flex items-center justify-between py-3.5 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-300">
                  <Moon className="w-4 h-4" />
                </div>
                <div>
                  <b className="text-neutral-900 dark:text-white block font-semibold">Tungi rejim</b>
                  <small className="text-neutral-500">Ko'zga yengil qorong'i mavzu</small>
                </div>
              </div>
              <div
                className={`w-11 h-6 rounded-full transition-colors relative flex items-center ${
                  isDarkMode ? 'bg-neutral-900 dark:bg-white' : 'bg-neutral-200 dark:bg-neutral-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white dark:bg-neutral-900 transition-transform ${
                    isDarkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </div>
            </div>

            {/* Notifications switch */}
            <div
              onClick={() => {
                setNotifEnabled(!notifEnabled);
                onNotify(notifEnabled ? "Bildirishnomalar o'chirildi" : "Bildirishnomalar yoqildi");
              }}
              className="flex items-center justify-between py-3.5 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-300">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <b className="text-neutral-900 dark:text-white block font-semibold">Bildirishnomalar</b>
                  <small className="text-neutral-500">Yangi dars va javoblar haqida</small>
                </div>
              </div>
              <div
                className={`w-11 h-6 rounded-full transition-colors relative flex items-center ${
                  notifEnabled ? 'bg-neutral-900 dark:bg-white' : 'bg-neutral-200 dark:bg-neutral-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white dark:bg-neutral-900 transition-transform ${
                    notifEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </div>
            </div>

            {/* Security Status (Always Active) */}
            <div className="flex items-center justify-between py-3.5 px-3 rounded-2xl bg-neutral-100/80 dark:bg-neutral-850/80 border border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <b className="text-neutral-900 dark:text-white block font-semibold text-xs">
                    DRM 3.0 Xavfsizlik tizimi
                  </b>
                  <small className="text-neutral-500 text-[11px]">Skrinshot va yozish avtomatik bloklangan</small>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                Faol
              </span>
            </div>

            {/* APK / PWA Install item */}
            <div
              onClick={() => {
                if (onOpenAPKModal) {
                  onOpenAPKModal();
                } else {
                  onNotify("APK / PWA o'rnatish oynasi ochilmoqda");
                }
              }}
              className="flex items-center justify-between py-3.5 cursor-pointer bg-emerald-500/10 dark:bg-emerald-500/15 px-3 rounded-2xl border border-emerald-500/20 my-1"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                  <DownloadCloud className="w-4 h-4" />
                </div>
                <div>
                  <b className="text-emerald-950 dark:text-emerald-300 block font-semibold">
                    Ilovani o'rnatish (APK / PWA)
                  </b>
                  <small className="text-emerald-700 dark:text-emerald-400">Telefoningizga to'liq o'rnatish</small>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>

            {/* Devices item */}
            <div
              onClick={() => onNotify("1 ta qurilma ulangan: Android / iOS (Ushbu qurilma)")}
              className="flex items-center justify-between py-3.5 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-300">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <b className="text-neutral-900 dark:text-white block font-semibold">Faol qurilmalar</b>
                  <small className="text-neutral-500">1 ta qurilma ulangan</small>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </div>
          </div>

          <button
            onClick={() => onNotify("Tizimdan muvaffaqiyatli chiqildi")}
            className="w-full mt-4 py-3.5 rounded-2xl bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white font-semibold text-xs hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
          >
            Chiqish
          </button>
        </div>
      )}

      {/* ================= STUDENT BOTTOM TABBAR ================= */}
      {currentScreen !== 's-onboard' && (
        <div className="absolute bottom-4 left-5 right-5 h-16 bg-[#0B0B0B] dark:bg-neutral-900/95 border border-neutral-800 rounded-full flex items-center justify-around px-2 z-20 shadow-2xl backdrop-blur-md">
          <button
            onClick={() => onNavigate('s-home')}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
              currentScreen === 's-home'
                ? 'bg-white text-neutral-950'
                : 'text-neutral-400 hover:text-white'
            }`}
            title="Bosh sahifa"
          >
            <Layers className="w-5 h-5" />
          </button>

          <button
            onClick={() => onNavigate('s-schedule')}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
              currentScreen === 's-schedule'
                ? 'bg-white text-neutral-950'
                : 'text-neutral-400 hover:text-white'
            }`}
            title="Dars jadvali"
          >
            <Calendar className="w-5 h-5" />
          </button>

          <button
            onClick={() => onNavigate('s-lesson')}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
              currentScreen === 's-lesson'
                ? 'bg-white text-neutral-950'
                : 'text-neutral-400 hover:text-white'
            }`}
            title="Dars"
          >
            <BookOpen className="w-5 h-5" />
          </button>

          <button
            onClick={() => onNavigate('s-quizzes')}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
              currentScreen === 's-quizzes'
                ? 'bg-white text-neutral-950'
                : 'text-neutral-400 hover:text-white'
            }`}
            title="Testlar"
          >
            <HelpCircle className="w-5 h-5" />
          </button>

          <button
            onClick={() => onNavigate('s-settings')}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
              currentScreen === 's-settings'
                ? 'bg-white text-neutral-950'
                : 'text-neutral-400 hover:text-white'
            }`}
            title="Sozlamalar"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
