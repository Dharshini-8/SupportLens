import React from 'react';
import { FAILURE_MODES } from '../data/mockData';
import { MetricCard } from '../components/common/MetricCard';
import { AlertTriangle, ShieldAlert, Cpu, Wrench, ArrowUpRight, BarChart2 } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

export const FailuresPage: React.FC = () => {
  const failurePieData = FAILURE_MODES.map(f => ({
    name: f.title,
    value: f.frequency,
    color: f.severity === 'Critical' ? '#f43f5e' : f.severity === 'High' ? '#f97316' : f.severity === 'Medium' ? '#f59e0b' : '#3b82f6'
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">Failure Analysis & Error Diagnostics</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Empirical taxonomy of agent mistakes, root cause hypotheses, severity categorization, and engineering remediation plans.
            </p>
          </div>
        </div>
      </div>

      {/* Top Summary & Distribution Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <MetricCard title="Total Failures Recorded" value="125 Cases" subtitle="Out of 18,642 messages" icon={AlertTriangle} iconColor="text-rose-500" badge="Error Log" />
          <MetricCard title="Failure Rate" value="0.67%" subtitle="High reliability" icon={AlertTriangle} iconColor="text-amber-500" />
          <MetricCard title="Critical Hallucinations" value="18 Cases (14.4%)" subtitle="Policy hallucinations" icon={ShieldAlert} iconColor="text-rose-600" />
          <MetricCard title="Remediation Status" value="5 Fixes Planned" subtitle="Sprint roadmap" icon={Wrench} iconColor="text-emerald-500" />
        </div>

        {/* Failure Distribution Pie */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <h2 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-2">
            Failure Mode Distribution
          </h2>
          <div className="h-44 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={failurePieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value">
                  {failurePieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '12px', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top 5 Failure Modes Detailed Cards */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-500" />
          <span>Top 5 Identified Failure Modes</span>
        </h2>

        <div className="space-y-4">
          {FAILURE_MODES.map((fm) => (
            <div key={fm.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-xs space-y-4">
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 dark:border-gray-800 pb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">{fm.title}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    fm.severity === 'Critical' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' :
                    fm.severity === 'High' ? 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300' :
                    'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  }`}>
                    {fm.severity} Severity
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono font-semibold">
                  <span className="text-gray-500">Frequency:</span>
                  <span className="text-rose-600 dark:text-rose-400">{fm.frequency} cases ({fm.percentage}%)</span>
                </div>
              </div>

              {/* Grid: What Happened & Root Cause & Fix */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* Real Example & What Happened */}
                <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl space-y-2 border border-gray-200/60 dark:border-gray-700/60">
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">Example Scenario</span>
                  <p className="font-medium text-gray-900 dark:text-gray-200 italic">"{fm.exampleMessage}"</p>
                  <div className="pt-2">
                    <span className="text-[10px] font-semibold text-rose-500 uppercase tracking-wider block">What Happened</span>
                    <p className="text-gray-700 dark:text-gray-300 mt-0.5">{fm.whatHappened}</p>
                  </div>
                </div>

                {/* Root Cause Hypothesis */}
                <div className="bg-amber-50/50 dark:bg-amber-950/30 p-4 rounded-xl space-y-2 border border-amber-200/50 dark:border-amber-900/40">
                  <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">Root Cause Hypothesis</span>
                  <p className="text-gray-800 dark:text-gray-200 leading-relaxed font-medium">{fm.hypothesis}</p>
                </div>

                {/* Potential Fix */}
                <div className="bg-emerald-50/50 dark:bg-emerald-950/30 p-4 rounded-xl space-y-2 border border-emerald-200/50 dark:border-emerald-900/40">
                  <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">Remediation & Fix Plan</span>
                  <p className="text-gray-800 dark:text-gray-200 leading-relaxed font-medium">{fm.potentialFix}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
