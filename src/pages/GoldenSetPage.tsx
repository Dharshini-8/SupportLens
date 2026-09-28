import React, { useState } from 'react';
import { GOLDEN_DATASET, INTENTS } from '../data/mockData';
import { GoldenExample } from '../types';
import { MetricCard } from '../components/common/MetricCard';
import { IntentBadge } from '../components/common/IntentBadge';
import { DecisionBadge } from '../components/common/DecisionBadge';
import { Database, Search, Filter, CheckCircle2, XCircle, Eye, Info, ChevronLeft, ChevronRight } from 'lucide-react';

export const GoldenSetPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedIntent, setSelectedIntent] = useState('all');
  const [selectedDecision, setSelectedDecision] = useState('all');
  const [correctnessFilter, setCorrectnessFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeModalItem, setActiveModalItem] = useState<GoldenExample | null>(null);

  const itemsPerPage = 10;

  const filtered = GOLDEN_DATASET.filter(item => {
    if (selectedIntent !== 'all' && item.intent.toLowerCase() !== selectedIntent.toLowerCase()) return false;
    if (selectedDecision !== 'all' && item.expectedDecision !== selectedDecision) return false;
    if (correctnessFilter === 'correct' && !item.isCorrect) return false;
    if (correctnessFilter === 'incorrect' && item.isCorrect) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        item.id.toLowerCase().includes(q) ||
        item.customerMessage.toLowerCase().includes(q) ||
        item.intent.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">Golden Evaluation Set</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Hand-labelled ground-truth evaluation set (200 curated examples) used for empirical system benchmarks.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Overview Bar */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <MetricCard title="Total Examples" value="200" subtitle="100% Evaluation" icon={Database} iconColor="text-blue-500" />
        <MetricCard title="Training Set" value="0" subtitle="Zero-leak split" icon={Database} iconColor="text-slate-500" />
        <MetricCard title="Evaluation Set" value="200" subtitle="Golden test split" icon={Database} iconColor="text-emerald-500" />
        <MetricCard title="Intents Covered" value="10 Classes" subtitle="Full coverage" icon={Database} iconColor="text-purple-500" />
        <MetricCard title="Human Reviewed" value="200 / 200" subtitle="100% verified" icon={CheckCircle2} iconColor="text-emerald-500" />
      </div>

      {/* Sampling Method Callout Card */}
      <div className="bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/80 rounded-xl p-5 space-y-2">
        <div className="flex items-center gap-2 text-blue-900 dark:text-blue-200 font-bold text-xs">
          <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Sampling & Annotation Methodology</span>
        </div>
        <p className="text-xs text-blue-950 dark:text-blue-200/80 leading-relaxed">
          Examples were stratified-sampled from historical Twitter/X customer support conversations across 10 brand intent taxonomies. Each record was independently labelled by two human annotators for ground truth intent, risk escalation level, and expected grounded reply characteristics.
        </p>
      </div>

      {/* Filters & Table */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-xs space-y-4">
        {/* Search & Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search dataset message or ID..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="w-full pl-9 pr-3 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={selectedIntent}
              onChange={(e) => { setSelectedIntent(e.target.value); setCurrentPage(1); }}
              className="px-2.5 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-800 dark:text-gray-200"
            >
              <option value="all">All Intents</option>
              {INTENTS.map(i => <option key={i.id} value={i.name}>{i.name}</option>)}
            </select>

            <select
              value={selectedDecision}
              onChange={(e) => { setSelectedDecision(e.target.value); setCurrentPage(1); }}
              className="px-2.5 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-800 dark:text-gray-200"
            >
              <option value="all">All Decisions</option>
              <option value="AUTO_HANDLE">Auto-handled</option>
              <option value="ESCALATE">Escalated</option>
            </select>

            <select
              value={correctnessFilter}
              onChange={(e) => { setCorrectnessFilter(e.target.value); setCurrentPage(1); }}
              className="px-2.5 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-800 dark:text-gray-200"
            >
              <option value="all">All Predictions</option>
              <option value="correct">Correct Only (✓)</option>
              <option value="incorrect">Errors Only (✗)</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700 dark:text-gray-300">
            <thead className="bg-gray-50 dark:bg-gray-800/80 text-gray-500 dark:text-gray-400 uppercase tracking-wider text-[10px] font-semibold border-y border-gray-200 dark:border-gray-800">
              <tr>
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Customer Message</th>
                <th className="py-3 px-4">Intent</th>
                <th className="py-3 px-4">Expected Decision</th>
                <th className="py-3 px-4">Human Label</th>
                <th className="py-3 px-4">AI Prediction</th>
                <th className="py-3 px-4 text-center">Correct?</th>
                <th className="py-3 px-4 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60 font-medium">
              {paginated.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/80 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-gray-900 dark:text-white">{item.id}</td>
                  <td className="py-3.5 px-4 max-w-xs truncate text-gray-900 dark:text-gray-100">"{item.customerMessage}"</td>
                  <td className="py-3.5 px-4"><IntentBadge intent={item.intent} size="sm" /></td>
                  <td className="py-3.5 px-4"><DecisionBadge decision={item.expectedDecision} size="sm" /></td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-gray-600 dark:text-gray-400">{item.humanLabel}</td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-gray-900 dark:text-white font-semibold">{item.aiPrediction}</td>
                  <td className="py-3.5 px-4 text-center">
                    {item.isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>✓</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 font-bold">
                        <XCircle className="w-4 h-4" />
                        <span>✗</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setActiveModalItem(item)}
                      className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500">
          <span>Showing {Math.min(filtered.length, (currentPage - 1) * itemsPerPage + 1)} - {Math.min(filtered.length, currentPage * itemsPerPage)} of {filtered.length} examples</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-semibold text-gray-900 dark:text-white">{currentPage} / {totalPages || 1}</span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage >= totalPages}
              className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 max-w-lg w-full space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-sm text-blue-600 dark:text-blue-400">{activeModalItem.id}</span>
                <span className="text-xs font-semibold text-gray-500">Golden Example Detail</span>
              </div>
              <button
                onClick={() => setActiveModalItem(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">Customer Message</span>
                <p className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-900 dark:text-white font-medium mt-1">
                  "{activeModalItem.customerMessage}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">Human Label</span>
                  <p className="font-semibold text-gray-900 dark:text-white mt-0.5">{activeModalItem.humanLabel}</p>
                </div>
                <div>
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">AI Prediction</span>
                  <p className="font-semibold text-blue-600 dark:text-blue-400 mt-0.5">{activeModalItem.aiPrediction}</p>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">Expected Response Characteristics</span>
                <p className="p-2.5 bg-blue-50/50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 rounded-lg mt-1">
                  {activeModalItem.expectedCharacteristics}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
