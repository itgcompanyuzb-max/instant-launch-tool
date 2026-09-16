export type UserRole = 'student' | 'teacher' | 'admin';

export type StudentScreen =
  | 's-onboard'
  | 's-home'
  | 's-lesson'
  | 's-schedule'
  | 's-quizzes'
  | 's-settings';

export type TeacherScreen =
  | 't-home'
  | 't-students'
  | 't-live'
  | 't-settings';

export type AdminScreen =
  | 'a-home'
  | 'a-users'
  | 'a-groups'
  | 'a-content'
  | 'a-banners'
  | 'a-settings';

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  instructor: string;
  avatarLetter: string;
  rating: number;
  studentsCount: number;
  durationMinutes: number;
  progressPercent: number;
  isCompleted?: boolean;
  videoUrl?: string;
  resources: ResourceItem[];
}

export interface ResourceItem {
  id: string;
  title: string;
  size: string;
  type: 'pdf' | 'zip' | 'mp4' | 'doc';
  url?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questionsCount: number;
  durationMinutes: number;
  score?: number | null; // e.g. 92% or null if not taken
  status: 'completed' | 'in_progress' | 'not_started';
  questions: QuizQuestion[];
}

export interface ScheduleEvent {
  id: string;
  day: number; // e.g. 14
  dayName: string; // Sha, Yak, Du, Se, Chr, Pa, Ju
  time: string; // 08:00
  duration: string; // 08:00 – 08:45
  title: string;
  category: string;
}

export interface AppUser {
  id: string;
  name: string;
  login: string;
  role: 'O\'quvchi' | 'Ustoz' | 'Admin';
  roleCode: UserRole;
  avatar: string;
  devicesCount: number;
  maxDevices: number;
  status: 'Faol' | 'Bloklangan';
  groupName?: string;
  progressPercent?: number;
  lastActive: string;
}

export interface GroupItem {
  id: string;
  name: string;
  field: string;
  teacher: string;
  teacherAvatar: string;
  studentsCount: number;
  averageProgress: number;
}

export interface ContentMaterial {
  id: string;
  title: string;
  uploader: string;
  uploaderRole: 'Ustoz' | 'Admin';
  size: string;
  type: 'video' | 'pdf' | 'archive';
  uploadDate: string;
}

export interface BannerItem {
  id: string;
  title: string;
  subtitle: string;
  isActive: boolean;
  bgColor?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  desc: string;
  time: string;
  isRead?: boolean;
}

export type ModalType =
  | 'add-lesson'
  | 'add-user'
  | 'add-group'
  | 'add-banner'
  | 'ai-assistant'
  | 'take-quiz'
  | 'student-detail'
  | null;
