import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EVALUATION_METRICS } from '../data/mockData';
import { MetricCard } from '../components/common/MetricCard';
import { 
  ShieldCheck, 
  Target, 
  Award, 
  AlertTriangle, 
  UserCheck, 
  BarChart2, 
  CheckCircle2, 
  TrendingUp, 
  Sparkles 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ScatterChart, 
  Scatter, 
  ZAxis, 
  CartesianGrid 
} from 'recharts';

export const EvaluationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'classification' | 'reply-quality' | 'escalation' | 'llm-judge' | 'human-agreement'>('classification');

  const replyScoresData = [
    { metric: 'Groundedness', score: 4.4, target: 4.5 },
    { metric: 'Relevance', score: 4.5, target: 4.5 },
    { metric: 'Helpfulness', score: 4.3, target: 4.5 },
    { metric: 'Brand Tone', score: 4.6, target: 4.5 },
    { metric: 'Safety Guard', score: 4.9, target: 4.8 },
  ];

  const llmvsHumanScatterData = Array.from({ length: 25 }, (_, i) => {
    const humanScore = 3.5 + Math.round((Math.sin(i) * 0.7 + 0.8) * 10) / 10;
    const llmScore = Math.min(5, Math.max(1, humanScore + (i % 3 === 0 ? 0.2 : i % 4 === 0 ? -0.3 : 0.1)));
    return {
      id: `sample-${i + 1}`,
      humanScore: Math.round(humanScore * 10) / 10,
      llmScore: Math.round(llmScore * 10) / 10,
    };
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">Agent Evaluation Harness</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Automated evaluation framework combining classification metrics, RAG groundedness, and LLM-as-judge rubrics.
            </p>
          </div>
        </div>
      </div>

      {/* Top 7 Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        <MetricCard title="Intent Accuracy" value="91.8%" subtitle="F1: 90.0%" icon={Target} iconColor="text-blue-500" badge="Eval" />
        <MetricCard title="Precision" value="90.4%" subtitle="Multi-class" icon={Target} iconColor="text-indigo-500" />
        <MetricCard title="Recall" value="89.7%" subtitle="Coverage" icon={Target} iconColor="text-purple-500" />
        <MetricCard title="F1 Score" value="90.0%" subtitle="Harmonic mean" icon={Target} iconColor="text-cyan-500" />
        <MetricCard title="Groundedness" value="4.4 / 5" subtitle="RAG factual" icon={Award} iconColor="text-emerald-500" />
        <MetricCard title="Relevance" value="4.5 / 5" subtitle="Query fit" icon={Award} iconColor="text-purple-500" />
        <MetricCard title="Escalation Acc." value="93.1%" subtitle="Safety guard" icon={AlertTriangle} iconColor="text-rose-500" />
      </div>

      {/* Tabs Bar */}
      <div className="border-b border-gray-200 dark:border-gray-800 flex items-center gap-2 overflow-x-auto text-xs font-semibold">
        {[
          { id: 'classification', label: 'Classification Metrics' },
          { id: 'reply-quality', label: 'Reply Quality Rubric' },
          { id: 'escalation', label: 'Escalation Safety' },
          { id: 'llm-judge', label: 'LLM-as-Judge' },
          { id: 'human-agreement', label: 'Human Agreement' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-3 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 font-bold'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content 1: Classification */}
      {activeTab === 'classification' && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
            Classification Performance Summary
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Multi-class evaluation on 200 Golden Dataset examples across 10 brand support intents.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-gray-800/40 rounded-xl border border-gray-200/60 dark:border-gray-700/60 space-y-2">
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Micro F1 Score</span>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">90.8%</div>
              <p className="text-[11px] text-gray-500">Globally aggregated metric giving equal weight to every message instance.</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-gray-800/40 rounded-xl border border-gray-200/60 dark:border-gray-700/60 space-y-2">
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Macro F1 Score</span>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">90.0%</div>
              <p className="text-[11px] text-gray-500">Unweighted mean per intent class, preventing rare intent penalties from hiding.</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-gray-800/40 rounded-xl border border-gray-200/60 dark:border-gray-700/60 space-y-2">
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Top-2 Accuracy</span>
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">96.5%</div>
              <p className="text-[11px] text-gray-500">Percentage where correct intent was ranked within top 2 predicted probabilities.</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 2: Reply Quality */}
      {activeTab === 'reply-quality' && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
            RAG Reply Quality Rubric Breakdown (out of 5.0)
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={replyScoresData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="metric" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis domain={[0, 5]} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '12px', borderRadius: '8px' }} />
                <Bar dataKey="score" name="Achieved Score" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" name="Benchmark Target" fill="#94a3b8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Tab Content 3: Escalation */}
      {activeTab === 'escalation' && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
            Risk & Escalation Safety Evaluation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl space-y-2">
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">Escalation Precision: 94.2%</span>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                When the system decides to escalate to a human agent, 94.2% of cases genuinely required human intervention (e.g. account security breaches or financial holds).
              </p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl space-y-2">
              <span className="text-xs font-bold text-blue-800 dark:text-blue-300">False Auto-Handle Rate: 1.8%</span>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Crucial safety metric: Only 1.8% of high-risk messages were mistakenly auto-handled. Enforcing strict risk guardrails caps safety risks.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 4: LLM Judge */}
      {activeTab === 'llm-judge' && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              LLM-as-Judge vs Human Review Correlation (87% Agreement)
            </h2>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">Pearson r = 0.89</span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis type="number" dataKey="humanScore" name="Human Score" domain={[1, 5]} label={{ value: 'Human Score (1-5)', position: 'bottom', offset: 0, fill: '#64748b', fontSize: 11 }} />
                <YAxis type="number" dataKey="llmScore" name="LLM Judge Score" domain={[1, 5]} label={{ value: 'LLM Judge Score', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 11 }} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '12px', borderRadius: '8px' }} />
                <Scatter name="Evaluated Replies" data={llmvsHumanScatterData} fill="#8b5cf6" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Tab Content 5: Human Agreement */}
      {activeTab === 'human-agreement' && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
            Inter-Annotator Agreement & Calibration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-800">
              <span className="text-[10px] font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider block">Cohen's Kappa (κ)</span>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">0.84</div>
              <p className="text-[11px] text-gray-500 mt-1">Almost perfect agreement between domain expert reviewers.</p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800">
              <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">Exact Match Agreement</span>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">87.0%</div>
              <p className="text-[11px] text-gray-500 mt-1">Full consensus on exact intent & decision classification.</p>
            </div>
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800">
              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Human-in-the-loop Acceptance</span>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">92.4%</div>
              <p className="text-[11px] text-gray-500 mt-1">Percentage of AI drafts accepted without manual edits.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
