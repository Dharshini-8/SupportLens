import React from 'react';
import { Evidence } from '../../types';
import { History, CheckCircle2, Sparkles } from 'lucide-react';

export const EvidenceCard: React.FC<{ evidence: Evidence }> = ({ evidence }) => {
  const similarityPct = Math.round(evidence.similarityScore * 100);

  return (
    <div className="bg-slate-50 dark:bg-gray-800/60 border border-slate-200 dark:border-gray-700/70 rounded-lg p-3.5 space-y-2.5 text-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium text-[11px]">
          <History className="w-3.5 h-3.5 text-blue-500" />
          <span>Historical Match ({evidence.handle})</span>
        </div>
        <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
          {similarityPct}% Similarity
        </span>
      </div>

      <div className="space-y-1.5">
        <div className="bg-white dark:bg-gray-900 p-2.5 rounded border border-gray-100 dark:border-gray-800">
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mb-0.5">Previous Customer Tweet</span>
          <p className="text-gray-900 dark:text-gray-200 font-medium">"{evidence.customerMessage}"</p>
        </div>

        <div className="bg-blue-50/50 dark:bg-blue-950/30 p-2.5 rounded border border-blue-100/50 dark:border-blue-900/40">
          <span className="text-[10px] font-semibold text-blue-500 uppercase tracking-wider block mb-0.5">Historical Brand Response</span>
          <p className="text-gray-800 dark:text-gray-300">"{evidence.brandResponse}"</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] pt-1 text-emerald-700 dark:text-emerald-400 font-medium">
        <span className="flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Resolution: {evidence.resolution}
        </span>
        <span className="text-gray-400 font-mono text-[10px]">{evidence.timestamp}</span>
      </div>
    </div>
  );
};
