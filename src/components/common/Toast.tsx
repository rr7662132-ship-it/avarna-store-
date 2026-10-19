import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
};

const styleMap = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  error: 'border-red-200 bg-red-50 text-red-800',
  info: 'border-blue-200 bg-blue-50 text-blue-800',
};

const iconStyleMap = {
  success: 'text-emerald-500',
  error: 'text-red-500',
  info: 'text-blue-500',
};

let toastCounter = 0;

const ToastItem: React.FC<{ toast: Toast; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss,
}) => {
  const [visible, setVisible] = useState(false);
  const Icon = iconMap[toast.type];

  useEffect(() => {
    // Trigger slide-in
    requestAnimationFrame(() => setVisible(true));

    // Auto-dismiss after 3 seconds
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onDismiss(toast.id), 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const handleDismiss = () => {
    setVisible(false);
    setTimeout(() => onDismiss(toast.id), 300);
  };

  return (
    <div
      className={`flex items-center gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur-sm transition-all duration-300 ${
        styleMap[toast.type]
      } ${visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
    >
      <Icon className={`h-5 w-5 flex-shrink-0 ${iconStyleMap[toast.type]}`} />
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
      <button
        onClick={handleDismiss}
        className="flex-shrink-0 rounded-full p-1 opacity-60 transition-opacity hover:opacity-100"
        aria-label="Dismiss"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = `toast-${++toastCounter}-${Date.now()}`;
    setToasts((prev) => [...prev, { id, type, message }]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast Container — top right */}
      <div className="fixed right-4 top-4 z-[100] flex w-80 max-w-[calc(100vw-2rem)] flex-col gap-2">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={dismissToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
