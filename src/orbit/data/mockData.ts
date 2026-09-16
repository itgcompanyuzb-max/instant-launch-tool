import {
  Lesson,
  Quiz,
  ScheduleEvent,
  AppUser,
  GroupItem,
  ContentMaterial,
  BannerItem,
  AppNotification
} from '../types';

export const initialLessons: Lesson[] = [
  {
    id: 'les-1',
    title: 'Frontend asoslariga kirish',
    subtitle: '3-dars · HTML tuzilmasi va semantik teglar',
    instructor: 'Malika Umarova',
    avatarLetter: 'A',
    rating: 4.8,
    studentsCount: 120,
    durationMinutes: 45,
    progressPercent: 38,
    isCompleted: false,
    resources: [
      {
        id: 'res-1',
        title: 'Dars-3-konspekt.pdf',
        size: '2.4 MB',
        type: 'pdf'
      },
      {
        id: 'res-2',
        title: 'Amaliy-topshiriq.zip',
        size: '840 KB',
        type: 'zip'
      },
      {
        id: 'res-3',
        title: 'HTML_Cheatsheet_UZB.pdf',
        size: '1.1 MB',
        type: 'pdf'
      }
    ]
  },
  {
    id: 'les-2',
    title: 'Moliyaviy savodxonlik asoslari',
    subtitle: '2-dars · Shaxsiy byudjet va investitsiyalar',
    instructor: 'Javlon Saidov',
    avatarLetter: 'M',
    rating: 4.6,
    studentsCount: 86,
    durationMinutes: 30,
    progressPercent: 70,
    isCompleted: false,
    resources: [
      {
        id: 'res-4',
        title: 'Byudjet-shabloni.xlsx',
        size: '520 KB',
        type: 'doc'
      }
    ]
  },
  {
    id: 'les-3',
    title: 'Psixologiyaga kirish',
    subtitle: '1-dars · Ong osti mexanizmlari',
    instructor: 'Nilufar Rahimova',
    avatarLetter: 'P',
    rating: 4.9,
    studentsCount: 94,
    durationMinutes: 45,
    progressPercent: 15,
    isCompleted: false,
    resources: [
      {
        id: 'res-5',
        title: 'Psixologiya-asoslari-1.pdf',
        size: '3.8 MB',
        type: 'pdf'
      }
    ]
  },
  {
    id: 'les-4',
    title: 'Fotosuratchilik asoslari',
    subtitle: '4-dars · Kompozitsiya va yorug\'lik qoidalari',
    instructor: 'Bobur Aliyev',
    avatarLetter: 'F',
    rating: 4.7,
    studentsCount: 65,
    durationMinutes: 60,
    progressPercent: 0,
    isCompleted: false,
    resources: [
      {
        id: 'res-6',
        title: 'Kompozitsiya-qollanma.pdf',
        size: '5.2 MB',
        type: 'pdf'
      }
    ]
  }
];

