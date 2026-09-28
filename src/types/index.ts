/**
 * SupportLens AI Core Type Definitions
 * Designed for Hiver SDE Intern / AI Engineering Evaluation Platform
 */

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type DecisionType = 'AUTO_HANDLE' | 'ESCALATE';
export type ConversationStatus = 'open' | 'approved' | 'escalated' | 'edited' | 'resolved';
export type PriorityLevel = 'low' | 'medium' | 'high' | 'urgent';

export interface Brand {
  id: string;
  name: string;
  category: string;
  indexedMessages: number;
  activeTaxonomyCount: number;
  badgeColor: string;
}

export interface Evidence {
  id: string;
  customerMessage: string;
  brandResponse: string;
  resolution: string;
  similarityScore: number;
  timestamp: string;
  handle: string;
}

export interface HistoryMessage {
  id: string;
  sender: 'customer' | 'brand' | 'agent';
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  customerName: string;
  customerHandle: string;
  avatarUrl?: string;
  timestamp: string;
  message: string;
  conversationHistory: HistoryMessage[];
  intent: string;
  confidence: number; // 0 to 1
  decision: DecisionType;
  decisionReason: string;
  riskLevel: RiskLevel;
  generatedReply: string;
  evidence: Evidence[];
  priority: PriorityLevel;
  status: ConversationStatus;
  groundednessScore?: number;
  relevanceScore?: number;
  helpfulnessScore?: number;
}

export interface IntentStat {
  id: string;
  name: string;
  category: string;
  description: string;
  count: number;
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
  examples: string[];
  riskLevel: RiskLevel;
}

export interface EvaluationMetrics {
  intentAccuracy: number;
  precision: number;
  recall: number;
  f1: number;
  groundedness: number;
  relevance: number;
  helpfulness: number;
  tone: number;
  escalationAccuracy: number;
  humanAgreement: number;
  totalEvaluated: number;
  totalConversations: number;
  messagesProcessed: number;
  autoHandlingRate: number;
  escalationRate: number;
}

export interface GoldenExample {
  id: string;
  customerMessage: string;
  intent: string;
  expectedDecision: DecisionType;
  expectedCharacteristics: string;
  humanLabel: string;
  aiPrediction: string;
  isCorrect: boolean;
  confidence: number;
  similarityToDataset: number;
}

export interface FailureMode {
  id: string;
  title: string;
  frequency: number;
  percentage: number;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  exampleMessage: string;
  whatHappened: string;
  hypothesis: string;
  potentialFix: string;
  category: string;
}

export interface BaselineModel {
  id: string;
  name: string;
  description: string;
  intentAccuracy: number;
  precision: number;
  recall: number;
  f1: number;
  replyQuality: number;
  escalationAccuracy: number;
  isProposed?: boolean;
}

export interface DecisionLogItem {
  id: string;
  decision: string;
  choice: string;
  reason: string;
  tradeoff: string;
  status: 'Implemented' | 'In Review' | 'Planned';
  category: string;
  date: string;
}

export interface ConfusedPair {
  actualIntent: string;
  predictedIntent: string;
  count: number;
  confusionRate: number;
  primaryCause: string;
  recommendation: string;
}

export interface SystemSettings {
  selectedBrand: string;
  model: string;
  temperature: number;
  retrievalTopK: number;
  similarityThreshold: number;
  autoHandlingThreshold: number;
  escalationThreshold: number;
  apiBaseUrl: string;
  useRealBackend: boolean;
}

export interface AnalysisRequest {
  message: string;
  brandId: string;
}

export interface AnalysisResponse {
  conversation: Conversation;
  executionTimeMs: number;
}

export type NavigationPage = 
  | 'overview'
  | 'inbox'
  | 'agent'
  | 'intents'
  | 'evaluation'
  | 'golden-set'
  | 'failures'
  | 'baselines'
  | 'headline-critique'
  | 'decision-log'
  | 'architecture'
  | 'settings';
