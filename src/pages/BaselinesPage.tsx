import React from 'react';
import { BASELINE_MODELS } from '../data/mockData';
import { MetricCard } from '../components/common/MetricCard';
import { GitCompare, ShieldAlert, Sparkles, CheckCircle2, Upload } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { useApp } from '../context/AppContext';

export const BaselinesPage: React.FC = () => {
  const { showToast } = useApp();

  const chartData = [
    { metric: 'Intent Accuracy', Baseline1: 54.2, Baseline2: 72.5, SupportLensAI: 91.8 },
    { metric: 'Precision', Baseline1: 48.1, Baseline2: 71.0, SupportLensAI: 90.4 },
    { metric: 'Recall', Baseline1: 54.2, Baseline2: 70.1, SupportLensAI: 89.7 },
    { metric: 'F1 Score', Baseline1: 50.9, Baseline2: 70.5, SupportLensAI: 90.0 },
    { metric: 'Escalation Acc.', Baseline1: 50.0, Baseline2: 78.4, SupportLensAI: 93.1 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
            <GitCompare className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">Model Comparison & Baselines</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Empirical comparison of SupportLens AI against heuristic rule-based and naive baseline classifiers.
            </p>
          </div>
        </div>

        <button
          onClick={() => showToast('Benchmark upload modal opened. Select evaluation run JSON.', 'info')}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload Custom Eval Run JSON</span>
        </button>
      </div>

      {/* Illustrative Data Disclaimer Banner */}
      <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 rounded-xl p-4 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
        <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider block">
            Disclaimer: Illustrative Evaluation Data
          </span>
          <p className="leading-relaxed">
            The benchmark figures below are sample evaluation metrics generated for demonstration purposes based on the hand-labelled 200 Golden Dataset examples. In real production, you can replace these numbers dynamically by connecting a real Python model evaluation harness via our REST API.
          </p>
        </div>
      </div>

      {/* Grouped Bar Chart */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
          Baseline Performance Metrics Comparison (%)
        </h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="metric" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '12px', borderRadius: '8px' }} />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="Baseline1" name="Baseline 1: Majority Class" fill="#94a3b8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Baseline2" name="Baseline 2: Keyword Rules" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              <Bar dataKey="SupportLensAI" name="Proposed: SupportLens AI" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Baseline Comparison Table */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
          Detailed Model Architecture & Evaluation Breakdown
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700 dark:text-gray-300">
            <thead className="bg-gray-50 dark:bg-gray-800/80 text-gray-500 dark:text-gray-400 uppercase tracking-wider text-[10px] font-semibold border-y border-gray-200 dark:border-gray-800">
              <tr>
                <th className="py-3 px-4">Model Architecture</th>
                <th className="py-3 px-4">Intent Accuracy</th>
                <th className="py-3 px-4">Precision</th>
                <th className="py-3 px-4">Recall</th>
                <th className="py-3 px-4">F1 Score</th>
                <th className="py-3 px-4">Reply Quality (1-5)</th>
                <th className="py-3 px-4">Escalation Accuracy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60 font-medium">
              {BASELINE_MODELS.map((bm) => (
                <tr key={bm.id} className={`hover:bg-gray-50/80 dark:hover:bg-gray-800/50 transition-colors ${bm.isProposed ? 'bg-blue-50/40 dark:bg-blue-950/30 font-bold' : ''}`}>
                  <td className="py-4 px-4 max-w-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-900 dark:text-white">{bm.name}</span>
                      {bm.isProposed && (
                        <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded font-semibold">
                          PROPOSED
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-500 font-normal mt-1 leading-relaxed">{bm.description}</p>
                  </td>
                  <td className="py-4 px-4 font-mono font-bold text-gray-900 dark:text-white">{bm.intentAccuracy}%</td>
                  <td className="py-4 px-4 font-mono">{bm.precision}%</td>
                  <td className="py-4 px-4 font-mono">{bm.recall}%</td>
                  <td className="py-4 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">{bm.f1}%</td>
                  <td className="py-4 px-4 font-mono font-bold text-purple-600 dark:text-purple-400">{bm.replyQuality} / 5.0</td>
                  <td className="py-4 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">{bm.escalationAccuracy}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