export const initialQuizzes: Quiz[] = [
  {
    id: 'quiz-1',
    title: 'HTML asoslari',
    description: '10 ta savol · HTML semantika, teglar va attributlar',
    questionsCount: 5,
    durationMinutes: 8,
    score: 92,
    status: 'completed',
    questions: [
      {
        id: 'q-1',
        question: 'HTML da asosiy sarlavha uchun qaysi teg ishlatiladi?',
        options: ['<head>', '<h1>', '<heading>', '<header>'],
        correctIndex: 1,
        explanation: '<h1> tegi sahifaning asosiy birinchi darajali sarlavhasini ifodalaydi.'
      },
      {
        id: 'q-2',
        question: 'Qaysi teg semantik bo\'lib, sahifaning asosiy navigatsiyasini bildiradi?',
        options: ['<menu>', '<nav>', '<navbar>', '<aside>'],
        correctIndex: 1,
        explanation: '<nav> tegi asosiy sahifa navigatsiya havolalarini guruhlash uchun ishlatiladi.'
      },
      {
        id: 'q-3',
        question: 'Rasm qo\'shishda qaysi attribut majburiy hisoblanadi (accessibility uchun)?',
        options: ['alt', 'title', 'src-alt', 'caption'],
        correctIndex: 0,
        explanation: 'alt attributi ekranni o\'qish dasturlari va rasm yuklanmaganda muqobil matn beradi.'
      },
      {
        id: 'q-4',
        question: 'HTML5 da audio yoki video joylashtirish uchun qaysi teglar qo\'shilgan?',
        options: ['<media> va <player>', '<audio> va <video>', '<sound> va <movie>', '<embed> va <object>'],
        correctIndex: 1,
        explanation: 'HTML5 to\'g\'ridan-to\'g\'ri <audio> va <video> teglarini taqdim etadi.'
      },
      {
        id: 'q-5',
        question: 'Qaysi element blok (block-level) turiga kiradi?',
        options: ['<span>', '<a>', '<div>', '<strong>'],
        correctIndex: 2,
        explanation: '<div> butun qatorni egallaydigan blok elementdir.'
      }
    ]
  },
  {
    id: 'quiz-2',
    title: 'Byudjet rejalashtirish',
    description: '8 ta savol · 50/30/20 qoidasi va daromadlar taqsimoti',
    questionsCount: 4,
    durationMinutes: 6,
    score: 74,
    status: 'completed',
    questions: [
      {
        id: 'bq-1',
        question: '50/30/20 qoidasiga ko\'ra 50% qism nimalarga sarflanadi?',
        options: ['Zaruriy ehtiyojlar', 'Xohish-istaklar', 'Jamg\'arma va investitsiya', 'Xayriya'],
        correctIndex: 0,
        explanation: '50% asosiy yashash, ovqatlanish, kommunal va ijara to\'lovlariga ajratiladi.'
      },
      {
        id: 'bq-2',
        question: 'Xavfsizlik yostig\'i (favqulodda jamg\'arma) qancha muddatga yetarli bo\'lishi tavsiya etiladi?',
        options: ['1 haftalik', '1 oylik', '3–6 oylik sarf-xarajat', '5 yillik'],
        correctIndex: 2,
        explanation: 'Moliyaviy ekspertlar kamida 3-6 oylik o\'rtacha xarajat miqdorini zaxirada saqlashni tavsiya qiladi.'
      },
      {
        id: 'bq-3',
        question: 'Passiv daromad nima?',
        options: ['Har kuni 8 soat ishlab olinadigan oylik', 'To\'g\'ridan-to\'g\'ri kundalik mehnatsiz keladigan daromad', 'Qarzdorlik', 'Soliq qaytarimi'],
        correctIndex: 1,
        explanation: 'Passiv daromad aktivlar (ijara, dividend, mualliflik) orqali kelaveradi.'
      },
      {
        id: 'bq-4',
        question: 'Inflyatsiya sharoitida naqd pul qanday o\'zgaradi?',
        options: ['Xarid qobiliyati pasayadi', 'Xarid qobiliyati ortadi', 'O\'zgarmaydi', 'Ikki baravar ko\'payadi'],
        correctIndex: 0,
        explanation: 'Inflyatsiya sabab bir xil pulga kamroq tovar sotib olish mumkin bo\'ladi.'
      }
    ]
  },
  {
    id: 'quiz-3',
    title: 'Psixologiya kirish testi',
    description: '12 ta savol · Boshlanmagan · Emotsional intellekt',
    questionsCount: 4,
    durationMinutes: 10,
    score: null,
    status: 'not_started',
    questions: [
      {
        id: 'pq-1',
        question: 'Emotsional intellekt (EQ) ning asosiy komponentlaridan biri nima?',
        options: ['O\'z-o\'zini anglash va empatiya', 'Faqat matematik xotira', 'Tez yozish qobiliyati', 'Kam uxlash'],
        correctIndex: 0,
        explanation: 'EQ o\'z his-tuyg\'ularini tushunish va boshqarish hamda boshqalarni his qilishni o\'z ichiga oladi.'
      },
      {
        id: 'pq-2',
        question: 'Faol tinglash (Active Listening) texnikasi nimani talab qiladi?',
        options: ['Suhbatdosh gapini tez-tez bo\'lishni', 'Diqqat bilan eshitish, ko\'z aloqasi va tasdiqlovchi savollarni', 'Telefon o\'ynab turishni', 'Faqat o\'z fikrini gapirishni'],
        correctIndex: 1,
        explanation: 'Faol tinglash suhbatdoshni to\'liq tushunish va hurmat ko\'rsatishni ta\'minlaydi.'
      },
      {
        id: 'pq-3',
        question: 'Kognitiv buzilish (Cognitive Distortion) nima?',
        options: ['Fikrlashdagi mantiqsiz va noxolis xatoliklar', 'Miya kasalligi', 'Til o\'rganish usuli', 'Medratsiya'],
        correctIndex: 0,
        explanation: 'Masalan, "hamma narsa yoki hech narsa" tarzida qutbli fikrlash kognitiv buzilishdir.'
      },
      {
        id: 'pq-4',
        question: 'Stressni kamaytirishda qaysi nafas mashqi samarali hisoblanadi?',
        options: ['Kvadrat nafas olish (Box breathing)', 'Tez va sayoz nafas', 'Nafasni uzoq vaqt ushlab hushdan ketish', 'Faqat og\'izdan nafas olish'],
        correctIndex: 0,
        explanation: '4 soniya nafas olish, 4 soniya ushlash, 4 soniya chiqarish, 4 soniya tanaffus parasimpatik tizimni tinchlantiradi.'
      }
    ]
  }
];

