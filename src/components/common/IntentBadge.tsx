import React from 'react';

interface IntentBadgeProps {
  intent: string;
  size?: 'sm' | 'md';
}

export const IntentBadge: React.FC<IntentBadgeProps> = ({ intent, size = 'md' }) => {
  const sizeClasses = size === 'sm' ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2 py-0.5 font-medium';

  // Specific colors per intent category
  let style = 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800';

  if (intent.includes('Security') || intent.includes('Access')) {
    style = 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800';
  } else if (intent.includes('Refund') || intent.includes('Duplicate') || intent.includes('Payment')) {
    style = 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800';
  } else if (intent.includes('Order') || intent.includes('Status')) {
    style = 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800';
  } else if (intent.includes('Technical')) {
    style = 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
  }

  return (
    <span className={`inline-flex items-center rounded-md border ${sizeClasses} ${style}`}>
      {intent}
    </span>
  );
};
