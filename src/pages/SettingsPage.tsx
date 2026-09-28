import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sliders, ShieldAlert, CheckCircle2, Save, Server, Cpu } from 'lucide-react';
import { SystemSettings } from '../types';

export const SettingsPage: React.FC = () => {
  const { settings, updateSettings, showToast, brands, selectedBrand, setSelectedBrand } = useApp();
  const [localSettings, setLocalSettings] = useState<SystemSettings>({ ...settings });

  const handleSave = () => {
    updateSettings(localSettings);
    showToast('System thresholds & settings saved successfully', 'success');
  };

  const isUnsafe = localSettings.similarityThreshold < 0.75 || localSettings.autoHandlingThreshold > 0.90;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">System Settings & Thresholds</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Tune RAG retrieval top-K, similarity cutoff thresholds, confidence cutoffs, and REST backend connections.
            </p>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs"
        >
          <Save className="w-4 h-4" />
          <span>Save Settings</span>
        </button>
      </div>

      {/* Safety Alert Warning Banner */}
      {isUnsafe && (
        <div className="bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 p-4 rounded-xl flex items-start gap-3 text-xs text-rose-900 dark:text-rose-200">
          <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5 animate-bounce" />
          <div>
            <span className="font-bold uppercase tracking-wider block">Warning: Unsafe Safety Thresholds Selected</span>
            <p className="mt-0.5 leading-relaxed">
              Setting similarity threshold below 0.75 or auto-handling threshold above 0.90 increases the risk of hallucinated replies and false auto-handles on critical support queries.
            </p>
          </div>
        </div>
      )}

      {/* Settings Grid Form */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-xs space-y-6">
        <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-gray-800 pb-3">
          1. Brand & Model Configuration
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Brand Select */}
          <div className="space-y-2">
            <label className="font-semibold text-gray-900 dark:text-white block">Active Brand Workspace</label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full p-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white font-medium"
            >
              {brands.map(b => (
                <option key={b.id} value={b.id}>{b.name} ({b.category})</option>
              ))}
            </select>
          </div>

          {/* Model Select */}
          <div className="space-y-2">
            <label className="font-semibold text-gray-900 dark:text-white block">LLM Response Generation Model</label>
            <select
              value={localSettings.model}
              onChange={(e) => setLocalSettings({ ...localSettings, model: e.target.value })}
              className="w-full p-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white font-medium"
            >
              <option value="gpt-4o-mini">gpt-4o-mini (Fast & Low Cost)</option>
              <option value="gpt-4o">gpt-4o (High Precision)</option>
              <option value="claude-3-5-sonnet">claude-3-5-sonnet (High Tone Grounding)</option>
              <option value="gemini-1.5-pro">gemini-1.5-pro (Long Context Memory)</option>
            </select>
          </div>
        </div>

        <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-gray-800 pb-3 pt-4">
          2. RAG & Safety Threshold Tuning
        </h2>

        <div className="space-y-5 text-xs">
          {/* Retrieval Top-K */}
          <div className="space-y-2">
            <div className="flex justify-between font-semibold">
              <label>Retrieval Top-K Evidence Count</label>
              <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{localSettings.retrievalTopK} historical matches</span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={localSettings.retrievalTopK}
              onChange={(e) => setLocalSettings({ ...localSettings, retrievalTopK: parseInt(e.target.value) })}
              className="w-full accent-blue-600"
            />
            <p className="text-[11px] text-gray-500">Number of historical support tweets retrieved from vector store to prompt the LLM.</p>
          </div>

          {/* Similarity Cutoff */}
          <div className="space-y-2">
            <div className="flex justify-between font-semibold">
              <label>Minimum Similarity Cutoff Threshold</label>
              <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{Math.round(localSettings.similarityThreshold * 100)}% ({localSettings.similarityThreshold})</span>
            </div>
            <input
              type="range"
              min={0.50}
              max={0.95}
              step={0.01}
              value={localSettings.similarityThreshold}
              onChange={(e) => setLocalSettings({ ...localSettings, similarityThreshold: parseFloat(e.target.value) })}
              className="w-full accent-blue-600"
            />
            <p className="text-[11px] text-gray-500">Retrieval similarity threshold required before grounding response on past data.</p>
          </div>

          {/* Auto-handling Threshold */}
          <div className="space-y-2">
            <div className="flex justify-between font-semibold">
              <label>Auto-handling Confidence Threshold</label>
              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{Math.round(localSettings.autoHandlingThreshold * 100)}% ({localSettings.autoHandlingThreshold})</span>
            </div>
            <input
              type="range"
              min={0.50}
              max={0.95}
              step={0.01}
              value={localSettings.autoHandlingThreshold}
              onChange={(e) => setLocalSettings({ ...localSettings, autoHandlingThreshold: parseFloat(e.target.value) })}
              className="w-full accent-emerald-600"
            />
            <p className="text-[11px] text-gray-500">Confidence required to mark a customer thread as AUTO-HANDLED without human review.</p>
          </div>
        </div>

        <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-gray-800 pb-3 pt-4">
          3. REST API Connection Setup
        </h2>

        <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl space-y-3 border border-gray-200/60 dark:border-gray-700/60 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-blue-500" />
              <span className="font-bold text-gray-900 dark:text-white">Connect Live Express / Python REST API</span>
            </div>
            <input
              type="checkbox"
              checked={localSettings.useRealBackend}
              onChange={(e) => setLocalSettings({ ...localSettings, useRealBackend: e.target.checked })}
              className="w-4 h-4 accent-blue-600 cursor-pointer"
            />
          </div>

          {localSettings.useRealBackend && (
            <div className="pt-2 space-y-2">
              <label className="font-semibold text-gray-700 dark:text-gray-300 block">REST API Base URL</label>
              <input
                type="text"
                value={localSettings.apiBaseUrl}
                onChange={(e) => setLocalSettings({ ...localSettings, apiBaseUrl: e.target.value })}
                placeholder="http://localhost:3001/api"
                className="w-full p-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg font-mono text-xs text-gray-900 dark:text-white"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
