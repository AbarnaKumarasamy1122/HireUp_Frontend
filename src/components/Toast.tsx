import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { X, CheckCircle, AlertCircle } from "lucide-react";

type ToastType = "success" | "error" | "warning" | "info";

type ToastItem = {
  id: number;
  type: ToastType;
  message: string;
};

type ToastContextType = {
  success: (msg: string) => void;
  error: (msg: string) => void;
  warning: (msg: string) => void;
  info: (msg: string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
};

type Props = {
  children: ReactNode;
};

export const ToastProvider = ({ children }: Props) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToast = useCallback((type: ToastType, message: string) => {
    const id = Date.now();

    setToasts((prev) => [...prev, { id, type, message }]);

    setTimeout(() => removeToast(id), 5000);
  }, []);

  const success = (msg: string) => addToast("success", msg);
  const error = (msg: string) => addToast("error", msg);
  const warning = (msg: string) => addToast("warning", msg);
  const info = (msg: string) => addToast("info", msg);

  const getStyles = (type: ToastType) => {
    switch (type) {
      case "error":
        return "bg-red-50 border-red-200 text-red-800";
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case "info":
        return "bg-blue-50 border-blue-200 text-blue-800";
      default:
        return "bg-green-50 border-green-200 text-green-800";
    }
  };

  const getIcon = (type: ToastType) => {
    switch (type) {
      case "error":
        return <AlertCircle className="text-red-600" size={20} />;
      case "warning":
        return <AlertCircle className="text-yellow-600" size={20} />;
      case "info":
        return <AlertCircle className="text-blue-600" size={20} />;
      default:
        return <CheckCircle className="text-green-600" size={20} />;
    }
  };

  const getTitle = (type: ToastType) => {
    switch (type) {
      case "error":
        return "Error";
      case "warning":
        return "Warning";
      case "info":
        return "Info";
      default:
        return "Success";
    }
  };

  return (
    <ToastContext.Provider value={{ success, error, warning, info }}>
      {children}

      {/* TOAST CONTAINER */}
      <div className="fixed top-4 right-4 z-[99999] space-y-3 w-full max-w-sm">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`rounded-xl shadow-lg border flex items-start gap-3 p-4 fade-in ${getStyles(
              toast.type
            )}`}
          >
            {/* ICON */}
            <div className="mt-0.5">{getIcon(toast.type)}</div>

            {/* CONTENT */}
            <div className="flex-1">
              <p className="text-sm font-semibold">
                {getTitle(toast.type)}
              </p>

              <p className="text-sm mt-1 opacity-90">
                {toast.message}
              </p>
            </div>

            {/* CLOSE */}
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-500 hover:text-black"
            >
              <X size={18} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};