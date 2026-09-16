import { useState, useEffect, FormEvent } from 'react';
import {
  TeacherScreen,
  GroupItem,
  AppUser,
  AppNotification
} from '../types';
import {
  Bell,
  Video,
  Users,
  Layers,
  Radio,
  Settings,
  ChevronLeft,
  Moon,
  Plus,
  Send,
  Sparkles,
  DownloadCloud
} from 'lucide-react';

interface TeacherViewProps {
  currentScreen: TeacherScreen;
  onNavigate: (screen: TeacherScreen) => void;
  groups: GroupItem[];
  students: AppUser[];
  notifications: AppNotification[];
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenAddLesson: () => void;
  onSelectStudent: (student: AppUser) => void;
  onNotify: (msg: string) => void;
  onOpenAPKModal?: () => void;
}

interface ChatItem {
  id: string;
  sender: string;
  avatar: string;
  text: string;
  time: string;
}

export default function TeacherView({
  currentScreen,
  onNavigate,
  groups,
  students,
  notifications,
  isDarkMode,
  onToggleDarkMode,
  onOpenAddLesson,
  onSelectStudent,
  onNotify,
  onOpenAPKModal
}: TeacherViewProps) {
  const [showNotifs, setShowNotifs] = useState(false);

  // Live stream state
  const [isLiveActive, setIsLiveActive] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);
  const [questionsCount, setQuestionsCount] = useState(0);
  const [chatMessages, setChatMessages] = useState<ChatItem[]>([
    {
      id: 'c-1',
      sender: 'Sardor Rasulov',
      avatar: 'SR',
      text: 'Flexbox va CSS Grid farqini qisqa amaliyotda ko\'rsatib bera olasizmi?',
      time: '09:41'
    }
  ]);
  const [replyText, setReplyText] = useState('');

  // Settings
  const [notifEnabled, setNotifEnabled] = useState(true);

  // Live stream simulation timer
  useEffect(() => {
    if (!isLiveActive) return;
    const timer = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 3) + 1);
      if (Math.random() > 0.6) {
        setQuestionsCount(prev => prev + 1);
      }
    }, 2000);
    return () => clearInterval(timer);
  }, [isLiveActive]);

  const toggleLiveStream = () => {
    if (!isLiveActive) {
      setIsLiveActive(true);
      setViewerCount(18);
      setQuestionsCount(1);
      onNotify("Jonli efir boshlandi — guruh o'quvchilariga xabar yuborildi");
    } else {
      setIsLiveActive(false);
      onNotify("Efir yakunlandi — yozuv avtomatik tarzda guruhga saqlandi");
    }
  };

  const handleSendLiveReply = (e: FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    const newMsg: ChatItem = {
      id: Date.now().toString(),
      sender: 'Malika Umarova (Ustoz)',
      avatar: 'MU',
      text: replyText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => [...prev, newMsg]);
    setReplyText('');
    onNotify("Javob efir chatiga yuborildi");
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#F4F4F4] dark:bg-neutral-950 text-[#0E0E0E] dark:text-neutral-100 transition-colors">
      {/* ================= 1. TEACHER HOME ================= */}
      {currentScreen === 't-home' && (
        <div className="flex-1 overflow-y-auto px-5 pt-3 pb-24 space-y-4 no-scrollbar">


          {/* Greeting */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 flex items-center justify-center font-display font-bold text-sm shadow-xs">
                MU
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-neutral-900 dark:text-white leading-tight">
                  Xush kelibsiz, Malika!
                </h2>
                <p className="text-xs text-neutral-500">3 ta guruh · 74 o'quvchi</p>
              </div>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowNotifs(!showNotifs)}
                className="w-10 h-10 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-800 dark:text-neutral-200 relative hover:bg-neutral-50"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-neutral-900 dark:bg-white border-2 border-white dark:border-neutral-800" />
              </button>

              {showNotifs && (
                <div className="absolute right-0 top-12 w-64 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-3 shadow-xl z-30 space-y-2 animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-700 pb-2">
                    <span className="text-xs font-bold text-neutral-900 dark:text-white">
                      Ustoz bildirishnomalari
                    </span>
                    <span className="text-[10px] text-neutral-400">2 ta yangi</span>
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

          {/* Stat Row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-2.5">
                <Video className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
              </div>
              <b className="font-display text-lg font-bold text-neutral-900 dark:text-white block">
                18 ta
              </b>
              <span className="text-xs text-neutral-500">Yuklangan darslar</span>
            </div>

            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-2.5">
                <Users className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
              </div>
              <b className="font-display text-lg font-bold text-neutral-900 dark:text-white block">
                74
              </b>
              <span className="text-xs text-neutral-500">O'quvchilar</span>
            </div>
          </div>

          {/* Guruhlarim List */}
          <div className="space-y-2.5 pt-2">
            <div className="flex items-center justify-between">
              <h4 className="font-display text-sm font-bold text-neutral-900 dark:text-white">
                Guruhlarim
              </h4>
              <button
                onClick={() => onNavigate('t-students')}
                className="text-xs font-semibold text-neutral-400 hover:text-neutral-800 dark:hover:text-white"
              >
                O'quvchilar ro'yxati
              </button>
            </div>

            {groups.map(grp => (
              <div
                key={grp.id}
                onClick={() => onNavigate('t-students')}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-600 transition-all shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center text-xs font-bold font-display">
                    {grp.teacherAvatar}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-neutral-900 dark:text-white">
                      {grp.name}
                    </h5>
                    <span className="text-[11px] text-neutral-500">{grp.studentsCount} o'quvchi</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-16 bg-neutral-200 dark:bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-neutral-900 dark:bg-white h-full"
                      style={{ width: `${grp.averageProgress}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                    {grp.averageProgress}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="space-y-2.5 pt-2">
            <h4 className="font-display text-sm font-bold text-neutral-900 dark:text-white">
              Tezkor amallar
            </h4>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={onOpenAddLesson}
                className="py-3 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs hover:opacity-90 transition-opacity"
              >
                <Plus className="w-4 h-4" />
                Yangi dars
              </button>
              <button
                onClick={() => onNavigate('t-live')}
                className="py-3 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-bold text-neutral-800 dark:text-neutral-200 flex items-center justify-center gap-1.5 hover:bg-neutral-50"
              >
                <Radio className="w-4 h-4 text-rose-500" />
                Efir boshlash
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= 2. LIVE SCREEN ================= */}
      {currentScreen === 't-live' && (
        <div className="flex-1 overflow-y-auto px-5 pt-3 pb-24 space-y-4 no-scrollbar">


          {/* Topbar */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigate('t-home')}
              className="w-9 h-9 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-800 dark:text-neutral-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h4 className="font-display text-sm font-bold text-neutral-900 dark:text-white">
              Jonli efir studiyasi
            </h4>
            <div className="w-9" />
          </div>

          {/* Broadcast Monitor */}
          <div className="relative w-full aspect-video rounded-3xl bg-neutral-950 border border-neutral-800 overflow-hidden flex flex-col justify-between p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/80 border border-neutral-700 backdrop-blur-xs text-white text-[11px] font-bold">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isLiveActive ? 'bg-rose-500 animate-ping' : 'bg-neutral-500'
                  }`}
                />
                <span>{isLiveActive ? 'JONLI EFIRDA' : 'EFIRGA TAYYOR'}</span>
              </div>

              {isLiveActive && (
                <div className="px-2.5 py-0.5 rounded-full bg-black/60 text-white text-[11px] font-mono">
                  {new Date().toLocaleTimeString()}
                </div>
              )}
            </div>

            <div className="text-center">
              <Sparkles className="w-8 h-8 text-neutral-700 mx-auto mb-1 animate-pulse" />
              <p className="text-[11px] text-neutral-500 font-mono">
                {isLiveActive ? 'Kamera & Mikrofon faol' : 'Stream signali kutilmoqda'}
              </p>
            </div>

            <div className="text-[10px] text-neutral-500 font-mono text-right">
              Orbit Live Hub v2.4
            </div>
          </div>

          {/* Live Action Toggle */}
          <button
            onClick={toggleLiveStream}
            className={`w-full py-3.5 rounded-full font-bold text-xs shadow-md transition-all ${
              isLiveActive
                ? 'bg-rose-600 hover:bg-rose-700 text-white'
                : 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:opacity-90'
            }`}
          >
            {isLiveActive ? 'Efirni yakunlash' : 'Efirni boshlash'}
          </button>

          {/* Live Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <span className="text-[11px] text-neutral-500 block">Tomoshabinlar</span>
              <b className="text-base font-display font-bold text-neutral-900 dark:text-white">
                {viewerCount} ta o'quvchi
              </b>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <span className="text-[11px] text-neutral-500 block">Savollar</span>
              <b className="text-base font-display font-bold text-neutral-900 dark:text-white">
                {questionsCount} ta yangi
              </b>
            </div>
          </div>

          {/* Live Chat / Questions Feed */}
          <div className="space-y-2.5 pt-1">
            <h4 className="font-display text-sm font-bold text-neutral-900 dark:text-white">
              Chat va Savollar
            </h4>

            <div className="space-y-2">
              {chatMessages.map(msg => (
                <div
                  key={msg.id}
                  className="p-3 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs space-y-1 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-[10px]">
                        {msg.avatar}
                      </span>
                      {msg.sender}
                    </span>
                    <span className="text-[10px] text-neutral-400">{msg.time}</span>
                  </div>
                  <p className="text-neutral-700 dark:text-neutral-300 pl-6 leading-relaxed">
                    {msg.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick response form */}
            <form onSubmit={handleSendLiveReply} className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                placeholder="Efirda javob yozish..."
                className="flex-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-full px-4 py-2 text-xs text-neutral-900 dark:text-white focus:outline-none"
              />
              <button
                type="submit"
                className="w-8 h-8 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================= 3. STUDENTS ANALYTICS SCREEN ================= */}
      {currentScreen === 't-students' && (
        <div className="flex-1 overflow-y-auto px-5 pt-3 pb-24 space-y-4 no-scrollbar">


          {/* Topbar */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigate('t-home')}
              className="w-9 h-9 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-800 dark:text-neutral-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h4 className="font-display text-sm font-bold text-neutral-900 dark:text-white">
              Frontend-24 · O'quvchilar
            </h4>
            <div className="w-9" />
          </div>

          <div className="space-y-2.5">
            {students.map(std => (
              <div
                key={std.id}
                onClick={() => onSelectStudent(std)}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-600 transition-all shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center font-display font-bold text-xs">
                    {std.avatar}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-neutral-900 dark:text-white">
                      {std.name}
                    </h5>
                    <span className="text-[11px] text-neutral-500">
                      Faollik: {std.lastActive}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-14 bg-neutral-200 dark:bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-neutral-900 dark:bg-white h-full"
                      style={{ width: `${std.progressPercent || 0}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                    {std.progressPercent}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= 4. TEACHER SETTINGS ================= */}
      {currentScreen === 't-settings' && (
        <div className="flex-1 overflow-y-auto px-5 pt-3 pb-24 space-y-4 no-scrollbar">


          {/* Profile Head */}
          <div className="flex flex-col items-center text-center py-2">
            <div className="w-20 h-20 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center font-display font-bold text-2xl mb-2.5 shadow-md">
              MU
            </div>
            <h3 className="font-display text-base font-bold text-neutral-900 dark:text-white">
              Malika Umarova
            </h3>
            <span className="text-xs text-neutral-500">Ustoz · Frontend & Dizayn</span>
          </div>

          {/* Settings Rows */}
          <div className="space-y-1 divide-y divide-neutral-200 dark:divide-neutral-800 text-xs">
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
                  <small className="text-neutral-500">Qorong'i mavzu</small>
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
                  <small className="text-neutral-500">Yangi savol va topshiriqlar</small>
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

            {/* APK Install option */}
            <div
              onClick={() => {
                if (onOpenAPKModal) {
                  onOpenAPKModal();
                } else {
                  onNotify("APK yuklash oynasi ochilmoqda");
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
                  <small className="text-emerald-700 dark:text-emerald-400">Telefoningizga yuklash</small>
                </div>
              </div>
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

      {/* Floating Action Button for Teacher */}
      <button
        onClick={onOpenAddLesson}
        className="absolute bottom-22 right-6 w-13 h-13 rounded-full bg-[#0B0B0B] dark:bg-white text-white dark:text-neutral-950 flex items-center justify-center text-2xl font-light shadow-2xl z-30 hover:scale-105 active:scale-95 transition-transform"
        title="Yangi dars qo'shish"
      >
        +
      </button>

      {/* ================= TEACHER TABBAR ================= */}
      <div className="absolute bottom-4 left-5 right-5 h-16 bg-[#0B0B0B] dark:bg-neutral-900/95 border border-neutral-800 rounded-full flex items-center justify-around px-2 z-20 shadow-2xl backdrop-blur-md">
        <button
          onClick={() => onNavigate('t-home')}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
            currentScreen === 't-home'
              ? 'bg-white text-neutral-950'
              : 'text-neutral-400 hover:text-white'
          }`}
          title="Bosh sahifa"
        >
          <Layers className="w-5 h-5" />
        </button>

        <button
          onClick={() => onNavigate('t-students')}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
            currentScreen === 't-students'
              ? 'bg-white text-neutral-950'
              : 'text-neutral-400 hover:text-white'
          }`}
          title="O'quvchilar"
        >
          <Users className="w-5 h-5" />
        </button>

        <button
          onClick={() => onNavigate('t-live')}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
            currentScreen === 't-live'
              ? 'bg-white text-neutral-950'
              : 'text-neutral-400 hover:text-white'
          }`}
          title="Jonli efir"
        >
          <Radio className="w-5 h-5" />
        </button>

        <button
          onClick={() => onNavigate('t-settings')}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
            currentScreen === 't-settings'
              ? 'bg-white text-neutral-950'
              : 'text-neutral-400 hover:text-white'
          }`}
          title="Sozlamalar"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
