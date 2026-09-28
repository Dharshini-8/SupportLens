import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ConversationCard } from '../components/inbox/ConversationCard';
import { ConversationPanel } from '../components/inbox/ConversationPanel';
import { Search, Filter, RefreshCw, Inbox, ArrowLeft } from 'lucide-react';
import { INTENTS } from '../data/mockData';

export const InboxPage: React.FC = () => {
  const { 
    conversations, 
    activeConversation, 
    setActiveConversation, 
    searchQuery, 
    setSearchQuery,
    selectedBrand
  } = useApp();

  const [intentFilter, setIntentFilter] = useState('all');
  const [decisionFilter, setDecisionFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);

  const filteredConversations = conversations.filter(c => {
    if (intentFilter !== 'all' && c.intent.toLowerCase() !== intentFilter.toLowerCase()) return false;
    if (decisionFilter !== 'all' && c.decision !== decisionFilter) return false;
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        c.customerName.toLowerCase().includes(q) ||
        c.customerHandle.toLowerCase().includes(q) ||
        c.message.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="h-[calc(100vh-7rem)] flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-xs">
      {/* Top Filter Bar */}
      <div className="p-3.5 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Inbox className="w-5 h-5 text-blue-500" />
          <h1 className="text-sm font-bold text-gray-900 dark:text-white">Support Inbox</h1>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
            {filteredConversations.length} Threads
          </span>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          {/* Intent Filter */}
          <select
            value={intentFilter}
            onChange={(e) => setIntentFilter(e.target.value)}
            className="px-2.5 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-800 dark:text-gray-200 focus:outline-none"
          >
            <option value="all">All Intents</option>
            {INTENTS.map(i => (
              <option key={i.id} value={i.name}>{i.name}</option>
            ))}
          </select>

          {/* Decision Filter */}
          <select
            value={decisionFilter}
            onChange={(e) => setDecisionFilter(e.target.value)}
            className="px-2.5 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-800 dark:text-gray-200 focus:outline-none"
          >
            <option value="all">All Decisions</option>
            <option value="AUTO_HANDLE">Auto-handled</option>
            <option value="ESCALATE">Escalated</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-800 dark:text-gray-200 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="open">Pending Review</option>
            <option value="approved">Approved</option>
            <option value="escalated">Escalated</option>
            <option value="edited">Edited</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Main Split Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Conversation List Panel */}
        <div className={`w-full lg:w-96 flex-col border-r border-gray-200 dark:border-gray-800 overflow-y-auto ${mobileDetailOpen ? 'hidden lg:flex' : 'flex'}`}>
          {filteredConversations.length === 0 ? (
            <div className="p-8 text-center text-gray-400 space-y-2 my-auto">
              <Filter className="w-8 h-8 mx-auto opacity-50 text-gray-400" />
              <p className="text-xs font-semibold">No matching support threads found</p>
              <p className="text-[11px] text-gray-500">Try adjusting your filters or search query.</p>
            </div>
          ) : (
            filteredConversations.map(conv => (
              <ConversationCard
                key={conv.id}
                conversation={conv}
                isSelected={activeConversation?.id === conv.id}
                onSelect={() => {
                  setActiveConversation(conv);
                  setMobileDetailOpen(true);
                }}
              />
            ))
          )}
        </div>

        {/* Right Conversation Panel */}
        <div className={`flex-1 flex-col ${mobileDetailOpen ? 'flex' : 'hidden lg:flex'}`}>
          {mobileDetailOpen && (
            <div className="p-2 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 lg:hidden">
              <button
                onClick={() => setMobileDetailOpen(false)}
                className="flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Inbox List</span>
              </button>
            </div>
          )}

          {activeConversation ? (
            <ConversationPanel conversation={activeConversation} />
          ) : (
            <div className="flex-1 flex items-center justify-center p-8 text-center text-gray-400">
              <p className="text-xs font-medium">Select a conversation from the left inbox list to inspect details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
