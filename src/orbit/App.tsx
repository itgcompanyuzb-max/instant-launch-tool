import { useState, useEffect } from 'react';
import {
  UserRole,
  StudentScreen,
  TeacherScreen,
  AdminScreen,
  ModalType,
  Quiz,
  Lesson,
  AppUser,
  GroupItem,
  BannerItem
} from './types';
import {
  initialLessons,
  initialQuizzes,
  initialScheduleDays,
  initialScheduleEvents,
  initialUsers,
  initialGroups,
  initialMaterials,
  initialBanners,
  initialNotifications
} from './data/mockData';

import StudentView from './components/StudentView';
import TeacherView from './components/TeacherView';
import AdminView from './components/AdminView';
import SecurityGuard from './components/SecurityGuard';
import QuizRunnerModal from './components/QuizRunnerModal';
import AIAssistantModal from './components/AIAssistantModal';
import SharedModal from './components/SharedModal';
import APKInstallModal from './components/APKInstallModal';

export default function App() {
  // Navigation & Role states
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  const [studentScreen, setStudentScreen] = useState<StudentScreen>('s-onboard');
  const [teacherScreen, setTeacherScreen] = useState<TeacherScreen>('t-home');
  const [adminScreen, setAdminScreen] = useState<AdminScreen>('a-home');

  // UI Modes
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('orbit_dark_theme');
      if (saved !== null) return saved === 'true';
    }
    return false;
  });
  const [isDesktopView, setIsDesktopView] = useState(true);

  // Modals & Overlays
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [activeQuizToTake, setActiveQuizToTake] = useState<Quiz | null>(null);
  const [selectedStudentForDetail, setSelectedStudentForDetail] = useState<AppUser | null>(null);
  const [isAPKModalOpen, setIsAPKModalOpen] = useState(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Data Store
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons);
  const [quizzes, setQuizzes] = useState<Quiz[]>(initialQuizzes);
  const [users, setUsers] = useState<AppUser[]>(initialUsers);
  const [groups, setGroups] = useState<GroupItem[]>(initialGroups);
  const [materials] = useState(initialMaterials);
  const [banners, setBanners] = useState<BannerItem[]>(initialBanners);
  const [notifications] = useState(initialNotifications);

  // Dark mode effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('orbit_dark_theme', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('orbit_dark_theme', 'false');
    }
  }, [isDarkMode]);

  // Toast display trigger
  const notify = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const t = setTimeout(() => {
      setToastMessage(null);
    }, 2200);
    return () => clearTimeout(t);
  }, [toastMessage]);

  // Role Switcher Handler
  const handleSelectRole = (role: UserRole) => {
    setCurrentRole(role);
    notify(
      role === 'student'
        ? "O'quvchi kabinetiga o'tildi"
        : role === 'teacher'
        ? "Ustoz kabinetiga o'tildi"
        : "Admin paneliga o'tildi"
    );
  };

  // Quiz completion handler
  const handleCompleteQuiz = (quizId: string, finalScore: number) => {
    setQuizzes(prev =>
      prev.map(q => (q.id === quizId ? { ...q, score: finalScore, status: 'completed' } : q))
    );
    notify(`Test yakunlandi! Sizning natijangiz: ${finalScore}%`);
  };

  // Add Lesson handler
  const handleAddLesson = (newLesson: Partial<Lesson>) => {
    const created: Lesson = {
      id: `les-${Date.now()}`,
      title: newLesson.title || 'Yangi dars',
      subtitle: newLesson.subtitle || 'Tavsif berilmagan',
      instructor: newLesson.instructor || 'Malika Umarova',
      avatarLetter: newLesson.avatarLetter || 'M',
      rating: 5.0,
      studentsCount: 28,
      durationMinutes: newLesson.durationMinutes || 45,
      progressPercent: 0,
      isCompleted: false,
      resources: newLesson.resources || []
    };
    setLessons(prev => [created, ...prev]);
  };

  // Add User handler
  const handleAddUser = (newUser: Partial<AppUser>) => {
    const created: AppUser = {
      id: `usr-${Date.now()}`,
      name: newUser.name || 'Yangi foydalanuvchi',
      login: newUser.login || 'user',
      role: newUser.role || "O'quvchi",
      roleCode: newUser.roleCode || 'student',
      avatar: newUser.avatar || 'U',
      devicesCount: 1,
      maxDevices: 2,
      status: 'Faol',
      groupName: newUser.groupName || 'Frontend-24',
      progressPercent: 0,
      lastActive: 'Hozirgina'
    };
    setUsers(prev => [created, ...prev]);
  };

  // Add Group handler
  const handleAddGroup = (newGroup: Partial<GroupItem>) => {
    const created: GroupItem = {
      id: `grp-${Date.now()}`,
      name: newGroup.name || 'Yangi guruh',
      field: newGroup.field || 'Axborot texnologiyalari',
      teacher: newGroup.teacher || 'Malika Umarova',
      teacherAvatar: newGroup.teacherAvatar || 'FE',
      studentsCount: 1,
      averageProgress: 0
    };
    setGroups(prev => [created, ...prev]);
  };

  // Add Banner handler
  const handleAddBanner = (newBanner: Partial<BannerItem>) => {
    const created: BannerItem = {
      id: `ban-${Date.now()}`,
      title: newBanner.title || 'Yangi e\'lon',
      subtitle: newBanner.subtitle || 'Barcha foydalanuvchilar uchun e\'lon',
      isActive: true,
      bgColor: 'bg-neutral-800'
    };
    setBanners(prev => [created, ...prev]);
  };

  // Toggle user block status
  const handleToggleUserStatus = (userId: string) => {
    setUsers(prev =>
      prev.map(u => {
        if (u.id === userId) {
          return {
            ...u,
            status: u.status === 'Faol' ? 'Bloklangan' : 'Faol'
          };
        }
        return u;
      })
    );
  };

  // Reset devices
  const handleResetDevices = (userId?: string) => {
    if (userId) {
      setUsers(prev =>
        prev.map(u => (u.id === userId ? { ...u, devicesCount: 1 } : u))
      );
    } else {
      setUsers(prev => prev.map(u => ({ ...u, devicesCount: 1 })));
    }
  };

  // Delete banner
  const handleDeleteBanner = (bannerId: string) => {
    setBanners(prev => prev.filter(b => b.id !== bannerId));
  };

  // Student click in teacher view
  const handleSelectStudentForDetail = (student: AppUser) => {
    setSelectedStudentForDetail(student);
    setActiveModal('student-detail');
  };

  return (
    <div className="min-h-screen w-full bg-[#F4F4F4] dark:bg-neutral-950 text-[#0E0E0E] dark:text-neutral-100 flex flex-col transition-colors duration-300">
      {/* Main Container */}
      <main className="w-full flex-1 flex flex-col justify-start">
        <div className="transition-all duration-300 relative bg-[#F4F4F4] dark:bg-neutral-950 flex flex-col flex-1 w-full max-w-7xl mx-auto min-h-screen">
          {/* Dynamic Toast popup */}
          {toastMessage && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-[#0B0B0B] dark:bg-white text-white dark:text-neutral-950 text-xs font-semibold shadow-xl pointer-events-none animate-in fade-in slide-in-from-top-2 duration-200 whitespace-nowrap">
              {toastMessage}
            </div>
          )}

          {/* Student View */}
          {currentRole === 'student' && (
            <StudentView
              currentScreen={studentScreen}
              onNavigate={setStudentScreen}
              lessons={lessons}
              quizzes={quizzes}
              scheduleDays={initialScheduleDays}
              scheduleEvents={initialScheduleEvents}
              notifications={notifications.student}
              isDarkMode={isDarkMode}
              onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
              onOpenAITutor={() => setActiveModal('ai-assistant')}
              onTakeQuiz={quiz => {
                setActiveQuizToTake(quiz);
                setActiveModal('take-quiz');
              }}
              onNotify={notify}
              onOpenAPKModal={() => setIsAPKModalOpen(true)}
            />
          )}

          {/* Teacher View */}
          {currentRole === 'teacher' && (
            <TeacherView
              currentScreen={teacherScreen}
              onNavigate={setTeacherScreen}
              groups={groups}
              students={users.filter(u => u.roleCode === 'student')}
              notifications={notifications.teacher}
              isDarkMode={isDarkMode}
              onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
              onOpenAddLesson={() => setActiveModal('add-lesson')}
              onSelectStudent={handleSelectStudentForDetail}
              onNotify={notify}
              onOpenAPKModal={() => setIsAPKModalOpen(true)}
            />
          )}

          {/* Admin View */}
          {currentRole === 'admin' && (
            <AdminView
              currentScreen={adminScreen}
              onNavigate={setAdminScreen}
              users={users}
              groups={groups}
              materials={materials}
              banners={banners}
              notifications={notifications.admin}
              isDarkMode={isDarkMode}
              onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
              onOpenAddUser={() => setActiveModal('add-user')}
              onOpenAddGroup={() => setActiveModal('add-group')}
              onOpenAddBanner={() => setActiveModal('add-banner')}
              onToggleUserStatus={handleToggleUserStatus}
              onResetDevices={handleResetDevices}
              onDeleteBanner={handleDeleteBanner}
              onNotify={notify}
              onOpenAPKModal={() => setIsAPKModalOpen(true)}
            />
          )}

          {/* Permanent Active Anti-Recording and Anti-Screenshot DRM Security */}
          <SecurityGuard
            onNotify={notify}
            userId="20481"
            userName={
              currentRole === 'student'
                ? 'Sardor R. (Talaba)'
                : currentRole === 'teacher'
                ? 'Aziza Q. (Ustoz)'
                : 'Admin (Boshqaruvchi)'
            }
          />
        </div>
      </main>

      {/* Global AI Assistant Modal */}
      <AIAssistantModal
        isOpen={activeModal === 'ai-assistant'}
        onClose={() => setActiveModal(null)}
      />

      {/* Interactive Quiz Runner Modal */}
      <QuizRunnerModal
        quiz={activeQuizToTake}
        isOpen={activeModal === 'take-quiz'}
        onClose={() => {
          setActiveModal(null);
          setActiveQuizToTake(null);
        }}
        onCompleteQuiz={handleCompleteQuiz}
      />

      {/* APK & PWA Install Center Modal */}
      <APKInstallModal
        isOpen={isAPKModalOpen}
        onClose={() => setIsAPKModalOpen(false)}
        onNotify={notify}
      />

      {/* Shared Forms & Details Modals */}
      <SharedModal
        type={activeModal}
        isOpen={
          activeModal === 'add-lesson' ||
          activeModal === 'add-user' ||
          activeModal === 'add-group' ||
          activeModal === 'add-banner' ||
          activeModal === 'student-detail'
        }
        onClose={() => {
          setActiveModal(null);
          setSelectedStudentForDetail(null);
        }}
        onNotify={notify}
        selectedStudent={selectedStudentForDetail}
        onAddLesson={handleAddLesson}
        onAddUser={handleAddUser}
        onAddGroup={handleAddGroup}
        onAddBanner={handleAddBanner}
        onResetDevices={handleResetDevices}
      />
    </div>
  );
}
