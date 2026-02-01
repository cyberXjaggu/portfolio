import { useState, useEffect, memo } from 'react';
import '../styles/theme.css';

const MATRIX_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]|;:<>?/~`';
const BOOT_MESSAGES = [
  'Initializing secure connection...',
  'Loading encryption modules...',
  'Establishing firewall protocols...',
  'System ready.'
];

const BootLoader = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [matrixChars, setMatrixChars] = useState([]);
  const [isExiting, setIsExiting] = useState(false);

  // Generate matrix rain characters
  useEffect(() => {
    const chars = [];
    for (let i = 0; i < 50; i++) {
      chars.push({
        id: i,
        char: MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)],
        x: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 1 + Math.random() * 2,
        opacity: 0.1 + Math.random() * 0.4
      });
    }
    setMatrixChars(chars);
  }, []);

  // Progress bar animation
  useEffect(() => {
    const duration = 2500; // 2.5 seconds
    const interval = 50;
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Update boot messages based on progress
  useEffect(() => {
    if (progress < 25) setMessageIndex(0);
    else if (progress < 50) setMessageIndex(1);
    else if (progress < 80) setMessageIndex(2);
    else setMessageIndex(3);
  }, [progress]);

  // Trigger exit animation when complete
  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          onLoadComplete?.();
        }, 500);
      }, 300);
    }
  }, [progress, onLoadComplete]);

  return (
    <div className={`boot-loader ${isExiting ? 'boot-loader-exit' : ''}`}>
      {/* Matrix rain background */}
      <div className="matrix-rain">
        {matrixChars.map((item) => (
          <span
            key={item.id}
            className="matrix-char"
            style={{
              left: `${item.x}%`,
              animationDelay: `${item.delay}s`,
              animationDuration: `${item.duration}s`,
              opacity: item.opacity
            }}
          >
            {item.char}
          </span>
        ))}
      </div>

      {/* Central loader content */}
      <div className="boot-content">
        <div className="boot-logo hacker-style">
          <span className="boot-prompt">root@</span>
          <span className="boot-user">cyberXjaggu</span>
          <span className="boot-symbol">:~#</span>
          <span className="boot-cursor-inline">_</span>
        </div>

        <div className="boot-status">
          <span className="boot-message">{BOOT_MESSAGES[messageIndex]}</span>
          <span className="boot-cursor">_</span>
        </div>

        <div className="boot-progress-container">
          <div
            className="boot-progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="boot-percentage">{Math.round(progress)}%</div>
      </div>

      {/* Scan line effect */}
      <div className="scan-line" />
    </div>
  );
};

export default memo(BootLoader);
