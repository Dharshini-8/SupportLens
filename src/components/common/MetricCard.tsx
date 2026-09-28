import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown, HelpCircle } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  subtitle?: string;
  icon?: LucideIcon;
  iconColor?: string;
  badge?: string;
  badgeType?: 'info' | 'warning' | 'success' | 'demo';
  tooltip?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  isPositive,
  subtitle,
  icon: Icon,
  iconColor = 'text-blue-500',
  badge,
  badgeType = 'demo',
  tooltip
}) => {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-xs hover:border-gray-300 dark:hover:border-gray-700 transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{title}</span>
          {tooltip && (
            <div className="group relative cursor-help">
              <HelpCircle className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
              <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 hidden group-hover:block w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg z-50 pointer-events-none">
                {tooltip}
              </div>
            </div>
          )}
        </div>
        {Icon && (
          <div className={`p-2 rounded-lg bg-gray-50 dark:bg-gray-800 ${iconColor}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <div className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{value}</div>
        {change && (
          <div className={`flex items-center text-xs font-semibold ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
            {isPositive ? <TrendingUp className="w-3.5 h-3.5 mr-1" /> : <TrendingDown className="w-3.5 h-3.5 mr-1" />}
            {change}
          </div>
        )}
      </div>

      <div className="mt-2 flex items-center justify-between">
        {subtitle && <span className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</span>}
        {badge && (
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${
            badgeType === 'demo' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/50' :
            badgeType === 'success' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' :
            badgeType === 'warning' ? 'bg-orange-100 text-orange-800 dark:bg-orange-950/60 dark:text-orange-300' :
            'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
          }`}>
            {badge}
          </span>
        )}
      </div>
    </div>
  );
};
