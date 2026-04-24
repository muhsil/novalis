"use client";
import { useEffect, useState } from 'react';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

let toastId = 0;
const listeners: ((toasts: Toast[]) => void)[] = [];
let toastList: Toast[] = [];

export function toast(message: string, type: Toast['type'] = 'success') {
  const id = ++toastId;
  toastList = [...toastList, { id, message, type }];
  listeners.forEach(l => l(toastList));
  setTimeout(() => {
    toastList = toastList.filter(t => t.id !== id);
    listeners.forEach(l => l(toastList));
  }, 3500);
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  useEffect(() => {
    listeners.push(setToasts);
    return () => { listeners.splice(listeners.indexOf(setToasts), 1); };
  }, []);

  return (
    <div className="fixed bottom-6 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 z-[200] flex flex-col gap-2.5 items-center pointer-events-none max-w-[92vw]">
      {toasts.map(t => {
        const variant =
          t.type === 'success'
            ? 'bg-[#742938] text-white border-[#5b1f2c]'
            : t.type === 'error'
              ? 'bg-white text-[#8B0000] border-[#8B0000]/40'
              : 'bg-[#121212] text-white border-[#121212]';
        const iconTint =
          t.type === 'success'
            ? 'text-[#d2c7bf]'
            : t.type === 'error'
              ? 'text-[#8B0000]'
              : 'text-[#d2c7bf]';
        const accentBar =
          t.type === 'success'
            ? 'bg-[#d2c7bf]'
            : t.type === 'error'
              ? 'bg-[#8B0000]'
              : 'bg-[#d2c7bf]';
        return (
          <div
            key={t.id}
            className={`relative overflow-hidden flex items-center gap-3 ps-4 pe-5 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.15)] text-sm font-medium border ${variant}`}
            style={{ animation: 'toastIn 0.28s cubic-bezier(.2,.9,.3,1)' }}
          >
            <span className={`absolute start-0 inset-y-0 w-[3px] ${accentBar}`} />
            <span className={`inline-flex items-center justify-center w-5 h-5 shrink-0 ${iconTint}`}>
              {t.type === 'success' ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              ) : t.type === 'error' ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </span>
            <span className="leading-snug">{t.message}</span>
          </div>
        );
      })}
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
