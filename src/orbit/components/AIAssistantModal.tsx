import { useState } from 'react';
import { X, Sparkles, Send, Bot, User, BookOpen } from 'lucide-react';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export default function AIAssistantModal({
  isOpen,
  onClose
}: AIAssistantModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: "Salom! Men Orbit AI o'quv yordamchingizman. Frontend, HTML/CSS, moliyaviy savodxonlik yoki psixologiya bo'yicha tushunmagan mavzularingiz bo'lsa, bemalol so'rang!",
      timestamp: '09:41'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    "HTML semantik teglari nima uchun kerak?",
    "Flexbox va Grid farqi nimada?",
    "50/30/20 byudjet qoidasini tushuntirib bering",
    "Emotsional intellektni qanday oshirish mumkin?"
  ];

  const generateAnswer = (prompt: string): string => {
    const p = prompt.toLowerCase();
    if (p.includes('html') || p.includes('semantik')) {
      return "HTML semantik teglari (<header>, <nav>, <main>, <section>, <article>, <footer>) brauzer va qidiruv tizimlari (SEO) ga sahifaning haqiqiy ma'nosini bildiradi. Shuningdek, ko'rishida nuqsoni bor foydalanuvchilar (Screen Reader) uchun saytni qulay qiladi.";
    }
    if (p.includes('flexbox') || p.includes('grid')) {
      return "Flexbox bir o'lchamli (1D — faqat qator yoki faqat ustun) joylashuvlar uchun eng zo'r vosita. CSS Grid esa ikki o'lchamli (2D — bir vaqtning o'zida qator va ustunlar kesishmasi) murakkab sahifa karkaslari uchun qo'llaniladi.";
    }
    if (p.includes('50/30/20') || p.includes('byudjet') || p.includes('moliya')) {
      return "50/30/20 qoidasi shaxsiy byudjetni taqsimlash formulasi:\n• 50% — Asosiy ehtiyojlar (ovqat, kommunal, ijara)\n• 30% — Xohish-istaklar (ko'ngilochar, kiyim, sayohat)\n• 20% — Jamg'arma, investitsiya va xavfsizlik yostig'i.";
    }
    if (p.includes('psixologiya') || p.includes('emotsional') || p.includes('eq')) {
      return "Emotsional intellekt (EQ) — o'z his-tuyg'ularingizni tanib olish, ularni boshqara olish va atrofingizdagilar bilan empatiya (hamdardlik) o'rnatish mahoratidir. Kundalik 'hislar kundaligi' tutish va faol tinglash mashqlari EQ ni oshiradi.";
    }
    return `"${prompt}" bo'yicha Orbit LMS darslaridan ma'lumot tahlil qilindi: Ushbu tushuncha siz o'rganayotgan modulning muhim amaliy bosqichidir. Dars konspekti (PDF) va amaliy topshiriqlarni ko'rib chiqishni tavsiya qilaman!`;
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText.trim();
    if (!text) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateAnswer(text);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col h-[600px] max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-neutral-900 dark:bg-neutral-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-display font-bold text-sm">Orbit AI Tutor</h3>
              <p className="text-[11px] text-neutral-300">24/7 Aqlli o'quv yordamchisi</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-neutral-300 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat message list */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-neutral-50 dark:bg-neutral-950">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-full bg-neutral-900 dark:bg-neutral-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-neutral-900 text-white rounded-tr-none'
                    : 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-700 rounded-tl-none shadow-xs'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>
                <span className="block text-[10px] text-right mt-1 opacity-60">
                  {msg.timestamp}
                </span>
              </div>
              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-full bg-neutral-300 dark:bg-neutral-700 text-neutral-800 dark:text-white flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-neutral-400 text-xs italic">
              <Bot className="w-4 h-4" />
              <span>Orbit AI javob yozmoqda...</span>
            </div>
          )}
        </div>

        {/* Quick prompt buttons */}
        <div className="px-4 py-2 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 overflow-x-auto flex gap-2 no-scrollbar">
          {quickPrompts.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-[11px] font-medium whitespace-nowrap shrink-0 flex items-center gap-1 transition-colors"
            >
              <BookOpen className="w-3 h-3 text-neutral-500" />
              {q}
            </button>
          ))}
        </div>

        {/* Chat input form */}
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="Savolingizni yozing..."
            className="flex-1 bg-neutral-100 dark:bg-neutral-800 border-none rounded-full px-4 py-2 text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-400"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="w-8 h-8 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center disabled:opacity-40 hover:opacity-90 transition-opacity shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
