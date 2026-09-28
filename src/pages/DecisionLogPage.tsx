import React, { useState } from 'react';
import { DECISION_LOG } from '../data/mockData';
import { DecisionLogItem } from '../types';
import { FileText, Search, ChevronDown, ChevronUp, CheckCircle2, Clock, Layers } from 'lucide-react';
import { MetricCard } from '../components/common/MetricCard';

export const DecisionLogPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('dec-001');

  const filtered = DECISION_LOG.filter(item => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      item.decision.toLowerCase().includes(q) ||
      item.choice.toLowerCase().includes(q) ||
      item.reason.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">Engineering Decision Log</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              12 non-obvious architectural and system design choices, trade-off evaluations, and implementation rationale.
            </p>
          </div>
        </div>
      </div>

      {/* Overview KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard title="Total Architectural Decisions" value="12 Logged" subtitle="100% Implemented" icon={FileText} iconColor="text-cyan-500" />
        <MetricCard title="Primary Focus" value="Safety & Grounding" subtitle="RAG + Safety Guardrails" icon={Layers} iconColor="text-blue-500" />
        <MetricCard title="Trade-off Balance" value="Precision &gt; Speed" subtitle="Conservative auto-handling" icon={CheckCircle2} iconColor="text-emerald-500" />
      </div>

      {/* Decision Log Table */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
            Non-Obvious Engineering Decisions
          </h2>
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search decisions or keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-3">
          {filtered.map((item) => {
            const isExpanded = expandedId === item.id;

            return (
              <div 
                key={item.id}
                className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden transition-all bg-white dark:bg-gray-900"
              >
                <div
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="p-4 bg-gray-50/60 dark:bg-gray-800/40 hover:bg-gray-100/60 dark:hover:bg-gray-800/70 cursor-pointer flex items-center justify-between gap-4 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-cyan-600 dark:text-cyan-400">{item.id}</span>
                    <div>
                      <h3 className="text-xs font-bold text-gray-900 dark:text-white">{item.decision}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold">{item.category}</span>
                        <span className="text-[10px] text-gray-400 font-mono">{item.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      {item.status}
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-5 border-t border-gray-100 dark:border-gray-800 space-y-4 text-xs bg-white dark:bg-gray-900">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Choice */}
                      <div className="p-3.5 bg-blue-50/50 dark:bg-blue-950/30 rounded-lg border border-blue-100 dark:border-blue-900/40 space-y-1">
                        <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">Architectural Choice</span>
                        <p className="text-gray-900 dark:text-gray-100 font-medium">{item.choice}</p>
                      </div>

                      {/* Reason */}
                      <div className="p-3.5 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-lg border border-emerald-100 dark:border-emerald-900/40 space-y-1">
                        <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Primary Reason</span>
                        <p className="text-gray-900 dark:text-gray-100 font-medium">{item.reason}</p>
                      </div>

                      {/* Trade-off */}
                      <div className="p-3.5 bg-amber-50/50 dark:bg-amber-950/30 rounded-lg border border-amber-100 dark:border-amber-900/40 space-y-1">
                        <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">Identified Trade-off</span>
                        <p className="text-gray-900 dark:text-gray-100 font-medium">{item.tradeoff}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
