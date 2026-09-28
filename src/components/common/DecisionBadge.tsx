import React from 'react';
import { DecisionType } from '../../types';
import { CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';

interface DecisionBadgeProps {
  decision: DecisionType;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const DecisionBadge: React.FC<DecisionBadgeProps> = ({
  decision,
  size = 'md',
  showIcon = true
}) => {
  const isAuto = decision === 'AUTO_HANDLE';

  const sizeClasses = size === 'sm' 
    ? 'text-[11px] px-2 py-0.5 gap-1' 
    : size === 'lg' 
    ? 'text-xs px-3 py-1.5 gap-1.5 font-semibold' 
    : 'text-xs px-2.5 py-1 gap-1.5 font-medium';

  return (
    <span className={`inline-flex items-center rounded-md border transition-colors ${sizeClasses} ${
      isAuto
        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/60'
        : 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800/60'
    }`}>
      {showIcon && (
        isAuto ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
      )}
      <span>{isAuto ? 'AUTO-HANDLED' : 'ESCALATED TO HUMAN'}</span>
    </span>
  );
};
