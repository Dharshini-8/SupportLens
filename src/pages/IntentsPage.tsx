import React from 'react';
import { INTENTS, CONFUSED_PAIRS } from '../data/mockData';
import { MetricCard } from '../components/common/MetricCard';
import { IntentBadge } from '../components/common/IntentBadge';
import { ConfusionMatrix } from '../components/analytics/ConfusionMatrix';
import { BarChart3, AlertOctagon, CheckCircle2, HelpCircle, ArrowRight } from 'lucide-react';

export const IntentsPage: React.FC = () => {
  const intentNames = INTENTS.map(i => i.name);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">Intent Analytics & Taxonomy</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Granular multi-class classification performance, precision-recall breakdown, and confusion matrix analysis.
            </p>
          </div>
        </div>
      </div>

      {/* Top 4 Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Defined Intents"
          value="10 Classes"
          subtitle="Taxonomy coverage"
          icon={BarChart3}
          iconColor="text-purple-500"
          badge="Taxonomy v2"
        />
        <MetricCard
          title="Most Common Intent"
          value="Order Status"
          subtitle="4,120 messages (22.1%)"
          icon={CheckCircle2}
          iconColor="text-blue-500"
        />
        <MetricCard
          title="Highest F1 Intent"
          value="Order Status (96.1%)"
          subtitle="Precision 95.9% | Recall 96.3%"
          icon={CheckCircle2}
          iconColor="text-emerald-500"
        />
        <MetricCard
          title="Lowest F1 Intent"
          value="General Question"
          subtitle="84.1% F1 Score"
          icon={AlertOctagon}
          iconColor="text-amber-500"
        />
      </div>

      {/* Intent Performance Table */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
            Intent Classification Performance Metrics
          </h2>
          <span className="text-xs text-gray-500">Evaluated on Golden Dataset (200 items)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700 dark:text-gray-300">
            <thead className="bg-gray-50 dark:bg-gray-800/80 text-gray-500 dark:text-gray-400 uppercase tracking-wider text-[10px] font-semibold border-y border-gray-200 dark:border-gray-800">
              <tr>
                <th className="py-3 px-4">Intent Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Sample Example Queries</th>
                <th className="py-3 px-4">Count</th>
                <th className="py-3 px-4">Accuracy</th>
                <th className="py-3 px-4">Precision</th>
                <th className="py-3 px-4">Recall</th>
                <th className="py-3 px-4">F1 Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
              {INTENTS.map((intent) => (
                <tr key={intent.id} className="hover:bg-gray-50/80 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-gray-900 dark:text-white">
                    <IntentBadge intent={intent.name} />
                  </td>
                  <td className="py-3.5 px-4 text-gray-500 dark:text-gray-400 text-[11px]">{intent.category}</td>
                  <td className="py-3.5 px-4 max-w-xs text-gray-600 dark:text-gray-400">
                    <p className="truncate text-[11px] font-mono">"{intent.examples[0]}"</p>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-gray-900 dark:text-white">{intent.count.toLocaleString()}</td>
                  <td className="py-3.5 px-4 font-mono">{intent.accuracy}%</td>
                  <td className="py-3.5 px-4 font-mono">{intent.precision}%</td>
                  <td className="py-3.5 px-4 font-mono">{intent.recall}%</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">{intent.f1}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confusion Matrix Heatmap Component */}
      <ConfusionMatrix intents={intentNames} />

      {/* Most Confused Intent Pairs Breakdown Section */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <AlertOctagon className="w-4 h-4 text-amber-500" />
          <span>Most Confused Intent Pairs & Root Cause Analysis</span>
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          In-depth error diagnostic detailing why certain intent categories bleed into each other during classification inference.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {CONFUSED_PAIRS.map((pair, idx) => (
            <div key={idx} className="bg-slate-50 dark:bg-gray-800/40 border border-slate-200 dark:border-gray-700/60 rounded-xl p-4 space-y-2.5 text-xs">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-gray-700/60 pb-2">
                <div className="flex items-center gap-1.5 font-bold text-gray-900 dark:text-white">
                  <span className="text-rose-600 dark:text-rose-400">{pair.actualIntent}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-amber-600 dark:text-amber-400">{pair.predictedIntent}</span>
                </div>
                <span className="font-mono text-rose-600 font-bold bg-rose-50 dark:bg-rose-950 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-800">
                  {pair.count} cases ({pair.confusionRate}%)
                </span>
              </div>

              <div>
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">Primary Cause</span>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">{pair.primaryCause}</p>
              </div>

              <div className="bg-blue-50/60 dark:bg-blue-950/40 p-2.5 rounded-lg border border-blue-100 dark:border-blue-900/40 text-[11px] text-blue-900 dark:text-blue-200">
                <span className="font-semibold block mb-0.5 text-blue-700 dark:text-blue-300">Engineering Recommendation:</span>
                {pair.recommendation}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