export const initialScheduleDays = [
  { day: 11, dayName: 'Sha' },
  { day: 12, dayName: 'Yak' },
  { day: 13, dayName: 'Du' },
  { day: 14, dayName: 'Se' },
  { day: 15, dayName: 'Chr' },
  { day: 16, dayName: 'Pa' },
  { day: 17, dayName: 'Ju' }
];

export const initialScheduleEvents: ScheduleEvent[] = [
  {
    id: 'sc-1',
    day: 14,
    dayName: 'Se',
    time: '08:00',
    duration: '08:00 – 08:45',
    title: 'Frontend asoslariga kirish',
    category: 'Veb-dasturlash'
  },
  {
    id: 'sc-2',
    day: 14,
    dayName: 'Se',
    time: '10:00',
    duration: '10:00 – 11:45',
    title: 'Moliyaviy savodxonlik asoslari',
    category: 'Biznes & Moliya'
  },
  {
    id: 'sc-3',
    day: 14,
    dayName: 'Se',
    time: '14:00',
    duration: '14:00 – 14:45',
    title: 'Psixologiyaga kirish',
    category: 'Shaxsiy rivojlanish'
  },
  {
    id: 'sc-4',
    day: 14,
    dayName: 'Se',
    time: '16:00',
    duration: '16:00 – 17:00',
    title: 'Fotosuratchilik asoslari',
    category: 'Ijod & Media'
  }
];

export const initialUsers: AppUser[] = [
  {
    id: 'usr-1',
    name: 'Sardor Rasulov',
    login: 'sardor_r',
    role: 'O\'quvchi',
    roleCode: 'student',
    avatar: 'SR',
    devicesCount: 2,
    maxDevices: 2,
    status: 'Faol',
    groupName: 'Frontend-24',
    progressPercent: 92,
    lastActive: 'Bugun, 09:40'
  },
  {
    id: 'usr-2',
    name: 'Malika Umarova',
    login: 'malika_u',
    role: 'Ustoz',
    roleCode: 'teacher',
    avatar: 'MU',
    devicesCount: 1,
    maxDevices: 2,
    status: 'Faol',
    groupName: 'Frontend-24, Moliya-11',
    progressPercent: 100,
    lastActive: 'Bugun, 09:35'
  },
  {
    id: 'usr-3',
    name: 'Dilnoza Karimova',
    login: 'dilnoza_k',
    role: 'O\'quvchi',
    roleCode: 'student',
    avatar: 'DK',
    devicesCount: 1,
    maxDevices: 2,
    status: 'Faol',
    groupName: 'Frontend-24',
    progressPercent: 78,
    lastActive: 'Kecha, 18:20'
  },
  {
    id: 'usr-4',
    name: 'Aziz Tursunov',
    login: 'aziz_t',
    role: 'O\'quvchi',
    roleCode: 'student',
    avatar: 'AT',
    devicesCount: 3,
    maxDevices: 2,
    status: 'Bloklangan',
    groupName: 'Frontend-24',
    progressPercent: 41,
    lastActive: '4 kun oldin'
  },
  {
    id: 'usr-5',
    name: 'Javlon Saidov',
    login: 'javlon_s',
    role: 'Ustoz',
    roleCode: 'teacher',
    avatar: 'JS',
    devicesCount: 1,
    maxDevices: 2,
    status: 'Faol',
    groupName: 'Moliya-11',
    progressPercent: 100,
    lastActive: 'Bugun, 08:15'
  }
];

