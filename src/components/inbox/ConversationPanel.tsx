import React, { useState } from 'react';
import { Conversation } from '../../types';
import { useApp } from '../../context/AppContext';
import { IntentBadge } from '../common/IntentBadge';
import { DecisionBadge } from '../common/DecisionBadge';
import { ConfidenceBar } from '../common/ConfidenceBar';
import { StatusBadge } from '../common/StatusBadge';
import { EvidenceCard } from './EvidenceCard';
import { 
  CheckCircle, 
  Edit3, 
  RotateCw, 
  AlertTriangle, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  ShieldAlert, 
  History, 
  User, 
  MessageSquare,
  Save,
  X
} from 'lucide-react';

export const ConversationPanel: React.FC<{ conversation: Conversation }> = ({ conversation }) => {
  const { updateConversationStatus, showToast } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editedReply, setEditedReply] = useState(conversation.generatedReply);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const isHighRisk = conversation.riskLevel === 'CRITICAL' || conversation.riskLevel === 'HIGH';

  const handleApprove = async () => {
    await updateConversationStatus(conversation.id, 'approved');
  };

  const handleEscalate = async () => {
    await updateConversationStatus(conversation.id, 'escalated');
  };

  const handleSaveEdit = async () => {
    await updateConversationStatus(conversation.id, 'edited', editedReply);
    setIsEditing(false);
  };

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setEditedReply(`[Regenerated] ${conversation.generatedReply} (Updated with RAG similarity alignment score 96%).`);
      setIsRegenerating(false);
      showToast('AI Draft reply regenerated with updated RAG grounding context', 'info');
    }, 800);
  };

  const handleSend = async () => {
    await updateConversationStatus(conversation.id, 'resolved');
    showToast(`Reply sent successfully to ${conversation.customerHandle}!`, 'success');
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 overflow-y-auto">
      {/* Detail Header */}
      <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/40">
        <div className="flex items-center gap-3">
          <img
            src={conversation.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
            alt={conversation.customerName}
            className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-700"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-gray-900 dark:text-white">{conversation.customerName}</h2>
              <span className="text-xs text-gray-500 font-mono">{conversation.customerHandle}</span>
            </div>
            <p className="text-[11px] text-gray-400 mt-0.5">Ticket ID: <span className="font-mono text-gray-700 dark:text-gray-300 font-semibold">{conversation.id}</span> • {conversation.timestamp}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <StatusBadge status={conversation.status} />
        </div>
      </div>

      <div className="p-5 space-y-6 flex-1">
        {/* Customer Thread History */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-blue-500" />
            <span>Conversation Thread</span>
          </h3>

          <div className="space-y-2.5">
            {conversation.conversationHistory.map((msg) => (
              <div
                key={msg.id}
                className={`p-3.5 rounded-xl text-xs max-w-xl ${
                  msg.sender === 'customer'
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 mr-auto border border-gray-200/80 dark:border-gray-700/80'
                    : 'bg-blue-600 text-white ml-auto shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] opacity-75 mb-1 font-mono">
                  <span>{msg.sender === 'customer' ? conversation.customerHandle : '@brand_support'}</span>
                  <span>{msg.timestamp}</span>
                </div>
                <p className="leading-relaxed font-medium">{msg.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Analysis & Intent Card */}
        <div className="bg-slate-50 dark:bg-gray-800/40 border border-slate-200 dark:border-gray-700/60 rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-gray-700/60">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">AI Classification Analysis</span>
            </div>
            {/* Safety Indicator Badge */}
            <div className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md border ${
              isHighRisk 
                ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800'
            }`}>
              {isHighRisk ? <ShieldAlert className="w-4 h-4 text-rose-600" /> : <ShieldCheck className="w-4 h-4 text-emerald-600" />}
              <span>{isHighRisk ? 'HUMAN REVIEW RECOMMENDED' : 'HIGH CONFIDENCE GROUNDING'}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 block mb-1">Detected Intent</span>
              <IntentBadge intent={conversation.intent} />
            </div>
            <div>
              <ConfidenceBar confidence={conversation.confidence} riskLevel={conversation.riskLevel} />
            </div>
          </div>

          {/* Decision & Reason */}
          <div className="pt-2 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400">AI Decision:</span>
              <DecisionBadge decision={conversation.decision} />
            </div>
            <div className="bg-white dark:bg-gray-900 p-3 rounded-lg border border-gray-200 dark:border-gray-800 text-xs">
              <span className="font-semibold text-gray-900 dark:text-white block mb-0.5">Decision Reason:</span>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{conversation.decisionReason}</p>
            </div>
          </div>
        </div>

        {/* AI Generated Reply Box */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span>AI Grounded Draft Response</span>
            </h3>
            {conversation.groundednessScore && (
              <span className="text-[11px] font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950 px-2 py-0.5 rounded border border-purple-200 dark:border-purple-800">
                Groundedness Score: {conversation.groundednessScore} / 5.0
              </span>
            )}
          </div>

          <div className="relative bg-gradient-to-b from-blue-50/40 to-indigo-50/20 dark:from-blue-950/30 dark:to-gray-900 border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-4 shadow-xs">
            {isEditing ? (
              <div className="space-y-3">
                <textarea
                  value={editedReply}
                  onChange={(e) => setEditedReply(e.target.value)}
                  rows={4}
                  className="w-full p-3 text-xs bg-white dark:bg-gray-900 border border-blue-400 dark:border-blue-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Save Edit
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-gray-900 dark:text-gray-100 font-medium leading-relaxed">
                "{conversation.generatedReply}"
              </p>
            )}

            {/* Action Buttons Toolbar */}
            {!isEditing && (
              <div className="mt-4 pt-3 border-t border-blue-200/60 dark:border-blue-900/40 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleApprove}
                    disabled={conversation.status === 'approved'}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      conversation.status === 'approved'
                        ? 'bg-emerald-600 text-white cursor-default'
                        : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800'
                    }`}
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{conversation.status === 'approved' ? 'Approved' : 'Approve Reply'}</span>
                  </button>

                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 dark:border-gray-700 rounded-lg text-xs font-semibold transition-all"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-blue-500" />
                    <span>Edit Reply</span>
                  </button>

                  <button
                    onClick={handleRegenerate}
                    disabled={isRegenerating}
                    className="flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 dark:border-gray-700 rounded-lg text-xs font-semibold transition-all"
                  >
                    <RotateCw className={`w-3.5 h-3.5 text-purple-500 ${isRegenerating ? 'animate-spin' : ''}`} />
                    <span>Regenerate</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleEscalate}
                    className="flex items-center gap-1 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800 rounded-lg text-xs font-semibold transition-all"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Escalate</span>
                  </button>

                  <button
                    onClick={handleSend}
                    className="flex items-center gap-1 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5 fill-current" />
                    <span>Send Reply</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Historical Grounding Evidence Section */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <History className="w-4 h-4 text-emerald-500" />
              <span>Supporting Historical Evidence ({conversation.evidence.length} retrieved matches)</span>
            </h3>
            <span className="text-[10px] text-gray-400 font-mono">Vector Cosine Similarity &gt; 0.80</span>
          </div>

          <div className="space-y-3">
            {conversation.evidence.map((ev) => (
              <EvidenceCard key={ev.id} evidence={ev} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
