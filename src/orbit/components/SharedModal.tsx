import { useState, FormEvent } from 'react';
import { ModalType, Lesson, AppUser, GroupItem, BannerItem } from '../types';
import { X, UploadCloud, UserPlus, FolderPlus, ImagePlus, Shield, RotateCcw } from 'lucide-react';

interface SharedModalProps {
  type: ModalType;
  isOpen: boolean;
  onClose: () => void;
  onNotify: (msg: string) => void;
  selectedStudent?: AppUser | null;
  onAddLesson?: (lesson: Partial<Lesson>) => void;
  onAddUser?: (user: Partial<AppUser>) => void;
  onAddGroup?: (group: Partial<GroupItem>) => void;
  onAddBanner?: (banner: Partial<BannerItem>) => void;
  onResetDevices?: (userId: string) => void;
}

export default function SharedModal({
  type,
  isOpen,
  onClose,
  onNotify,
  selectedStudent,
  onAddLesson,
  onAddUser,
  onAddGroup,
  onAddBanner,
  onResetDevices
}: SharedModalProps) {
  // Form states
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonDesc, setLessonDesc] = useState('');
  const [lessonGroup, setLessonGroup] = useState('Frontend-24');

  const [userName, setUserName] = useState('');
  const [userLogin, setUserLogin] = useState('');
  const [userRole, setUserRole] = useState<"O'quvchi" | "Ustoz">("O'quvchi");

  const [groupName, setGroupName] = useState('');
  const [groupField, setGroupField] = useState('');

  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerSubtitle, setBannerSubtitle] = useState('');

  if (!isOpen || !type) return null;

  const handleLessonSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!lessonTitle.trim()) return;
    if (onAddLesson) {
      onAddLesson({
        title: lessonTitle,
        subtitle: lessonDesc || 'Yangi yuklangan dars',
        instructor: 'Malika Umarova',
        avatarLetter: 'M',
        rating: 5.0,
        studentsCount: 28,
        durationMinutes: 45,
        progressPercent: 0,
        isCompleted: false,
        resources: [
          {
            id: `res-${Date.now()}`,
            title: `${lessonTitle}-qollanma.pdf`,
            size: '1.8 MB',
            type: 'pdf'
          }
        ]
      });
    }
    onNotify("Yangi dars muvaffaqiyatli yuklandi va guruhga biriktirildi");
    setLessonTitle('');
    setLessonDesc('');
    onClose();
  };

  const handleUserSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) return;
    if (onAddUser) {
      onAddUser({
        name: userName,
        login: userLogin || userName.toLowerCase().replace(/\s+/g, '_'),
        role: userRole,
        roleCode: userRole === 'Ustoz' ? 'teacher' : 'student',
        avatar: userName.substring(0, 2).toUpperCase(),
        devicesCount: 1,
        maxDevices: 2,
        status: 'Faol',
        groupName: 'Frontend-24',
        progressPercent: 0,
        lastActive: 'Hozirgina'
      });
    }
    onNotify(`Foydalanuvchi "${userName}" yaratildi`);
    setUserName('');
    setUserLogin('');
    onClose();
  };

  const handleGroupSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!groupName.trim()) return;
    if (onAddGroup) {
      onAddGroup({
        name: groupName,
        field: groupField || 'Dasturlash va axborot texnologiyalari',
        teacher: 'Malika Umarova',
        teacherAvatar: 'FE',
        studentsCount: 1,
        averageProgress: 0
      });
    }
    onNotify(`Guruh "${groupName}" muvaffaqiyatli yaratildi`);
    setGroupName('');
    setGroupField('');
    onClose();
  };

  const handleBannerSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!bannerTitle.trim()) return;
    if (onAddBanner) {
      onAddBanner({
        title: bannerTitle,
        subtitle: bannerSubtitle || 'Yangi e\'lon va musobaqa',
        isActive: true
      });
    }
    onNotify(`Yangi baner bosh sahifaga joylandi`);
    setBannerTitle('');
    setBannerSubtitle('');
    onClose();
  };

  return (
    <div
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
    >
      <div className="bg-white dark:bg-neutral-900 border-t sm:border border-neutral-200 dark:border-neutral-800 rounded-t-3xl sm:rounded-3xl w-full max-w-md p-6 max-h-[85vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom-6 duration-300">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-100 dark:border-neutral-800">
          <h3 className="font-display font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
            {type === 'add-lesson' && (
              <>
                <UploadCloud className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                Yangi dars qo'shish
              </>
            )}
            {type === 'add-user' && (
              <>
                <UserPlus className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                Yangi foydalanuvchi
              </>
            )}
            {type === 'add-group' && (
              <>
                <FolderPlus className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                Yangi guruh yaratish
              </>
            )}
            {type === 'add-banner' && (
              <>
                <ImagePlus className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                Yangi e'lon / baner
              </>
            )}
            {type === 'student-detail' && (
              <>
                <Shield className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                O'quvchi ma'lumotlari
              </>
            )}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-700 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Add Lesson Form */}
        {type === 'add-lesson' && (
          <form onSubmit={handleLessonSubmit} className="space-y-4 text-xs">
            <div
              onClick={() => onNotify("Video fayl tanlash muvaffaqiyatli bajarildi")}
              className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-2xl p-5 text-center cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/60 transition-colors"
            >
              <UploadCloud className="w-7 h-7 mx-auto mb-2 text-neutral-400" />
              <p className="font-semibold text-neutral-700 dark:text-neutral-300">
                Video faylni tanlash uchun bosing
              </p>
              <span className="text-[10px] text-neutral-400">
                MP4, WebM (Maks. 500 MB)
              </span>
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Dars sarlavhasi
              </label>
              <input
                type="text"
                required
                value={lessonTitle}
                onChange={e => setLessonTitle(e.target.value)}
                placeholder="Masalan: 4-dars — CSS Grid va Responsive dizayn"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-400 text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Qisqacha tavsif
              </label>
              <textarea
                rows={2}
                value={lessonDesc}
                onChange={e => setLessonDesc(e.target.value)}
                placeholder="Darsda o'rganiladigan asosiy tushunchalar..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-400 text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Guruhni tanlang
              </label>
              <select
                value={lessonGroup}
                onChange={e => setLessonGroup(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none text-xs"
              >
                <option value="Frontend-24">Frontend-24 (28 o'quvchi)</option>
                <option value="Moliya-11">Moliya-11 (21 o'quvchi)</option>
                <option value="Psixologiya-05">Psixologiya-05 (25 o'quvchi)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold hover:opacity-90 transition-opacity"
            >
              Darsni saqlash va e'lon qilish
            </button>
          </form>
        )}

        {/* Add User Form */}
        {type === 'add-user' && (
          <form onSubmit={handleUserSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                To'liq ism-familiya
              </label>
              <input
                type="text"
                required
                value={userName}
                onChange={e => setUserName(e.target.value)}
                placeholder="Masalan: Jamshid Karimov"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-400 text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Login / Username
              </label>
              <input
                type="text"
                value={userLogin}
                onChange={e => setUserLogin(e.target.value)}
                placeholder="jamshid_k"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Foydalanuvchi roli
              </label>
              <select
                value={userRole}
                onChange={e => setUserRole(e.target.value as "O'quvchi" | "Ustoz")}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none text-xs"
              >
                <option value="O'quvchi">O'quvchi (Student)</option>
                <option value="Ustoz">Ustoz (Instructor)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold hover:opacity-90 transition-opacity"
            >
              Foydalanuvchini yaratish
            </button>
          </form>
        )}

        {/* Add Group Form */}
        {type === 'add-group' && (
          <form onSubmit={handleGroupSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Guruh nomi
              </label>
              <input
                type="text"
                required
                value={groupName}
                onChange={e => setGroupName(e.target.value)}
                placeholder="Masalan: Frontend-25"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Yo'nalish / Mutaxassislik
              </label>
              <input
                type="text"
                value={groupField}
                onChange={e => setGroupField(e.target.value)}
                placeholder="Masalan: Veb-dasturlash va React"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold hover:opacity-90 transition-opacity"
            >
              Guruhni yaratish
            </button>
          </form>
        )}

        {/* Add Banner Form */}
        {type === 'add-banner' && (
          <form onSubmit={handleBannerSubmit} className="space-y-4 text-xs">
            <div
              onClick={() => onNotify("Baner rasmi yuklandi")}
              className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-2xl p-5 text-center cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/60"
            >
              <ImagePlus className="w-7 h-7 mx-auto mb-2 text-neutral-400" />
              <p className="font-semibold text-neutral-700 dark:text-neutral-300">
                Baner rasmini tanlash
              </p>
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Baner sarlavhasi
              </label>
              <input
                type="text"
                required
                value={bannerTitle}
                onChange={e => setBannerTitle(e.target.value)}
                placeholder="Masalan: Hackathon 2026 e'lon qilindi!"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Qo'shimcha matn
              </label>
              <input
                type="text"
                value={bannerSubtitle}
                onChange={e => setBannerSubtitle(e.target.value)}
                placeholder="G'oliblarga qimmatbaho sovg'alar taqdim etiladi"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold hover:opacity-90 transition-opacity"
            >
              Banerni joylashtirish
            </button>
          </form>
        )}

        {/* Student Detail Modal */}
        {type === 'student-detail' && selectedStudent && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center font-display font-bold text-lg">
                {selectedStudent.avatar}
              </div>
              <div>
                <h4 className="font-bold text-sm text-neutral-900 dark:text-white">
                  {selectedStudent.name}
                </h4>
                <p className="text-neutral-500">
                  {selectedStudent.groupName || 'Guruh biriktirilmagan'} · @{selectedStudent.login}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-neutral-500">O'zlashtirish darajasi:</span>
                <span className="font-bold text-neutral-900 dark:text-white">
                  {selectedStudent.progressPercent || 0}%
                </span>
              </div>
              <div className="w-full bg-neutral-200 dark:bg-neutral-700 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-neutral-900 dark:bg-white h-full"
                  style={{ width: `${selectedStudent.progressPercent || 0}%` }}
                />
              </div>

              <div className="flex justify-between items-center pt-2 text-[11px] text-neutral-500">
                <span>Holati:</span>
                <span
                  className={`px-2 py-0.5 rounded-full font-semibold ${
                    selectedStudent.status === 'Faol'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                  }`}
                >
                  {selectedStudent.status}
                </span>
              </div>

              <div className="flex justify-between items-center text-[11px] text-neutral-500">
                <span>Faol qurilmalar:</span>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                  {selectedStudent.devicesCount} / {selectedStudent.maxDevices} ta
                </span>
              </div>

              <div className="flex justify-between items-center text-[11px] text-neutral-500">
                <span>Oxirgi faollik:</span>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                  {selectedStudent.lastActive}
                </span>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => {
                  if (onResetDevices) onResetDevices(selectedStudent.id);
                  onNotify(`${selectedStudent.name} qurilmalari tozalandi`);
                  onClose();
                }}
                className="flex-1 py-2.5 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 font-semibold flex items-center justify-center gap-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Qurilmalarni tozalash
              </button>

              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold"
              >
                Yopish
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
