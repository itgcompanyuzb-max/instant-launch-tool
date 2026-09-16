import { useState, useEffect } from 'react';
import {
  Smartphone,
  Download,
  CheckCircle2,
  Share2,
  Layers,
  ArrowDownToLine,
  HelpCircle,
  X,
  ExternalLink,
  ShieldCheck,
  Zap,
  Sparkles
} from 'lucide-react';

interface APKInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNotify: (msg: string) => void;
}

export default function APKInstallModal({
  isOpen,
  onClose,
  onNotify
}: APKInstallModalProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [activeTab, setActiveTab] = useState<'quick' | 'guide' | 'dev'>('quick');

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  if (!isOpen) return null;

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
        onNotify("Orbit LMS telefoningizga o'rnatildi!");
      }
      setDeferredPrompt(null);
    } else {
      // Manual home screen installation advice
      onNotify("Brauzer menyusidan 'Bosh ekranga qo'shish' yoki 'O'rnatish'ni bosing");
    }
  };

  const handleDownloadAppBundle = () => {
    const configData = {
      name: "Orbit LMS",
      short_name: "Orbit LMS",
      version: "1.0.0",
      description: "Orbit LMS — O'quvchi, Ustoz va Admin uchun aqlli ta'lim boshqaruv platformasi",
      platform: "android",
      package_id: "uz.orbit.lms.app",
      installed_at: new Date().toISOString(),
      drm_protection: true,
      features: [
        "O'quvchi, Ustoz va Admin kabinetlari",
        "Jonli efir va video darslar",
        "Ekran himoyasi (DRM watermark)",
        "Interaktiv testlar va sun'iy intellekt AI Tutor",
        "Offline rejim va PWA / WebAPK qo'llab-quvvatlash"
      ]
    };

    const blob = new Blob([JSON.stringify(configData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orbit-lms-android-package.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onNotify("Orbit LMS konfiguratsiya paketi yuklab olindi!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center font-display font-bold text-base shadow-sm">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-neutral-900 dark:text-white">
                Orbit LMS Mobil Ilovasi
              </h3>
              <p className="text-xs text-neutral-500">Android APK & PWA O'rnatish</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="px-5 pt-3 flex border-b border-neutral-100 dark:border-neutral-800 gap-2">
          <button
            onClick={() => setActiveTab('quick')}
            className={`pb-2 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'quick'
                ? 'border-neutral-900 dark:border-white text-neutral-900 dark:text-white'
                : 'border-transparent text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
            }`}
          >
            Tezkor O'rnatish
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`pb-2 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'guide'
                ? 'border-neutral-900 dark:border-white text-neutral-900 dark:text-white'
                : 'border-transparent text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
            }`}
          >
            Android Qo'llanma
          </button>
          <button
            onClick={() => setActiveTab('dev')}
            className={`pb-2 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'dev'
                ? 'border-neutral-900 dark:border-white text-neutral-900 dark:text-white'
                : 'border-transparent text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
            }`}
          >
            APK / Build Fayllari
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto no-scrollbar space-y-4 flex-1">
          {/* TAB 1: QUICK INSTALL */}
          {activeTab === 'quick' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-900 dark:text-white">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>To'g'ridan-to'g'ri telefonda ishlaydi</span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Orbit LMS zamonaviy <b>PWA (Progressive Web App / WebAPK)</b> texnologiyasiga ega. Telefoningizga o'rnatilgach, u xuddi oddiy Android APK ilovasi kabi to'liq ekranda, tez va qulay ishlaydi.
                </p>
                <div className="flex items-center gap-2 text-[11px] text-neutral-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>DRM himoyasi, bildirishnomalar va oflayn keshlash</span>
                </div>
              </div>

              {/* Install action button */}
              <button
                onClick={handleInstallPWA}
                className="w-full py-3.5 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:opacity-90 active:scale-98 transition-all"
              >
                <ArrowDownToLine className="w-4 h-4" />
                {isInstalled ? "Ilova allaqachon o'rnatilgan" : "Telefonimga o'rnatish (1-klik)"}
              </button>

              <button
                onClick={handleDownloadAppBundle}
                className="w-full py-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-semibold text-xs flex items-center justify-center gap-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Ilova paketini yuklab olish (JSON)
              </button>
            </div>
          )}

          {/* TAB 2: ANDROID GUIDE */}
          {activeTab === 'guide' && (
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800/70 space-y-2">
                <b className="font-display text-neutral-900 dark:text-white block text-sm">
                  Android (Chrome / Samsung Internet) orqali o'rnatish:
                </b>
                <ol className="space-y-2 text-neutral-600 dark:text-neutral-300 pl-4 list-decimal">
                  <li>
                    Telefoningizda brauzerning yuqori o'ng burchagidagi <b>uch nuqta (⋮)</b> menyusini bosing.
                  </li>
                  <li>
                    Menyudan <b>"Bosh ekranga qo'shish"</b> yoki <b>"Ilovani o'rnatish"</b> bandini tanlang.
                  </li>
                  <li>
                    <b>"O'rnatish"</b> tugmasini bosing — ilova Android menyusingizda paydo bo'ladi.
                  </li>
                  <li>
                    Ilovani ochganda u hech qanday brauzer qatori yoki ramkalarsiz, to'liq ekranli ilova sifatida ishlaydi.
                  </li>
                </ol>
              </div>

              <div className="p-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-900 dark:text-white">
                  <Share2 className="w-3.5 h-3.5" />
                  <span>iPhone / iOS (Safari) foydalanuvchilari uchun:</span>
                </div>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                  Safari brauzerida pastdagi <b>"Ulashish" (Share)</b> tugmasini bosing va <b>"Bosh ekranga qo'shish" (Add to Home Screen)</b> ni tanlang.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: DEVELOPER & BUILD */}
          {activeTab === 'dev' && (
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-neutral-900 dark:bg-neutral-950 text-white space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-neutral-400 font-mono">APK Generation (Capacitor / TWA)</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold">Tayyor</span>
                </div>
                <pre className="text-[11px] font-mono text-neutral-300 bg-neutral-800 dark:bg-neutral-900 p-2.5 rounded-xl overflow-x-auto">
{`# 1. Capacitor orqali APK yig'ish:
npm i -D @capacitor/cli @capacitor/android
npx cap init "Orbit LMS" "uz.orbit.lms"
npm run build
npx cap add android
npx cap open android`}
                </pre>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  Android Studio orqali <code>Build APK / Bundle</code> buyrug'ini bosing va <code>app-release.apk</code> faylini oling.
                </p>
              </div>

              <button
                onClick={handleDownloadAppBundle}
                className="w-full py-3 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold text-xs flex items-center justify-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                Manifest va Android sozlamalarni yuklab olish
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 flex items-center justify-between">
          <span className="text-[11px] text-neutral-400">Versiya 1.0.0 · WebAPK & Native Ready</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-semibold hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
}
