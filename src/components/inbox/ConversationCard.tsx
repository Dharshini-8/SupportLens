import React from 'react';
import { Conversation } from '../../types';
import { IntentBadge } from '../common/IntentBadge';
import { DecisionBadge } from '../common/DecisionBadge';
import { StatusBadge } from '../common/StatusBadge';

interface ConversationCardProps {
  conversation: Conversation;
  isSelected: boolean;
  onSelect: () => void;
}

export const ConversationCard: React.FC<ConversationCardProps> = ({
  conversation,
  isSelected,
  onSelect
}) => {
  return (
    <div
      onClick={onSelect}
      className={`p-3.5 border-b border-gray-100 dark:border-gray-800/80 cursor-pointer transition-all ${
        isSelected 
          ? 'bg-blue-50/60 dark:bg-blue-950/40 border-l-4 border-l-blue-600 dark:border-l-blue-400' 
          : 'hover:bg-gray-50 dark:hover:bg-gray-800/40'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 truncate">
          <img
            src={conversation.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
            alt={conversation.customerName}
            className="w-8 h-8 rounded-full object-cover shrink-0 border border-gray-200 dark:border-gray-700"
          />
          <div className="truncate">
            <h4 className="text-xs font-semibold text-gray-900 dark:text-white truncate leading-tight">
              {conversation.customerName}
            </h4>
            <p className="text-[10px] text-gray-400 truncate">{conversation.customerHandle}</p>
          </div>
        </div>
        <span className="text-[10px] text-gray-400 shrink-0 font-mono">{conversation.timestamp}</span>
      </div>

      <p className="text-xs text-gray-700 dark:text-gray-300 line-clamp-2 mt-2 font-normal">
        "{conversation.message}"
      </p>

      <div className="mt-2.5 flex items-center justify-between gap-1 flex-wrap">
        <IntentBadge intent={conversation.intent} size="sm" />
        <DecisionBadge decision={conversation.decision} size="sm" />
      </div>

      <div className="mt-2 flex items-center justify-between pt-1 border-t border-gray-100/60 dark:border-gray-800/40 text-[10px]">
        <StatusBadge status={conversation.status} />
        <span className="font-mono text-gray-500 font-semibold">{Math.round(conversation.confidence * 100)}% conf</span>
      </div>
    </div>
  );
};