export const initialGroups: GroupItem[] = [
  {
    id: 'grp-1',
    name: 'Frontend-24',
    field: 'Veb-dasturlash (HTML, CSS, JS)',
    teacher: 'Malika Umarova',
    teacherAvatar: 'FE',
    studentsCount: 28,
    averageProgress: 82
  },
  {
    id: 'grp-2',
    name: 'Moliya-11',
    field: 'Biznes va Shaxsiy byudjet',
    teacher: 'Javlon Saidov',
    teacherAvatar: 'MO',
    studentsCount: 21,
    averageProgress: 64
  },
  {
    id: 'grp-3',
    name: 'Psixologiya-05',
    field: 'Shaxsiy rivojlanish va EQ',
    teacher: 'Nilufar Rahimova',
    teacherAvatar: 'PS',
    studentsCount: 25,
    averageProgress: 57
  }
];

export const initialMaterials: ContentMaterial[] = [
  {
    id: 'mat-1',
    title: 'Frontend 3-dars.mp4',
    uploader: 'Malika Umarova',
    uploaderRole: 'Ustoz',
    size: '210 MB',
    type: 'video',
    uploadDate: 'Bugun'
  },
  {
    id: 'mat-2',
    title: 'Olimpiada-qollanma.pdf',
    uploader: 'Admin',
    uploaderRole: 'Admin',
    size: '4.1 MB',
    type: 'pdf',
    uploadDate: '3 kun oldin'
  },
  {
    id: 'mat-3',
    title: 'Moliya-11 dars.mp4',
    uploader: 'Javlon Saidov',
    uploaderRole: 'Ustoz',
    size: '175 MB',
    type: 'video',
    uploadDate: 'Kecha'
  }
];

export const initialBanners: BannerItem[] = [
  {
    id: 'ban-1',
    title: 'Olimpiad Mastery Hub',
    subtitle: 'Barcha guruhlar o\'rtasida saralash musobaqasi boshlandi!',
    isActive: true,
    bgColor: 'bg-neutral-800'
  }
];

export const initialNotifications: Record<string, AppNotification[]> = {
  student: [
    {
      id: 'nt-s-1',
      title: 'Yangi dars qo\'shildi',
      desc: 'Frontend-24 guruhiga 4-dars yuklandi',
      time: '10 daqiqa oldin'
    },
    {
      id: 'nt-s-2',
      title: 'Test natijasi',
      desc: 'HTML asoslari testida 92% oldingiz',
      time: '1 soat oldin'
    },
    {
      id: 'nt-s-3',
      title: 'Jonli efir',
      desc: 'Ertaga 14:00 da jonli dars bo\'ladi',
      time: 'Kecha'
    }
  ],
  teacher: [
    {
      id: 'nt-t-1',
      title: 'Yangi savol',
      desc: 'Sardor R. sizga savol yubordi: "Flexbox haqida..."',
      time: '5 daqiqa oldin'
    },
    {
      id: 'nt-t-2',
      title: 'Guruh yangilandi',
      desc: 'Frontend-24 ga 2 ta o\'quvchi qo\'shildi',
      time: 'Bugun, 09:00'
    }
  ],
  admin: [
    {
      id: 'nt-a-1',
      title: 'Yangi ro\'yxatdan o\'tish',
      desc: '3 ta yangi o\'quvchi ro\'yxatdan o\'tdi',
      time: 'Hozirgina'
    },
    {
      id: 'nt-a-2',
      title: 'Qurilma limiti',
      desc: 'Aziz Tursunov 3-qurilmadan kirishga urindi',
      time: 'Bugun, 08:30'
    }
  ]
};
