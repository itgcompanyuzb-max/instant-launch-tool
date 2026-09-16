import { useState, useRef, useEffect, TouchEvent, MouseEvent } from 'react';
import { ArrowRight, Check, X, Lock, User } from 'lucide-react';

interface ValidationResult {
  valid: boolean;
  errorMsg?: string;
}

interface SwipeToStartProps {
  onSuccess: () => void;
  onValidate?: () => ValidationResult;
  label?: string;
}

export default function SwipeToStart({
  onSuccess,
  onValidate,
  label = "Boshlash uchun o'ngga suring"
}: SwipeToStartProps) {
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number>(0);
  const maxDragRef = useRef<number>(200);
  const lastVibePosRef = useRef<number>(0);

  const updateMaxDrag = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const thumbWidth = 56;
      maxDragRef.current = Math.max(containerWidth - thumbWidth - 8, 80);
    }
  };

  useEffect(() => {
    updateMaxDrag();
    window.addEventListener('resize', updateMaxDrag);
    return () => window.removeEventListener('resize', updateMaxDrag);
  }, []);

  // iPhone picker style "trrrrr" haptic: a short tick every few pixels of drag
  const triggerDragHaptic = (currentX: number) => {
    if (Math.abs(currentX - lastVibePosRef.current) >= 6) {
      lastVibePosRef.current = currentX;
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        try {
          navigator.vibrate(6);
        } catch (_) {}
      }
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    if (isCompleted || isError) return;
    updateMaxDrag();
    setIsDragging(true);
    startXRef.current = e.touches[0].clientX - dragX;
    lastVibePosRef.current = dragX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || isCompleted || isError) return;
    const currentX = e.touches[0].clientX;
    const newX = currentX - startXRef.current;
    const boundedX = Math.max(0, Math.min(newX, maxDragRef.current));
    setDragX(boundedX);
    triggerDragHaptic(boundedX);

    if (boundedX >= maxDragRef.current * 0.88) {
      processSwipeEnd();
    }
  };

  const handleTouchEnd = () => {
    if (isCompleted || isError) return;
    setIsDragging(false);
    if (dragX < maxDragRef.current * 0.88) {
      setDragX(0);
    }
  };

  const handleMouseDown = (e: MouseEvent) => {
    if (isCompleted || isError) return;
    updateMaxDrag();
    setIsDragging(true);
    startXRef.current = e.clientX - dragX;
    lastVibePosRef.current = dragX;

    const handleMouseMove = (moveEvent: globalThis.MouseEvent) => {
      const newX = moveEvent.clientX - startXRef.current;
      const boundedX = Math.max(0, Math.min(newX, maxDragRef.current));
      setDragX(boundedX);
      triggerDragHaptic(boundedX);

      if (boundedX >= maxDragRef.current * 0.88) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        processSwipeEnd();
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setDragX(prev => (prev < maxDragRef.current * 0.88 ? 0 : prev));
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const processSwipeEnd = () => {
    setIsDragging(false);

    // Validate login & password if validator passed
    const result = onValidate ? onValidate() : { valid: true };

    if (result.valid) {
      // Success case
      setIsCompleted(true);
      setIsError(false);
      setDragX(maxDragRef.current);

      if (navigator.vibrate) {
        try {
          navigator.vibrate([40, 30, 80]);
        } catch (_) {}
      }

      setTimeout(() => {
        onSuccess();
      }, 350);
    } else {
      // Error case (Incorrect login or password)
      setIsError(true);
      setErrorMessage(result.errorMsg || "X Noto'g'ri login yoki parol");
      setDragX(maxDragRef.current);

      // "tk-tk-tk-tk" error buzz — fast, sharp, like iOS error haptic
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        try {
          navigator.vibrate([25, 35, 25, 35, 25, 35, 25, 35, 60]);
        } catch (_) {}
      }

      // Reset back after showing red error state
      setTimeout(() => {
        setIsError(false);
        setErrorMessage('');
        setDragX(0);
      }, 1400);
    }
  };

  const progress = maxDragRef.current > 0 ? dragX / maxDragRef.current : 0;

  return (
    <div className="w-full space-y-2 select-none">
      {/* Container Button */}
      <div
        ref={containerRef}
        className={`relative w-full h-16 rounded-full border p-1 flex items-center shadow-xl overflow-hidden cursor-grab active:cursor-grabbing transition-colors duration-300 ${
          isCompleted
            ? 'bg-emerald-950/80 border-emerald-500/80'
            : isError
            ? 'bg-rose-950/90 border-rose-500/80 animate-shake'
            : 'bg-neutral-900 dark:bg-neutral-800 border-neutral-700/60 dark:border-neutral-700'
        }`}
      >
        {/* Sliding Fill Track */}
        <div
          className={`absolute left-1 top-1 bottom-1 rounded-full transition-all pointer-events-none ${
            isCompleted
              ? 'bg-emerald-500'
              : isError
              ? 'bg-rose-600'
              : 'bg-white dark:bg-white'
          }`}
          style={{
            width: `${dragX + 54}px`,
            transition: isDragging ? 'none' : 'width 0.3s cubic-bezier(0.25, 1, 0.5, 1)'
          }}
        />

        {/* Label Text */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-200"
          style={{ opacity: Math.max(0, 1 - progress * 1.6) }}
        >
          <span className="text-xs font-bold tracking-wide text-neutral-300 dark:text-neutral-300 flex items-center gap-2 pl-6">
            <span>{label}</span>
            <span className="flex items-center text-white/50 animate-pulse font-mono tracking-tighter">
              &gt;&gt;&gt;
            </span>
          </span>
        </div>

        {/* Error Text Overlay on End */}
        {isError && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-in fade-in duration-200">
            <span className="text-xs font-bold text-white tracking-wide px-4 text-center">
              {errorMessage}
            </span>
          </div>
        )}

        {/* Draggable Thumb */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          style={{
            transform: `translateX(${dragX}px)`,
            transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)'
          }}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors z-10 ${
            isCompleted
              ? 'bg-emerald-500 text-white'
              : isError
              ? 'bg-rose-600 text-white'
              : progress > 0.5
              ? 'bg-neutral-900 text-white'
              : 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white'
          }`}
        >
          {isCompleted ? (
            <Check className="w-6 h-6 animate-scale text-white" />
          ) : isError ? (
            <X className="w-6 h-6 animate-bounce text-white" />
          ) : (
            <div className="flex items-center justify-center">
              <ArrowRight className={`w-5 h-5 transition-transform ${isDragging ? 'translate-x-0.5 scale-110' : ''}`} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
