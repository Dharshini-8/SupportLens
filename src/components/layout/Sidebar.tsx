import React from 'react';
import { useApp } from '../../context/AppContext';
import { NavigationPage } from '../../types';
import { 
  LayoutDashboard, 
  Inbox, 
  Bot, 
  BarChart3, 
  ShieldCheck, 
  Database, 
  AlertTriangle, 
  GitCompare, 
  FileText, 
  Network, 
  Sliders, 
  HelpCircle,
  Activity,
  Layers,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface NavItem {
  id: NavigationPage;
  label: string;
  icon: React.ElementType;
  badge?: string;
  isImportant?: boolean;
}

export const Sidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { activePage, setActivePage, currentBrandObj } = useApp();

  const navItems: NavItem[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'inbox', label: 'Support Inbox', icon: Inbox, badge: '30' },
    { id: 'agent', label: 'AI Agent Sandbox', icon: Bot, isImportant: true },
    { id: 'intents', label: 'Intent Analytics', icon: BarChart3 },
    { id: 'evaluation', label: 'Evaluation Harness', icon: ShieldCheck, isImportant: true },
    { id: 'golden-set', label: 'Golden Dataset', icon: Database, badge: '200' },
    { id: 'failures', label: 'Failure Analysis', icon: AlertTriangle, badge: '5' },
    { id: 'baselines', label: 'Model Baselines', icon: GitCompare },
    { id: 'headline-critique', label: 'Headline Metric Critique', icon: HelpCircle, isImportant: true },
    { id: 'decision-log', label: 'Engineering Decision Log', icon: FileText, badge: '12' },
    { id: 'architecture', label: 'System Architecture', icon: Network },
    { id: 'settings', label: 'System Settings', icon: Sliders },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          onClick={onClose} 
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      <aside className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-slate-900 text-slate-100 flex flex-col border-r border-slate-800 transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Brand / Title Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-base tracking-tight text-white flex items-center gap-1.5">
                SupportLens <span className="text-blue-400 font-semibold text-xs px-1.5 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded">AI</span>
              </h1>
              <p className="text-[10px] text-slate-400 truncate max-w-[150px]">Support Intelligence & Eval</p>
            </div>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 mb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Platform Core</div>
          {navItems.slice(0, 3).map(item => (
            <SidebarButton 
              key={item.id} 
              item={item} 
              activePage={activePage} 
              onClick={() => { setActivePage(item.id); onClose(); }} 
            />
          ))}

          <div className="px-3 pt-4 mb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Evaluation & Proof</div>
          {navItems.slice(3, 9).map(item => (
            <SidebarButton 
              key={item.id} 
              item={item} 
              activePage={activePage} 
              onClick={() => { setActivePage(item.id); onClose(); }} 
            />
          ))}

          <div className="px-3 pt-4 mb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">System & Architecture</div>
          {navItems.slice(9).map(item => (
            <SidebarButton 
              key={item.id} 
              item={item} 
              activePage={activePage} 
              onClick={() => { setActivePage(item.id); onClose(); }} 
            />
          ))}
        </nav>

        {/* Footer Status Section */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 text-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-[11px]">Selected Brand</span>
            <span className="font-medium text-blue-400 text-[11px] truncate max-w-[110px]">{currentBrandObj.name}</span>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Dataset Status</span>
            <span className="text-slate-200 font-mono text-[10px]">{currentBrandObj.indexedMessages.toLocaleString()} msgs</span>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Model Status</span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              v2.4-hybrid
            </span>
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
            <span className="flex items-center gap-1">
              <Activity className="w-3 h-3 text-emerald-500" />
              99.9% Uptime
            </span>
            <span className="font-mono">420ms avg</span>
          </div>
        </div>
      </aside>
    </>
  );
};

const SidebarButton: React.FC<{
  item: NavItem;
  activePage: NavigationPage;
  onClick: () => void;
}> = ({ item, activePage, onClick }) => {
  const isActive = activePage === item.id;
  const Icon = item.icon;

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
        isActive 
          ? 'bg-blue-600 text-white shadow-sm font-semibold' 
          : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
      }`}
    >
      <div className="flex items-center gap-2.5 truncate">
        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : item.isImportant ? 'text-blue-400' : 'text-slate-400'}`} />
        <span className="truncate">{item.label}</span>
      </div>
      <div className="flex items-center gap-1">
        {item.badge && (
          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
            isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}>
            {item.badge}
          </span>
        )}
      </div>
    </button>
  );
};
