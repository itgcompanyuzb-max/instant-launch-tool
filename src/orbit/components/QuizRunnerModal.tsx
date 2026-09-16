import { useState, useEffect } from 'react';
import { Quiz } from '../types';
import { X, CheckCircle2, AlertCircle, Clock, ArrowRight, RotateCcw } from 'lucide-react';

interface QuizRunnerModalProps {
  quiz: Quiz | null;
  isOpen: boolean;
  onClose: () => void;
  onCompleteQuiz: (quizId: string, finalScore: number) => void;
}

export default function QuizRunnerModal({
  quiz,
  isOpen,
  onClose,
  onCompleteQuiz
}: QuizRunnerModalProps) {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 mins in seconds

  useEffect(() => {
    if (quiz && isOpen) {
      setCurrentQIndex(0);
      setSelectedAnswers({});
      setIsSubmitted(false);
      setTimeLeft((quiz.durationMinutes || 5) * 60);
    }
  }, [quiz, isOpen]);

  useEffect(() => {
    if (!isOpen || isSubmitted || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, isSubmitted, timeLeft]);

  if (!isOpen || !quiz) return null;

  const currentQuestion = quiz.questions[currentQIndex];
  const totalQuestions = quiz.questions.length;

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQIndex]: optionIndex
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });
    return Math.round((correct / totalQuestions) * 100);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const score = calculateScore();
    onCompleteQuiz(quiz.id, score);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const score = isSubmitted ? calculateScore() : 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-base text-neutral-900 dark:text-white">
              {quiz.title}
            </h3>
            <p className="text-xs text-neutral-500">
              {isSubmitted ? 'Natijalar' : `${totalQuestions} ta savoldan ${currentQIndex + 1}-savol`}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {!isSubmitted && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-mono font-medium">
                <Clock className="w-3.5 h-3.5 text-neutral-500" />
                {formattedTime}
              </div>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {isSubmitted ? (
            <div className="text-center py-4 space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-display text-2xl font-bold">
                {score}%
              </div>
              <div>
                <h4 className="text-lg font-bold text-neutral-900 dark:text-white">
                  {score >= 80 ? 'Ajoyib natija!' : score >= 60 ? 'Yaxshi urinish!' : 'Yana bir bor o\'rganing'}
                </h4>
                <p className="text-xs text-neutral-500 mt-1">
                  Siz {totalQuestions} ta savoldan {quiz.questions.filter((q, i) => selectedAnswers[i] === q.correctIndex).length} tasiga to'g'ri javob berdingiz.
                </p>
              </div>

              {/* Review answers */}
              <div className="space-y-3 text-left mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Savollar tahlili:
                </h5>
                {quiz.questions.map((q, idx) => {
                  const isCorrect = selectedAnswers[idx] === q.correctIndex;
                  return (
                    <div
                      key={q.id}
                      className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 text-xs"
                    >
                      <div className="flex items-start gap-2">
                        {isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <p className="font-semibold text-neutral-900 dark:text-white">
                            {idx + 1}. {q.question}
                          </p>
                          <p className="text-neutral-500 mt-1">
                            Tanlangan: <span className={isCorrect ? 'text-emerald-600 font-medium' : 'text-rose-500 font-medium'}>
                              {selectedAnswers[idx] !== undefined ? q.options[selectedAnswers[idx]] : "Belgilanmagan"}
                            </span>
                          </p>
                          {!isCorrect && (
                            <p className="text-emerald-600 dark:text-emerald-400 mt-0.5">
                              To'g'ri javob: {q.options[q.correctIndex]}
                            </p>
                          )}
                          {q.explanation && (
                            <p className="text-[11px] text-neutral-400 mt-1.5 italic bg-neutral-100 dark:bg-neutral-800 p-2 rounded-lg">
                              💡 {q.explanation}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <>
              {/* Progress bar */}
              <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-neutral-900 dark:bg-white h-full transition-all duration-300"
                  style={{ width: `${((currentQIndex + 1) / totalQuestions) * 100}%` }}
                />
              </div>

              {/* Question */}
              <div>
                <span className="text-[11px] font-bold text-neutral-400 tracking-wider uppercase">
                  Savol #{currentQIndex + 1}
                </span>
                <h4 className="text-base font-semibold text-neutral-900 dark:text-white mt-1">
                  {currentQuestion.question}
                </h4>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQuestion.options.map((opt, idx) => {
                  const isSelected = selectedAnswers[currentQIndex] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between text-xs font-medium ${
                        isSelected
                          ? 'border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900 shadow-sm'
                          : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                      }`}
                    >
                      <span>{opt}</span>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected
                            ? 'border-white dark:border-neutral-900 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-[10px] font-bold'
                            : 'border-neutral-300 dark:border-neutral-600'
                        }`}
                      >
                        {isSelected && '✓'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50 dark:bg-neutral-900">
          {isSubmitted ? (
            <div className="w-full flex items-center gap-3">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setSelectedAnswers({});
                  setCurrentQIndex(0);
                  setTimeLeft((quiz.durationMinutes || 5) * 60);
                }}
                className="flex-1 py-2.5 rounded-full border border-neutral-300 dark:border-neutral-700 text-xs font-semibold text-neutral-800 dark:text-neutral-200 flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Qayta topshirish
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-semibold"
              >
                Yopish
              </button>
            </div>
          ) : (
            <>
              <button
                disabled={currentQIndex === 0}
                onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-full text-xs font-semibold text-neutral-600 dark:text-neutral-400 disabled:opacity-30"
              >
                ← Oldingi
              </button>

              {currentQIndex < totalQuestions - 1 ? (
                <button
                  onClick={() => setCurrentQIndex(prev => Math.min(totalQuestions - 1, prev + 1))}
                  className="px-5 py-2 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-semibold flex items-center gap-1.5"
                >
                  Keyingi
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-5 py-2 rounded-full bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-emerald-700 transition-colors"
                >
                  Testni yakunlash
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
