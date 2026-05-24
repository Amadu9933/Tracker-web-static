import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastProps {
  message: string;
  type: ToastType;
  onClose?: () => void;
  /** ms before auto-dismiss. Set to 0 to disable. Default: 4000 */
  autoDismiss?: number;
  /** Render inline (flow) instead of fixed bottom-right */
  inline?: boolean;
  className?: string;
}

const CONFIG: Record<
  ToastType,
  {
    Icon: React.ElementType;
    iconColor: string;
    bg: string;
    border: string;
    progress: string;
  }
> = {
  success: {
    Icon: CheckCircle,
    iconColor: "text-[#16a34a] dark:text-[#4ade80]",
    bg: "bg-[#f0fdf4] dark:bg-[#14532d]/25",
    border: "border-l-[#16a34a]",
    progress: "#16a34a",
  },
  error: {
    Icon: XCircle,
    iconColor: "text-[#ef4444] dark:text-[#f87171]",
    bg: "bg-[#fef2f2] dark:bg-[#450a0a]/25",
    border: "border-l-[#ef4444]",
    progress: "#ef4444",
  },
  warning: {
    Icon: AlertTriangle,
    iconColor: "text-[#ff833c] dark:text-[#fb923c]",
    bg: "bg-[#fff7ed] dark:bg-[#431407]/25",
    border: "border-l-[#ff833c]",
    progress: "#ff833c",
  },
  info: {
    Icon: Info,
    iconColor: "text-[#3b82f6] dark:text-[#60a5fa]",
    bg: "bg-[#eff6ff] dark:bg-[#1e3a5f]/25",
    border: "border-l-[#3b82f6]",
    progress: "#3b82f6",
  },
};

const Toast: React.FC<ToastProps> = ({
  message,
  type,
  onClose,
  autoDismiss = 4000,
  inline = false,
  className = "",
}) => {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(100);

  const dismiss = () => {
    setShow(false);
    setTimeout(() => onClose?.(), 260);
  };

  useEffect(() => {
    if (!autoDismiss) return;

    const tick = 50;
    const decrement = 100 / (autoDismiss / tick);

    const interval = setInterval(() => {
      setProgress((p) => Math.max(0, p - decrement));
    }, tick);

    const timer = setTimeout(dismiss, autoDismiss);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoDismiss]);

  const { Icon, iconColor, bg, border, progress: barColor } = CONFIG[type];

  const slideProps = inline
    ? { initial: { opacity: 0, y: -8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 } }
    : { initial: { opacity: 0, x: 72 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 72 } };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          {...slideProps}
          transition={{ duration: 0.24, ease: "easeOut" }}
          className={
            inline
              ? `w-full my-2 ${className}`
              : `fixed bottom-5 right-5 z-[9999] w-[340px] max-w-[calc(100vw-2.5rem)] ${className}`
          }
          role="alert"
          aria-live="polite"
        >
          <div
            className={`
              relative flex items-start gap-3 px-4 py-3 rounded-lg overflow-hidden
              border border-gray-200 dark:border-[#2a2a2a] border-l-4 ${border}
              ${bg} shadow-md transition-colors duration-200
            `}
          >
            {/* Icon */}
            <span className={`shrink-0 mt-0.5 ${iconColor}`}>
              <Icon size={17} strokeWidth={2.2} />
            </span>

            {/* Message */}
            <p className="flex-1 text-sm text-gray-800 dark:text-gray-200 leading-snug">
              {message}
            </p>

            {/* Close button */}
            {onClose && (
              <button
                onClick={dismiss}
                aria-label="Dismiss"
                className="shrink-0 mt-0.5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-100 transition-colors duration-150"
              >
                <X size={14} />
              </button>
            )}

            {/* Progress bar */}
            {!!autoDismiss && (
              <div
                className="absolute bottom-0 left-0 h-[3px] rounded-full transition-none"
                style={{ width: `${progress}%`, backgroundColor: barColor }}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
