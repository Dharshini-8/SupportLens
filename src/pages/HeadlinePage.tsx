import React, { useState } from 'react';
import { HelpCircle, AlertTriangle, ShieldAlert, Target, Award, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { MetricCard } from '../components/common/MetricCard';

export const HeadlinePage: React.FC = () => {
  const [selectedDimension, setSelectedDimension] = useState<'imbalance' | 'risk' | 'grounding' | 'calibration'>('imbalance');

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white border border-slate-800 rounded-xl p-8 shadow-md space-y-4">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" />
          <span>Mandatory Evaluation Critique</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          What Is Misleading About My Headline Number?
        </h1>
        <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed">
          The assignment emphasizes that "the proof is worth more than the system". A single aggregate headline metric like <span className="text-emerald-400 font-mono font-bold">91.8% Intent Accuracy</span> gives an illusion of trust, but conceals critical failure vectors underneath.
        </p>

        {/* Hero Banner Showcase */}
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Headline Aggregate</span>
            <div className="text-3xl font-bold text-emerald-400 mt-1">91.8%</div>
            <p className="text-[11px] text-slate-300 mt-1">Global Intent Accuracy</p>
          </div>

          <div className="bg-slate-800/80 border border-rose-900/80 p-4 rounded-xl">
            <span className="text-[10px] text-rose-400 uppercase font-semibold block">Rare Intent Accuracy</span>
            <div className="text-3xl font-bold text-rose-400 mt-1">76.2%</div>
            <p className="text-[11px] text-slate-300 mt-1">Long-tail support cases</p>
          </div>

          <div className="bg-slate-800/80 border border-amber-900/80 p-4 rounded-xl">
            <span className="text-[10px] text-amber-400 uppercase font-semibold block">False Auto-Handle Risk</span>
            <div className="text-3xl font-bold text-amber-400 mt-1">1.8%</div>
            <p className="text-[11px] text-slate-300 mt-1">High-risk security slips</p>
          </div>

          <div className="bg-slate-800/80 border border-purple-900/80 p-4 rounded-xl">
            <span className="text-[10px] text-purple-400 uppercase font-semibold block">Reply Groundedness</span>
            <div className="text-3xl font-bold text-purple-400 mt-1">4.4 / 5</div>
            <p className="text-[11px] text-slate-300 mt-1">Factual accuracy score</p>
          </div>
        </div>
      </div>

      {/* Interactive 4 Dimensions Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {[
          { id: 'imbalance', title: '1. Class Imbalance', desc: 'Frequent vs Long-Tail Intents' },
          { id: 'risk', title: '2. High-Risk Escalation', desc: 'Cost of False Auto-Handling' },
          { id: 'grounding', title: '3. Groundedness vs Intent', desc: 'Classification ≠ Good Reply' },
          { id: 'calibration', title: '4. Confidence Calibration', desc: 'Overconfidence on Bad Outputs' },
        ].map((dim) => (
          <button
            key={dim.id}
            onClick={() => setSelectedDimension(dim.id as any)}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
              selectedDimension === dim.id
                ? 'bg-blue-600 text-white border-blue-600 shadow-md font-semibold'
                : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white hover:border-blue-300'
            }`}
          >
            <h3 className="text-xs font-bold">{dim.title}</h3>
            <p className={`text-[10px] mt-1 ${selectedDimension === dim.id ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
              {dim.desc}
            </p>
          </button>
        ))}
      </div>

      {/* Interactive Detail Content */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-xs space-y-6">
        {selectedDimension === 'imbalance' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
              <AlertTriangle className="w-5 h-5" />
              <span>Deception #1: Class Imbalance Masking Long-Tail Failures</span>
            </div>
            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
              In customer support datasets, 60%+ of volume consists of easy repetitive intents (like <i>Order Status</i> or <i>Refund Status</i>) where accuracy is ~96.1%. Because these heavy classes dominate the test split, they inflate the aggregate accuracy to <b>91.8%</b>, while masking that rare complex intents (like <i>Technical Issues</i> or <i>Policy Inquiries</i>) fail at a alarming <b>23.8% error rate</b>.
            </p>
            <div className="p-4 bg-slate-50 dark:bg-gray-800/40 rounded-xl border border-gray-200/60 dark:border-gray-700/60 font-mono text-xs space-y-2">
              <div className="flex justify-between">
                <span>Frequent Intent (Order Status - 4,120 msgs):</span>
                <span className="text-emerald-600 font-bold">96.1% Accuracy</span>
              </div>
              <div className="flex justify-between">
                <span>Rare Intent (Technical Issue - 940 msgs):</span>
                <span className="text-rose-600 font-bold">85.4% Accuracy</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-2 font-bold">
                <span>Long-Tail Bottom 20% Accuracy:</span>
                <span className="text-rose-600">76.2% Accuracy</span>
              </div>
            </div>
          </div>
        )}

        {selectedDimension === 'risk' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
              <ShieldAlert className="w-5 h-5" />
              <span>Deception #2: Unequal Cost of Error & High-Risk Security Escalation</span>
            </div>
            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
              Not all errors are created equal. Misclassifying an <i>Order Status</i> inquiry as <i>General Question</i> causes minor user annoyance. But misclassifying an <i>Account Security Breach</i> or <i>Unauthorized Duplicate Charge</i> as auto-handled can result in stolen user credentials or legal liability!
            </p>
            <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-xs space-y-2 text-rose-950 dark:text-rose-200">
              <span className="font-bold block">Why SupportLens AI Implements Hard Safety Guardrails:</span>
              <p>
                Even if the intent classifier is 98% confident on an Account Security query, SupportLens AI forces <b>MANDATORY HUMAN ESCALATION</b> to prevent catastrophic false auto-handles.
              </p>
            </div>
          </div>
        )}

        {selectedDimension === 'grounding' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-sm">
              <Award className="w-5 h-5" />
              <span>Deception #3: Correct Intent Classification Does NOT Guarantee a Factual Reply</span>
            </div>
            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
              Traditional ML benchmarks evaluate intent classification alone. However, an agent can classify the intent as <i>Refund Status</i> with 100% accuracy, yet still hallucinate an incorrect refund timeframe (e.g. telling the customer "Refunds process in 60 days" when actual brand policy is 5-7 days).
            </p>
            <div className="p-4 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 rounded-xl text-xs space-y-2">
              <span className="font-bold text-purple-900 dark:text-purple-200 block">The Solution: Dual Evaluation Architecture</span>
              <p className="text-purple-950 dark:text-purple-300">
                SupportLens AI decouples Intent Classification Evaluation (F1 = 90.0%) from RAG Groundedness Evaluation (Score = 4.4/5.0).
              </p>
            </div>
          </div>
        )}

        {selectedDimension === 'calibration' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
              <Target className="w-5 h-5" />
              <span>Deception #4: Confidence Calibration & Overconfidence Glitches</span>
            </div>
            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
              Neural network softmax probabilities are notoriously overconfident on out-of-distribution inputs. A model outputting <b>94% confidence</b> may actually be wrong 30% of the time on noisy Twitter slang!
            </p>
            <div className="p-4 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl text-xs space-y-2">
              <span className="font-bold text-blue-900 dark:text-blue-200 block">SupportLens AI Calibration Guard:</span>
              <p className="text-blue-950 dark:text-blue-300">
                We calibrate confidence using vector similarity distance from historical brand evidence before making auto-handling decisions.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
