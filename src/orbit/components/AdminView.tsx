import { useState } from 'react';
import {
  AdminScreen,
  AppUser,
  GroupItem,
  ContentMaterial,
  BannerItem,
  AppNotification
} from '../types';
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  Plus,
  Users,
  Layers,
  FolderKanban,
  FileText,
  Image,
  Settings,
  Moon,
  Trash2,
  Lock,
  Unlock,
  RotateCcw,
  DownloadCloud
} from 'lucide-react';

interface AdminViewProps {
  currentScreen: AdminScreen;
  onNavigate: (screen: AdminScreen) => void;
  users: AppUser[];
  groups: GroupItem[];
  materials: ContentMaterial[];
  banners: BannerItem[];
  notifications: AppNotification[];
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenAddUser: () => void;
  onOpenAddGroup: () => void;
  onOpenAddBanner: () => void;
  onToggleUserStatus: (userId: string) => void;
  onResetDevices: (userId?: string) => void;
  onDeleteBanner: (bannerId: string) => void;
  onNotify: (msg: string) => void;
  onOpenAPKModal?: () => void;
}

export default function AdminView({
  currentScreen,
  onNavigate,
  users,
  groups,
  materials,
  banners,
  notifications,
  isDarkMode,
  onToggleDarkMode,
  onOpenAddUser,
  onOpenAddGroup,
  onOpenAddBanner,
  onToggleUserStatus,
  onResetDevices,
  onDeleteBanner,
  onNotify,
  onOpenAPKModal
}: AdminViewProps) {
  const [showNotifs, setShowNotifs] = useState(false);
  const [maxDeviceLimit, setMaxDeviceLimit] = useState(2);

  return (
    <div className="relative w-full h-full flex flex-col bg-[#F4F4F4] dark:bg-neutral-950 text-[#0E0E0E] dark:text-neutral-100 transition-colors">
      {/* ================= 1. ADMIN HOME ================= */}
      {currentScreen === 'a-home' && (
        <div className="flex-1 overflow-y-auto px-5 pt-3 pb-24 space-y-4 no-scrollbar">


          {/* Greeting */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 flex items-center justify-center font-display font-bold text-sm shadow-xs">
                AD
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-neutral-900 dark:text-white leading-tight">
                  Admin panel
                </h2>
                <p className="text-xs text-neutral-500">Tizim holati: barqaror</p>
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
                      Tizim xabarlari
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

          {/* 2x2 Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
              <b className="font-display text-xl font-bold text-neutral-900 dark:text-white block">
                612
              </b>
              <span className="text-xs text-neutral-500">Foydalanuvchilar</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
              <b className="font-display text-xl font-bold text-neutral-900 dark:text-white block">
                24
              </b>
              <span className="text-xs text-neutral-500">Guruhlar</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
              <b className="font-display text-xl font-bold text-neutral-900 dark:text-white block">
                310
              </b>
              <span className="text-xs text-neutral-500">Yuklangan darslar</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
              <b className="font-display text-xl font-bold text-neutral-900 dark:text-white block">
                18
              </b>
              <span className="text-xs text-neutral-500">Ustozlar</span>
            </div>
          </div>

          {/* Navigation Management Items */}
          <div className="space-y-2.5 pt-2">
            <h4 className="font-display text-sm font-bold text-neutral-900 dark:text-white">
              Boshqaruv
            </h4>

            <div
              onClick={() => onNavigate('a-users')}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-600 transition-all shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center font-bold text-xs">
                  U
                </div>
                <div>
                  <h5 className="text-xs font-bold text-neutral-900 dark:text-white">
                    Foydalanuvchilar va qurilmalar
                  </h5>
                  <span className="text-[11px] text-neutral-500">
                    Qo'shish, bloklash, limit belgilash
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </div>

            <div
              onClick={() => onNavigate('a-groups')}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-600 transition-all shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center font-bold text-xs">
                  G
                </div>
                <div>
                  <h5 className="text-xs font-bold text-neutral-900 dark:text-white">
                    Guruhlar va kontent
                  </h5>
                  <span className="text-[11px] text-neutral-500">
                    Guruh yaratish, biriktirish
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </div>

            <div
              onClick={() => onNavigate('a-content')}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-600 transition-all shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center font-bold text-xs">
                  M
                </div>
                <div>
                  <h5 className="text-xs font-bold text-neutral-900 dark:text-white">
                    Yuklangan materiallar
                  </h5>
                  <span className="text-[11px] text-neutral-500">
                    Ustoz va admin fayllari
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </div>

            <div
              onClick={() => onNavigate('a-banners')}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-600 transition-all shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center font-bold text-xs">
                  B
                </div>
                <div>
                  <h5 className="text-xs font-bold text-neutral-900 dark:text-white">
                    Banerlar
                  </h5>
                  <span className="text-[11px] text-neutral-500">Bosh sahifa e'lonlari</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </div>
          </div>
        </div>
      )}

      {/* ================= 2. ADMIN USERS & DEVICES ================= */}
      {currentScreen === 'a-users' && (
        <div className="flex-1 overflow-y-auto px-5 pt-3 pb-24 space-y-4 no-scrollbar">


          {/* Topbar */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigate('a-home')}
              className="w-9 h-9 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-800 dark:text-neutral-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h4 className="font-display text-sm font-bold text-neutral-900 dark:text-white">
              Foydalanuvchilar
            </h4>
            <button
              onClick={onOpenAddUser}
              className="w-9 h-9 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center text-sm font-bold"
              title="Yangi foydalanuvchi"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* User List */}
          <div className="space-y-2.5">
            {users.map(u => (
              <div
                key={u.id}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-xs ${
                      u.status === 'Bloklangan'
                        ? 'bg-neutral-900 text-white dark:bg-neutral-800'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white'
                    }`}
                  >
                    {u.avatar}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-neutral-900 dark:text-white">
                      {u.name}
                    </h5>
                    <span className="text-[11px] text-neutral-500">
                      {u.role} · {u.devicesCount} qurilma
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onToggleUserStatus(u.id);
                      onNotify(
                        u.status === 'Faol'
                          ? `${u.name} bloklandi`
                          : `${u.name} blokdan chiqarildi`
                      );
                    }}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold transition-colors flex items-center gap-1 ${
                      u.status === 'Faol'
                        ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-rose-100 dark:hover:bg-rose-950'
                        : 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                    }`}
                  >
                    {u.status === 'Faol' ? (
                      <>
                        <Unlock className="w-3 h-3 text-emerald-500" />
                        Faol
                      </>
                    ) : (
                      <>
                        <Lock className="w-3 h-3 text-rose-300" />
                        Bloklangan
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Device Limit Policy */}
          <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
            <h4 className="font-display text-xs font-bold text-neutral-900 dark:text-white">
              Qurilmalar sozlamalari
            </h4>

            <div className="flex items-center justify-between text-xs">
              <div>
                <b className="block text-neutral-800 dark:text-neutral-200 font-semibold">
                  Maksimal qurilmalar soni
                </b>
                <small className="text-neutral-500">Har bir o'quvchi uchun</small>
              </div>

              <select
                value={maxDeviceLimit}
                onChange={e => {
                  setMaxDeviceLimit(Number(e.target.value));
                  onNotify(`Qurilma limiti ${e.target.value} taga o'zgartirildi`);
                }}
                className="px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white text-xs font-semibold focus:outline-none"
              >
                <option value={1}>1 ta</option>
                <option value={2}>2 ta</option>
                <option value={3}>3 ta</option>
              </select>
            </div>

            <button
              onClick={() => {
                onResetDevices();
                onNotify("Barcha o'quvchilar qurilma sessiyalari tozalandi");
              }}
              className="w-full py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Barcha qurilmalarni tozalash
            </button>
          </div>
        </div>
      )}

      {/* ================= 3. ADMIN GROUPS ================= */}
      {currentScreen === 'a-groups' && (
        <div className="flex-1 overflow-y-auto px-5 pt-3 pb-24 space-y-4 no-scrollbar">


          {/* Topbar */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigate('a-home')}
              className="w-9 h-9 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-800 dark:text-neutral-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h4 className="font-display text-sm font-bold text-neutral-900 dark:text-white">
              Guruhlar
            </h4>
            <button
              onClick={onOpenAddGroup}
              className="w-9 h-9 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center text-sm font-bold"
              title="Yangi guruh"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Groups List */}
          <div className="space-y-2.5">
            {groups.map(grp => (
              <div
                key={grp.id}
                onClick={() => onNotify(`"${grp.name}" guruhi ochildi — Ustoz: ${grp.teacher}`)}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-600 transition-all shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center font-bold text-xs font-display">
                    {grp.teacherAvatar}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-neutral-900 dark:text-white">
                      {grp.name}
                    </h5>
                    <span className="text-[11px] text-neutral-500">
                      Ustoz: {grp.teacher} · {grp.studentsCount} o'quvchi
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-2">
            <button
              onClick={() => onNotify("O'quvchini guruhga biriktirish oynasi ochildi")}
              className="py-3 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-bold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50"
            >
              O'quvchi biriktirish
            </button>
            <button
              onClick={() => onNotify("Ustozni guruhga biriktirish oynasi ochildi")}
              className="py-3 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-bold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50"
            >
              Ustoz biriktirish
            </button>
          </div>
        </div>
      )}

      {/* ================= 4. ADMIN CONTENT MATERIALS ================= */}
      {currentScreen === 'a-content' && (
        <div className="flex-1 overflow-y-auto px-5 pt-3 pb-24 space-y-4 no-scrollbar">


          {/* Topbar */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigate('a-home')}
              className="w-9 h-9 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-800 dark:text-neutral-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h4 className="font-display text-sm font-bold text-neutral-900 dark:text-white">
              Yuklangan materiallar
            </h4>
            <div className="w-9" />
          </div>

          <div className="space-y-2.5">
            {materials.map(mat => (
              <div
                key={mat.id}
                onClick={() => onNotify(`${mat.title} yuklab olinmoqda (${mat.size})`)}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/70 transition-colors shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-300">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-neutral-900 dark:text-white">
                      {mat.title}
                    </h5>
                    <span className="text-[11px] text-neutral-500">
                      {mat.uploaderRole}: {mat.uploader} · {mat.size}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= 5. ADMIN BANNERS ================= */}
      {currentScreen === 'a-banners' && (
        <div className="flex-1 overflow-y-auto px-5 pt-3 pb-24 space-y-4 no-scrollbar">


          {/* Topbar */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigate('a-home')}
              className="w-9 h-9 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-800 dark:text-neutral-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h4 className="font-display text-sm font-bold text-neutral-900 dark:text-white">
              Banerlar
            </h4>
            <div className="w-9" />
          </div>

          {/* Banner items */}
          <div className="space-y-3">
            {banners.map(ban => (
              <div key={ban.id} className="space-y-2">
                <div className="w-full aspect-[2.2] rounded-2xl bg-neutral-800 text-white p-5 flex flex-col justify-between shadow-md relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/20 text-white">
                      Faol baner
                    </span>
                    <button
                      onClick={() => {
                        onDeleteBanner(ban.id);
                        onNotify("Baner o'chirildi");
                      }}
                      className="p-1 rounded-full bg-black/40 text-neutral-300 hover:text-white"
                      title="O'chirish"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold">{ban.title}</h3>
                    <p className="text-xs text-neutral-300 mt-0.5">{ban.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-2">
            <button
              onClick={onOpenAddBanner}
              className="py-3 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold shadow-xs hover:opacity-90 transition-opacity"
            >
              + Yangi baner
            </button>
            <button
              onClick={() => onNotify("Barcha banerlar ro'yxati yangilandi")}
              className="py-3 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-bold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50"
            >
              Yangilash
            </button>
          </div>
        </div>
      )}

      {/* ================= 6. ADMIN SETTINGS ================= */}
      {currentScreen === 'a-settings' && (
        <div className="flex-1 overflow-y-auto px-5 pt-3 pb-24 space-y-4 no-scrollbar">


          {/* Profile Head */}
          <div className="flex flex-col items-center text-center py-2">
            <div className="w-20 h-20 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center font-display font-bold text-2xl mb-2.5 shadow-md">
              AD
            </div>
            <h3 className="font-display text-base font-bold text-neutral-900 dark:text-white">
              Tizim admini
            </h3>
            <span className="text-xs text-neutral-500">Super Administrator</span>
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
                    Mobil Ilova (APK / PWA)
                  </b>
                  <small className="text-emerald-700 dark:text-emerald-400">Android & iOS uchun o'rnatish</small>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNotify("Admin sessiyasi yakunlandi")}
            className="w-full mt-4 py-3.5 rounded-2xl bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white font-semibold text-xs hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
          >
            Chiqish
          </button>
        </div>
      )}

      {/* ================= ADMIN TABBAR ================= */}
      <div className="absolute bottom-4 left-5 right-5 h-16 bg-[#0B0B0B] dark:bg-neutral-900/95 border border-neutral-800 rounded-full flex items-center justify-around px-2 z-20 shadow-2xl backdrop-blur-md">
        <button
          onClick={() => onNavigate('a-home')}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
            currentScreen === 'a-home'
              ? 'bg-white text-neutral-950'
              : 'text-neutral-400 hover:text-white'
          }`}
          title="Boshqaruv paneli"
        >
          <Layers className="w-5 h-5" />
        </button>

        <button
          onClick={() => onNavigate('a-users')}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
            currentScreen === 'a-users'
              ? 'bg-white text-neutral-950'
              : 'text-neutral-400 hover:text-white'
          }`}
          title="Foydalanuvchilar"
        >
          <Users className="w-5 h-5" />
        </button>

        <button
          onClick={() => onNavigate('a-groups')}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
            currentScreen === 'a-groups'
              ? 'bg-white text-neutral-950'
              : 'text-neutral-400 hover:text-white'
          }`}
          title="Guruhlar"
        >
          <FolderKanban className="w-5 h-5" />
        </button>

        <button
          onClick={() => onNavigate('a-content')}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
            currentScreen === 'a-content'
              ? 'bg-white text-neutral-950'
              : 'text-neutral-400 hover:text-white'
          }`}
          title="Materiallar"
        >
          <FileText className="w-5 h-5" />
        </button>

        <button
          onClick={() => onNavigate('a-settings')}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
            currentScreen === 'a-settings'
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
