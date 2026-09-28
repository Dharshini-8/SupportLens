import React from 'react';
import { RiskLevel } from '../../types';

interface ConfidenceBarProps {
  confidence: number; // 0 to 1 or 0 to 100
  riskLevel?: RiskLevel;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ConfidenceBar: React.FC<ConfidenceBarProps> = ({
  confidence,
  riskLevel,
  showLabel = true,
  size = 'md'
}) => {
  const percentage = confidence <= 1 ? Math.round(confidence * 100) : Math.round(confidence);

  let barColor = 'bg-emerald-500';
  let textColor = 'text-emerald-600 dark:text-emerald-400';

  if (percentage < 85) {
    barColor = 'bg-rose-500';
    textColor = 'text-rose-600 dark:text-rose-400';
  } else if (percentage < 92) {
    barColor = 'bg-amber-500';
    textColor = 'text-amber-600 dark:text-amber-400';
  }

  const heightClass = size === 'sm' ? 'h-1.5' : size === 'lg' ? 'h-3' : 'h-2';

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex items-center justify-between text-xs font-medium mb-1">
          <span className="text-gray-500 dark:text-gray-400">Confidence</span>
          <div className="flex items-center gap-2">
            <span className={`font-semibold ${textColor}`}>{percentage}%</span>
            {riskLevel && (
              <span className={`text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded ${
                riskLevel === 'CRITICAL' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' :
                riskLevel === 'HIGH' ? 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300' :
                riskLevel === 'MEDIUM' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
                'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
              }`}>
                {riskLevel} RISK
              </span>
            )}
          </div>
        </div>
      )}
      <div className={`w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden ${heightClass}`}>
        <div 
          className={`h-full ${barColor} transition-all duration-500 ease-out rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
