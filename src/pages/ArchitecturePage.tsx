import React, { useState } from 'react';
import { Network, Cpu, Database, ArrowRight, ArrowDown, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export const ArchitecturePage: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>('node-intent');

  const runtimeNodes = [
    { id: 'node-dataset', title: 'Twitter Support Dataset', category: 'Ingestion', desc: 'Raw Twitter/X customer support conversations ETL pipeline.' },
    { id: 'node-clean', title: 'Data Cleaning & Threading', category: 'Pre-processing', desc: 'Deduplication, bot removal, multi-turn conversation reconstruction.' },
    { id: 'node-brand', title: 'Brand Selection', category: 'Routing', desc: 'Isolates vector embedding workspace & taxonomy per brand.' },
    { id: 'node-taxonomy', title: 'Intent Taxonomy Tagger', category: 'NLP Layer', desc: 'Maps query to 10 brand-specific intent classes.' },
    { id: 'node-retrieval', title: 'Historical Vector Retrieval', category: 'RAG Layer', desc: 'Pinecone / Milvus vector search (Top-K=5, similarity > 0.80).' },
    { id: 'node-llm', title: 'LLM Response Generator', category: 'Synthesis', desc: 'Grounds response on retrieved historical brand tweets.' },
    { id: 'node-risk', title: 'Risk & Escalation Classifier', category: 'Guardrail', desc: 'Evaluates financial/security risk level before auto-handling.' },
    { id: 'node-decision', title: 'AUTO-HANDLE / ESCALATE', category: 'Decision Output', desc: 'Routes to automated customer reply or human support desk.' },
  ];

  const evalNodes = [
    { id: 'eval-golden', title: 'Golden Dataset (200 Set)', category: 'Ground Truth', desc: 'Hand-labelled evaluation benchmark split.' },
    { id: 'eval-pred', title: 'Model Predictions', category: 'Inference', desc: 'Batch inference predictions across golden set.' },
    { id: 'eval-metrics', title: 'Automated Metrics', desc: 'F1 Score (90.0%), Accuracy (91.8%), Precision, Recall.' },
    { id: 'eval-judge', title: 'LLM-as-Judge Rubric', desc: 'Automated Groundedness (4.4) & Relevance (4.5) scoring.' },
    { id: 'eval-human', title: 'Human Agreement Analysis', desc: 'Cohen\'s Kappa (0.84) & 87% exact match correlation.' },
    { id: 'eval-failure', title: 'Failure Analysis Dashboard', desc: 'Identifies top 5 error modes and mitigation fixes.' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
            <Network className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">System Architecture & Data Flow</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              End-to-end pipeline specification covering real-time customer query handling and offline evaluation harnesses.
            </p>
          </div>
        </div>
      </div>

      {/* Core Runtime Diagram */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Cpu className="w-4 h-4 text-blue-500" />
            <span>1. Core Real-Time Runtime Pipeline</span>
          </h2>
          <span className="text-[10px] text-gray-400 font-mono">End-to-End Latency ~420ms</span>
        </div>

        {/* Pipeline Nodes Flow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {runtimeNodes.map((node, index) => (
            <div
              key={node.id}
              onClick={() => setSelectedNode(node.id)}
              className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                selectedNode === node.id
                  ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 text-blue-900 dark:text-blue-200 shadow-md font-semibold'
                  : 'bg-gray-50 dark:bg-gray-800/40 border-gray-200 dark:border-gray-700/60 text-gray-700 dark:text-gray-300 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1 font-mono">
                <span>Step #{index + 1}</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">{node.category}</span>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-xs">{node.title}</h3>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{node.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Evaluation Pipeline Diagram */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>2. Offline Evaluation & Proof Pipeline</span>
          </h2>
          <span className="text-[10px] text-gray-400 font-mono">Golden Benchmark Suite</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {evalNodes.map((node, index) => (
            <div
              key={node.id}
              onClick={() => setSelectedNode(node.id)}
              className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-700/60 bg-gray-50 dark:bg-gray-800/40 text-xs space-y-1 hover:border-emerald-500 transition-all cursor-pointer"
            >
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold font-mono">Eval Node #{index + 1}</div>
              <h3 className="font-bold text-gray-900 dark:text-white">{node.title}</h3>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">{node.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
