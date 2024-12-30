import { useEffect, useState } from 'react';

interface CircularTimerProgressProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  circleColor?: string;
  backgroundColor?: string;
}

export function CircularTimerProgress({
  progress,
  size = 320,
  strokeWidth = 8,
  circleColor = "#39FF14",
  backgroundColor = "#1f2937"
}: CircularTimerProgressProps) {
  const [offset, setOffset] = useState(0);
  
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    // Инвертируем прогресс для регрессии
    const progressOffset = ((100 - progress) / 100) * circumference;
    setOffset(progressOffset);
  }, [progress, circumference]);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ transform: 'rotate(90deg) scale(-1, 1)' }}
    >
      {/* Фоновый круг */}
      <circle
        stroke={backgroundColor}
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={center}
        cy={center}
      />
      
      {/* Прогресс круг */}
      <circle
        className="transition-all duration-1000 ease-linear" // Изменили duration-300 на duration-1000 и добавили ease-linear
        stroke={circleColor}
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        r={radius}
        cx={center}
        cy={center}
        style={{
          transformOrigin: 'center',
          transform: 'rotate(0deg)'
        }}
      />
    </svg>
  );
}
