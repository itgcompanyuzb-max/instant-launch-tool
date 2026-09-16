import { UserRole } from '../types';
import { Smartphone, Monitor, Sun, Moon, Sparkles, DownloadCloud } from 'lucide-react';

interface TopRoleBarProps {
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  isDesktopView: boolean;
  onToggleDesktopView: () => void;
  onOpenAITutor: () => void;
  onOpenAPKModal: () => void;
}

export default function TopRoleBar({
  currentRole,
  onSelectRole,
  isDarkMode,
  onToggleDarkMode,
  isDesktopView,
  onToggleDesktopView,
  onOpenAITutor,
  onOpenAPKModal
}: TopRoleBarProps) {
  return (
    <header className="w-full max-w-5xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-2.5 sticky top-0 z-50 backdrop-blur-md bg-[#ECECEC]/90 dark:bg-neutral-950/90 border-b border-neutral-300/60 dark:border-neutral-800 transition-colors">
      {/* Brand logo & tagline */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center font-display font-bold text-base shadow-sm">
          O
        </div>
        <div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="font-display font-bold tracking-tight text-neutral-900 dark:text-white text-sm sm:text-base">
              Orbit LMS
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase font-semibold px-1.5 sm:px-2 py-0.5 rounded-full bg-neutral-800 text-white dark:bg-neutral-200 dark:text-neutral-900">
              Prototip
            </span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-neutral-600 dark:text-neutral-400 font-medium">
            Smart LMS Platforma
          </p>
        </div>
      </div>

      {/* Role Picker Pill */}
      <div className="bg-[#0B0B0B] dark:bg-neutral-800 p-1 rounded-full flex items-center gap-0.5 sm:gap-1 shadow-lg">
        <button
          id="btn-role-student"
          onClick={() => onSelectRole('student')}
          className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs font-semibold transition-all ${
            currentRole === 'student'
              ? 'bg-white text-neutral-900 shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          O'quvchi
        </button>
        <button
          id="btn-role-teacher"
          onClick={() => onSelectRole('teacher')}
          className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs font-semibold transition-all ${
            currentRole === 'teacher'
              ? 'bg-white text-neutral-900 shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Ustoz
        </button>
        <button
          id="btn-role-admin"
          onClick={() => onSelectRole('admin')}
          className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs font-semibold transition-all ${
            currentRole === 'admin'
              ? 'bg-white text-neutral-900 shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Admin
        </button>
      </div>

      {/* Quick Controls: APK Install, AI Tutor, Layout View & Dark Mode */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <button
          id="btn-top-apk"
          onClick={onOpenAPKModal}
          title="APK / Ilovani o'rnatish"
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-emerald-600 dark:bg-emerald-500 text-white text-xs font-bold shadow-sm hover:opacity-90 active:scale-95 transition-all"
        >
          <DownloadCloud className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">APK / O'rnatish</span>
        </button>

        <button
          id="btn-top-ai-tutor"
          onClick={onOpenAITutor}
          title="Orbit AI Yordamchi"
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-semibold shadow-sm hover:opacity-90 active:scale-95 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">AI Tutor</span>
        </button>

        <button
          id="btn-toggle-viewmode"
          onClick={onToggleDesktopView}
          title={isDesktopView ? "Mobil ko'rinishga o'tish" : "Kengaytirilgan ekranga o'tish"}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700 flex items-center justify-center text-xs font-medium hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-all shadow-sm"
        >
          {isDesktopView ? <Smartphone className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
        </button>

        <button
          id="btn-toggle-darkmode"
          onClick={onToggleDarkMode}
          title="Mavzuni almashtirish (Oq / Qora)"
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-all shadow-sm"
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-700" />}
        </button>
      </div>
    </header>
  );
}
