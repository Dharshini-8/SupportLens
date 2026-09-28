import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MetricCard } from '../components/common/MetricCard';
import { DecisionBadge } from '../components/common/DecisionBadge';
import { IntentBadge } from '../components/common/IntentBadge';
import { 
  MessageSquare, 
  CheckCircle, 
  Target, 
  Award, 
  Zap, 
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Info
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  CartesianGrid,
  Legend 
} from 'recharts';

export const OverviewPage: React.FC = () => {
  const { currentBrandObj, conversations, setActivePage, setActiveConversation } = useApp();

  const intentDistributionData = [
    { name: 'Order Status', count: 4120, fill: '#3b82f6' },
    { name: 'Refund Status', count: 3420, fill: '#6366f1' },
    { name: 'Account Access', count: 2410, fill: '#8b5cf6' },
    { name: 'Duplicate Charge', count: 1850, fill: '#ec4899' },
    { name: 'Payment Failure', count: 1650, fill: '#f43f5e' },
    { name: 'Cancellation', count: 1420, fill: '#f97316' },
  ];

  const decisionRatioData = [
    { name: 'Auto-Handled', value: 72.4, color: '#10b981' },
    { name: 'Escalated to Human', value: 27.6, color: '#f43f5e' },
  ];

  const performanceOverTimeData = [
    { week: 'Week 1', accuracy: 87.2, groundedness: 3.9, autoRate: 64.0 },
    { week: 'Week 2', accuracy: 89.0, groundedness: 4.1, autoRate: 67.5 },
    { week: 'Week 3', accuracy: 90.4, groundedness: 4.3, autoRate: 70.1 },
    { week: 'Week 4', accuracy: 91.8, groundedness: 4.4, autoRate: 72.4 },
  ];

  const replyQualityData = [
    { metric: 'Groundedness', score: 4.4, fullMark: 5 },
    { metric: 'Relevance', score: 4.5, fullMark: 5 },
    { metric: 'Helpfulness', score: 4.3, fullMark: 5 },
    { metric: 'Brand Tone', score: 4.6, fullMark: 5 },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">AI Support Agent Overview</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              Selected Brand: {currentBrandObj.name}
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Real-time customer support classification, retrieval-grounded generation & safety evaluation metrics.
          </p>
        </div>
        <button
          onClick={() => setActivePage('headline-critique')}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/60 dark:hover:bg-amber-900/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/80 rounded-lg text-xs font-semibold transition-colors"
        >
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>Critique 91.8% Accuracy</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Top 6 KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <MetricCard
          title="Total Conversations"
          value="12,480"
          change="+12.4%"
          isPositive={true}
          subtitle="Indexed threads"
          icon={MessageSquare}
          iconColor="text-blue-500"
          badge="Sample Data"
          tooltip="Total historical Twitter/X customer support threads indexed in vector memory."
        />
        <MetricCard
          title="Messages Processed"
          value="18,642"
          change="+8.1%"
          isPositive={true}
          subtitle="Total turns"
          icon={CheckCircle}
          iconColor="text-cyan-500"
          badge="Sample Data"
        />
        <MetricCard
          title="Intent Accuracy"
          value="91.8%"
          change="+2.4%"
          isPositive={true}
          subtitle="F1: 90.0%"
          icon={Target}
          iconColor="text-indigo-500"
          badge="Golden Set"
          tooltip="Measured against 200 hand-labelled Golden Evaluation examples."
        />
        <MetricCard
          title="Reply Quality"
          value="4.3 / 5"
          change="+0.3"
          isPositive={true}
          subtitle="Groundedness 4.4"
          icon={Award}
          iconColor="text-purple-500"
          badge="LLM Judge"
          tooltip="Scored by LLM-as-judge rubric across Groundedness, Relevance, and Helpfulness."
        />
        <MetricCard
          title="Auto-Handling Rate"
          value="72.4%"
          change="+5.1%"
          isPositive={true}
          subtitle="9,035 messages"
          icon={Zap}
          iconColor="text-emerald-500"
          badge="Auto-pilot"
        />
        <MetricCard
          title="Escalation Rate"
          value="27.6%"
          change="-5.1%"
          isPositive={true}
          subtitle="3,445 to human"
          icon={AlertTriangle}
          iconColor="text-rose-500"
          badge="Safety Guard"
        />
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Intent Distribution */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-xs">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center justify-between mb-4">
            <span>Intent Distribution</span>
            <span className="text-xs text-gray-500 font-normal">Top intents by volume</span>
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={intentDistributionData} layout="vertical" margin={{ left: 10, right: 10, top: 0, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#64748b' }} width={100} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '12px', borderRadius: '8px' }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {intentDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Auto-handled vs Escalated */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center justify-between mb-2">
            <span>Decision Allocation</span>
            <span className="text-xs text-gray-500 font-normal">Auto-handled vs Escalated</span>
          </h2>
          <div className="h-56 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={decisionRatioData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {decisionRatioData.map((entry, index) => (
                    <Cell key={`cell-pie-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(val: any) => [`${val}%`, 'Ratio']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '12px', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">72.4%</span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">Auto-Handled</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-emerald-500" />
              <div className="text-xs">
                <p className="font-semibold text-gray-900 dark:text-white">72.4%</p>
                <p className="text-[10px] text-gray-500">Auto-Handled</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-rose-500" />
              <div className="text-xs">
                <p className="font-semibold text-gray-900 dark:text-white">27.6%</p>
                <p className="text-[10px] text-gray-500">Escalated</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chart 3: Agent Performance Over Time */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-xs">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center justify-between mb-4">
            <span>Agent Performance Over Time</span>
            <span className="text-xs text-gray-500 font-normal">Monthly evolution</span>
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceOverTimeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis domain={[50, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '12px', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="accuracy" name="Accuracy %" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="autoRate" name="Auto Rate %" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Section: Recent Support Decisions */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-gray-900 dark:text-white">Recent Support Decisions</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Live decision log with intent classification, confidence scores, and safety justification reasons.</p>
          </div>
          <button
            onClick={() => setActivePage('inbox')}
            className="flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>View All Inbox</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700 dark:text-gray-300">
            <thead className="bg-gray-50 dark:bg-gray-800/80 text-gray-500 dark:text-gray-400 uppercase tracking-wider text-[10px] font-semibold border-y border-gray-200 dark:border-gray-800">
              <tr>
                <th className="py-3 px-4">Customer Message</th>
                <th className="py-3 px-4">Intent</th>
                <th className="py-3 px-4">AI Decision</th>
                <th className="py-3 px-4">Confidence</th>
                <th className="py-3 px-4">Decision Reason</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
              {conversations.slice(0, 6).map((conv) => (
                <tr 
                  key={conv.id} 
                  className="hover:bg-gray-50/80 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                  onClick={() => {
                    setActiveConversation(conv);
                    setActivePage('inbox');
                  }}
                >
                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="font-medium text-gray-900 dark:text-white truncate">{conv.message}</div>
                    <div className="text-[10px] text-gray-400 font-mono mt-0.5">{conv.customerHandle} • {conv.timestamp}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <IntentBadge intent={conv.intent} />
                  </td>
                  <td className="py-3.5 px-4">
                    <DecisionBadge decision={conv.decision} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-gray-900 dark:text-white">
                    {Math.round(conv.confidence * 100)}%
                  </td>
                  <td className="py-3.5 px-4 max-w-sm text-gray-600 dark:text-gray-400">
                    <p className="line-clamp-2 text-[11px]">{conv.decisionReason}</p>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveConversation(conv);
                        setActivePage('inbox');
                      }}
                      className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded font-medium text-[11px] transition-colors"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
