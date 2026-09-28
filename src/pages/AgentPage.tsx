import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ApiService } from '../services/api';
import { Conversation, AnalysisResponse } from '../types';
import { IntentBadge } from '../components/common/IntentBadge';
import { DecisionBadge } from '../components/common/DecisionBadge';
import { ConfidenceBar } from '../components/common/ConfidenceBar';
import { EvidenceCard } from '../components/inbox/EvidenceCard';
import { 
  Bot, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  ShieldAlert, 
  Search, 
  Cpu, 
  CheckCircle2, 
  Clock, 
  Zap, 
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AgentPage: React.FC = () => {
  const { selectedBrand, brands, showToast, setActiveConversation, setActivePage } = useApp();
  const [inputMessage, setInputMessage] = useState('Why was I charged twice for order #8802?');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState<number>(0);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);

  const samplePrompts = [
    "I was charged twice for order #8802 ($149.99)",
    "Someone accessed my account and changed my email to hacker@evil.com",
    "Where is my refund for order #9812? It has been 10 days",
    "How do I cancel my annual subscription auto-renewal before tomorrow?",
    "Web checkout gives error code 500 when paying with Apple Pay on Safari"
  ];

  const handleAnalyze = async () => {
    if (!inputMessage.trim()) return;

    setIsAnalyzing(true);
    setAnalysisResult(null);
    setAnalysisStep(1);

    // Step animation timer simulation
    setTimeout(() => setAnalysisStep(2), 300);
    setTimeout(() => setAnalysisStep(3), 600);
    setTimeout(() => setAnalysisStep(4), 900);

    setTimeout(async () => {
      const result = await ApiService.analyzeMessage(inputMessage, selectedBrand);
      setAnalysisResult(result);
      setIsAnalyzing(false);
      setAnalysisStep(0);
      showToast(`Analysis completed in ${result.executionTimeMs}ms`, 'success');
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">Test AI Support Agent</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Interactive sandbox to evaluate raw customer message classification, vector retrieval, grounded reply synthesis, and safety escalation logic.
            </p>
          </div>
        </div>
      </div>

      {/* Input Playground Box */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <label htmlFor="customer-message-input" className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
            Customer Message Input
          </label>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-400">Quick Test Prompts:</span>
            <div className="flex flex-wrap gap-1.5">
              {samplePrompts.slice(0, 3).map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => setInputMessage(prompt)}
                  className="px-2 py-0.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-[11px] font-medium transition-colors"
                >
                  Prompt #{i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        <textarea
          id="customer-message-input"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Paste customer support tweet or message here..."
          rows={3}
          className="w-full p-4 text-xs bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
        />

        <div className="flex items-center justify-between pt-2">
          <div className="text-xs text-gray-500">
            Brand Target: <span className="font-semibold text-blue-600 dark:text-blue-400">{brands.find(b => b.id === selectedBrand)?.name}</span>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !inputMessage.trim()}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-md transition-all disabled:opacity-50 cursor-pointer"
          >
            {isAnalyzing ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Running Pipeline...</span>
              </>
            ) : (
              <>
                <Cpu className="w-4 h-4" />
                <span>Analyze Message</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Animated Pipeline Stage Indicator */}
      {isAnalyzing && (
        <div className="bg-slate-900 text-white p-6 rounded-xl space-y-4 shadow-lg border border-slate-800">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">AI Inference Pipeline Execution</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <PipelineStage step={1} currentStep={analysisStep} title="1. Intent Classification" desc="BERT / RoBERTa Model" />
            <PipelineStage step={2} currentStep={analysisStep} title="2. Historical Evidence" desc="Pinecone Vector Search" />
            <PipelineStage step={3} currentStep={analysisStep} title="3. Grounded Reply Synthesis" desc="LLM RAG Generation" />
            <PipelineStage step={4} currentStep={analysisStep} title="4. Risk & Safety Guard" desc="Escalation Classifier" />
          </div>
        </div>
      )}

      {/* Analysis Output Result Card */}
      {analysisResult && !isAnalyzing && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Top Summary Bar */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
              <div>
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Pipeline Output Summary</span>
                <div className="flex items-center gap-2 mt-1">
                  <h2 className="text-base font-bold text-gray-900 dark:text-white">Analysis Result</h2>
                  <span className="text-xs font-mono text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                    Latency: {analysisResult.executionTimeMs}ms
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <DecisionBadge decision={analysisResult.conversation.decision} size="lg" />
                <button
                  onClick={() => {
                    setActiveConversation(analysisResult.conversation);
                    setActivePage('inbox');
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-colors"
                >
                  <span>Open in Inbox</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Grid of Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Box 1: Intent */}
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl space-y-2 border border-gray-200/60 dark:border-gray-700/60">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">1. Detected Intent</span>
                <IntentBadge intent={analysisResult.conversation.intent} />
                <div className="pt-2">
                  <ConfidenceBar confidence={analysisResult.conversation.confidence} riskLevel={analysisResult.conversation.riskLevel} />
                </div>
              </div>

              {/* Box 2: Decision & Risk */}
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl space-y-2 border border-gray-200/60 dark:border-gray-700/60">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">2. Safety Risk Level</span>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded ${
                    analysisResult.conversation.riskLevel === 'CRITICAL' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' :
                    analysisResult.conversation.riskLevel === 'HIGH' ? 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300' :
                    'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  }`}>
                    {analysisResult.conversation.riskLevel} RISK
                  </span>
                </div>
                <p className="text-[11px] text-gray-600 dark:text-gray-400 pt-1 leading-relaxed">
                  Reason: "{analysisResult.conversation.decisionReason}"
                </p>
              </div>

              {/* Box 3: Quality Metrics */}
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl space-y-2 border border-gray-200/60 dark:border-gray-700/60">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">3. Grounding Quality</span>
                <div className="text-xs space-y-1.5 font-medium">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Groundedness:</span>
                    <span className="font-bold text-purple-600 dark:text-purple-400">4.8 / 5.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Relevance:</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">4.9 / 5.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Brand Consistency:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">4.7 / 5.0</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Generated Reply Bubble */}
            <div className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/40 dark:to-purple-950/40 border border-blue-200 dark:border-blue-900 p-5 rounded-xl space-y-2">
              <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Generated Draft Reply
              </span>
              <p className="text-xs text-gray-900 dark:text-white font-medium leading-relaxed">
                "{analysisResult.conversation.generatedReply}"
              </p>
            </div>
          </div>

          {/* Historical Evidence Display */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              Historical Vector Evidence Matches ({analysisResult.conversation.evidence.length} Threads)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysisResult.conversation.evidence.map((ev) => (
                <EvidenceCard key={ev.id} evidence={ev} />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const PipelineStage: React.FC<{ step: number; currentStep: number; title: string; desc: string }> = ({
  step,
  currentStep,
  title,
  desc
}) => {
  const isDone = currentStep > step;
  const isCurrent = currentStep === step;

  return (
    <div className={`p-3.5 rounded-lg border text-xs transition-all ${
      isDone ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300' :
      isCurrent ? 'bg-blue-900/60 border-blue-500 text-blue-200 animate-pulse' :
      'bg-slate-950/40 border-slate-800 text-slate-500'
    }`}>
      <div className="flex items-center justify-between mb-1">
        <span className="font-bold">{title}</span>
        {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
      </div>
      <p className="text-[10px] opacity-75 font-mono">{desc}</p>
    </div>
  );
};
