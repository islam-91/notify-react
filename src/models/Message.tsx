import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

export type Variant = 'success' | 'error' | 'warning' | 'info';
export type Position =
  | 'tR' // top right
  | 'tL' // top left
  | 'tC' // top center
  | 'cR' // center right
  | 'cL' // center left
  | 'cC' // center center
  | 'bR' // bottom right
  | 'bL' // bottom left
  | 'bC'; // bottom center

interface MessageProps {
  message: string;
  duration?: number; // Duration in milliseconds before auto-dismiss
  variant?: Variant;
  position?: Position;
  // Customization options:
  background?: string;     // Overrides the default background
  textColor?: string;      // Overrides the default text color
  progressColor?: string;  // Overrides the default progress bar color
  customIcon?: React.ReactNode; // Overrides the default icon
}

// Container positioning styles based on the provided position prop.
const containerStyles: Record<Position, React.CSSProperties> = {
  tR: { position: 'fixed', top: '20px', right: '20px' },
  tL: { position: 'fixed', top: '20px', left: '20px' },
  tC: { position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)' },
  cR: { position: 'fixed', top: '50%', right: '20px', transform: 'translateY(-50%)' },
  cL: { position: 'fixed', top: '50%', left: '20px', transform: 'translateY(-50%)' },
  cC: { position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
  bR: { position: 'fixed', bottom: '20px', right: '20px' },
  bL: { position: 'fixed', bottom: '20px', left: '20px' },
  bC: { position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)' },
};

const getToastContainer = (position: Position): HTMLElement => {
  const containerId = `toast-root-${position}`;
  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    Object.assign(container.style, containerStyles[position], {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      zIndex: '1000',
    });
    document.body.appendChild(container);
  }
  return container;
};

// Returns the default inline SVG icon based on the variant.
const getDefaultIconSvg = (variant: Variant) => {
  switch (variant) {
    case 'success':
      return (
        <svg
          className="toast-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          style={{ marginRight: '8px' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
    case 'error':
      return (
        <svg
          className="toast-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          style={{ marginRight: '8px' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      );
    case 'warning':
      return (
        <svg
          className="toast-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          style={{ marginRight: '8px' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
        </svg>
      );
    case 'info':
    default:
      return (
        <svg
          className="toast-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          style={{ marginRight: '8px' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
        </svg>
      );
  }
};

const ToastMessage: React.FC<MessageProps> = ({
  message,
  duration = 3000,
  variant = 'info',
  position = 'tR',
  background,    // Optional override for background
  textColor,     // Optional override for text color
  progressColor, // Optional override for progress bar color
  customIcon,    // Optional override for icon
}) => {
  const [visible, setVisible] = useState(true);
  const [closing, setClosing] = useState(false);
  const [isPaused, setPaused] = useState(false);
  const [remaining, setRemaining] = useState(duration);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  const handleClose = () => {
    setClosing(true);
    // Wait for the exit transition duration (500ms in this case)
    setTimeout(() => {
      setVisible(false);
    }, 500);
  };

  useEffect(() => {
    startTimeRef.current = Date.now();
    timerRef.current = setTimeout(handleClose, remaining);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    setPaused(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    const elapsed = Date.now() - startTimeRef.current;
    setRemaining((prev) => prev - elapsed);
  };

  const handleMouseLeave = () => {
    setPaused(false);
    startTimeRef.current = Date.now();
    timerRef.current = setTimeout(handleClose, remaining);
  };

  if (!visible) return null;

  // Combine optional style overrides with existing classes.
  const toastStyle: React.CSSProperties = {
    background, // If not provided, CSS class will handle the background
    color: textColor,
  };

  const progressStyle: React.CSSProperties = {
    animationDuration: `${duration}ms`,
    animationPlayState: isPaused ? 'paused' : 'running',
    ...(progressColor ? { background: progressColor } : {}),
  };

  const toastContent = (
    <div
      className={`toast-message toast-message-${variant} ${closing ? 'hide' : ''}`}
      style={toastStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="toast-content" style={{ display: 'flex', alignItems: 'center' }}>
        {/* Use customIcon if provided, otherwise fallback to default icon */}
        {customIcon ? customIcon : getDefaultIconSvg(variant)}
        <span className="toast-message-text">{message}</span>
        <button className="toast-message-close" onClick={handleClose} aria-label="Close">
          ✕
        </button>
      </div>
      <div className="toast-message-progress" style={progressStyle}></div>
    </div>
  );

  return ReactDOM.createPortal(toastContent, getToastContainer(position));
};

export default ToastMessage;
