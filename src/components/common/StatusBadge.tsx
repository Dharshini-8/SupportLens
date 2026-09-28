import React from 'react';
import { ConversationStatus } from '../../types';

interface StatusBadgeProps {
  status: ConversationStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let style = 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
  let label = status.toUpperCase();

  switch (status) {
    case 'approved':
      style = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
      label = 'APPROVED';
      break;
    case 'escalated':
      style = 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300';
      label = 'ESCALATED';
      break;
    case 'edited':
      style = 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300';
      label = 'HUMAN EDITED';
      break;
    case 'resolved':
      style = 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300';
      label = 'RESOLVED';
      break;
    case 'open':
    default:
      style = 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300';
      label = 'PENDING REVIEW';
      break;
  }

  return (
    <span className={`text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded ${style}`}>
      {label}
    </span>
  );
};
