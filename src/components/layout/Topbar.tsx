import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Sun, 
  Moon, 
  Menu, 
  ChevronDown, 
  ShieldAlert, 
  Sparkles, 
  X,
  Play
} from 'lucide-react';

export const Topbar: React.FC<{ onOpenMobileMenu: () => void }> = ({ onOpenMobileMenu }) => {
  const { 
    selectedBrand, 
    setSelectedBrand, 
    darkMode, 
    toggleDarkMode, 
    brands, 
    searchQuery, 
    setSearchQuery,
    setActivePage,
    currentBrandObj
  } = useApp();

  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30 flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Brand Selector Dropdown */}
        <div className="relative flex items-center">
          <label htmlFor="brand-select" className="sr-only">Select Brand</label>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700/80 rounded-lg text-xs font-medium text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
            <span className="text-gray-400 dark:text-gray-500 text-[11px] hidden sm:inline">Brand:</span>
            <select
              id="brand-select"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="bg-transparent font-semibold text-xs text-blue-600 dark:text-blue-400 focus:outline-none cursor-pointer pr-1"
            >
              {brands.map(b => (
                <option key={b.id} value={b.id} className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                  {b.name} ({b.category})
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Demo Data Tag */}
        <span className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium bg-amber-50 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
          <ShieldAlert className="w-3 h-3 text-amber-600 dark:text-amber-400" />
          Illustrative Demo Evaluation Data
        </span>
      </div>

      {/* Center Search Bar */}
      <div className="hidden md:flex items-center max-w-md w-full mx-4">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search customer messages, intent tags, ticket IDs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-1.5 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Right Tools */}
      <div className="flex items-center gap-2">
        {/* Quick Sandbox Action Button */}
        <button
          onClick={() => setActivePage('agent')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors shadow-xs"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span className="hidden sm:inline">Test AI Agent</span>
        </button>

        {/* Dark / Light Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>

        {/* User Badge */}
        <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-gray-200 dark:border-gray-800">
          <div className="w-7 h-7 rounded-full bg-slate-800 dark:bg-slate-700 flex items-center justify-center text-white text-xs font-semibold">
            AI
          </div>
          <div className="text-left hidden lg:block">
            <p className="text-xs font-semibold text-gray-900 dark:text-white leading-none">Hiver Evaluator</p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-none mt-1">SDE AI Engineering</p>
          </div>
        </div>
      </div>
    </header>
  );
};
