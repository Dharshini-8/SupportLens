import { 
  Conversation, 
  EvaluationMetrics, 
  GoldenExample, 
  FailureMode, 
  BaselineModel, 
  DecisionLogItem, 
  SystemSettings,
  AnalysisResponse,
  RiskLevel,
  DecisionType
} from '../types';

import { 
  CONVERSATIONS, 
  GOLDEN_DATASET, 
  FAILURE_MODES, 
  BASELINE_MODELS, 
  DECISION_LOG, 
  EVALUATION_METRICS,
  INITIAL_SETTINGS,
  INTENTS
} from '../data/mockData';

let currentSettings: SystemSettings = { ...INITIAL_SETTINGS };
let mockConversationsStore: Conversation[] = [...CONVERSATIONS];

export const ApiService = {
  getSettings(): SystemSettings {
    return { ...currentSettings };
  },

  updateSettings(newSettings: Partial<SystemSettings>): SystemSettings {
    currentSettings = { ...currentSettings, ...newSettings };
    return { ...currentSettings };
  },

  async getConversations(searchQuery?: string, intentFilter?: string, decisionFilter?: string): Promise<Conversation[]> {
    if (currentSettings.useRealBackend) {
      try {
        const res = await fetch(`${currentSettings.apiBaseUrl}/conversations`);
        if (res.ok) {
          return await res.json();
        }
      } catch (err) {
        console.warn('Real backend fetch failed, falling back to mock engine', err);
      }
    }

    let list = [...mockConversationsStore];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(c => 
        c.customerName.toLowerCase().includes(q) || 
        c.customerHandle.toLowerCase().includes(q) || 
        c.message.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q)
      );
    }

    if (intentFilter && intentFilter !== 'all') {
      list = list.filter(c => c.intent.toLowerCase() === intentFilter.toLowerCase());
    }

    if (decisionFilter && decisionFilter !== 'all') {
      list = list.filter(c => c.decision === decisionFilter);
    }

    return list;
  },

  async updateConversationStatus(id: string, status: Conversation['status'], newReply?: string): Promise<Conversation> {
    const idx = mockConversationsStore.findIndex(c => c.id === id);
    if (idx !== -1) {
      mockConversationsStore[idx] = {
        ...mockConversationsStore[idx],
        status,
        ...(newReply ? { generatedReply: newReply } : {})
      };
      return mockConversationsStore[idx];
    }
    throw new Error('Conversation not found');
  },

  async analyzeMessage(message: string, brandId: string): Promise<AnalysisResponse> {
    const startTime = performance.now();

    if (currentSettings.useRealBackend) {
      try {
        const res = await fetch(`${currentSettings.apiBaseUrl}/analyze`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, brandId })
        });
        if (res.ok) {
          const data = await res.json();
          return data;
        }
      } catch (err) {
        console.warn('Backend analyze API unavailable, using local intelligence engine', err);
      }
    }

    // Deterministic Mock Analysis Engine
    const lower = message.toLowerCase();
    
    let detectedIntent = 'General Question';
    let confidence = 0.88;
    let riskLevel: RiskLevel = 'LOW';
    let decision: DecisionType = 'AUTO_HANDLE';
    let decisionReason = 'Matches historical support guidelines with low financial/security risk.';
    let generatedReply = '';

    if (lower.includes('refund') || lower.includes('money back') || lower.includes('return credit')) {
      detectedIntent = 'Refund Status';
      confidence = 0.94;
      riskLevel = 'LOW';
      decision = 'AUTO_HANDLE';
      decisionReason = 'Matches previously resolved refund-status conversations with confirmed timeline guidelines.';
      generatedReply = `Hi there! I am sorry your refund is taking longer than expected. Refunds typically process in 5-7 business days depending on your bank. If it has been over 8 business days, please reply with your order confirmation number so our billing team can trace the merchant transaction.`;
    } else if (lower.includes('twice') || lower.includes('double charge') || lower.includes('charged two')) {
      detectedIntent = 'Duplicate Charge';
      confidence = 0.96;
      riskLevel = 'HIGH';
      decision = 'ESCALATE';
      decisionReason = 'Potential financial dispute requiring human verification of payment logs before processing void/refund.';
      generatedReply = `Hello! We take payment errors very seriously. Multiple charges require manual inspection of our payment gateway logs. I have escalated your ticket to our Billing Ops desk with high priority to void any duplicate authorization hold.`;
    } else if (lower.includes('hacked') || lower.includes('stolen') || lower.includes('unauthorized') || lower.includes('changed my email')) {
      detectedIntent = 'Account Security';
      confidence = 0.98;
      riskLevel = 'CRITICAL';
      decision = 'ESCALATE';
      decisionReason = 'High risk security incident involving credential breach. Mandates human identity verification and account lockdown.';
      generatedReply = `We take account security with paramount seriousness. Because this involves unauthorized account modifications, I have immediately escalated this to our Security Team for emergency account lock and identity verification.`;
    } else if (lower.includes('password') || lower.includes('login') || lower.includes('cant log in') || lower.includes('lockout')) {
      detectedIntent = 'Account Access';
      confidence = 0.92;
      riskLevel = 'MEDIUM';
      decision = 'AUTO_HANDLE';
      decisionReason = 'Standard account recovery flow with automated self-service password reset instructions.';
      generatedReply = `Hi! You can reset your password anytime by clicking "Forgot Password" on our sign-in page. Be sure to check your spam folder for the verification link, which remains active for 15 minutes.`;
    } else if (lower.includes('tracking') || lower.includes('where is my order') || lower.includes('shipped') || lower.includes('delivery')) {
      detectedIntent = 'Order Status';
      confidence = 0.95;
      riskLevel = 'LOW';
      decision = 'AUTO_HANDLE';
      decisionReason = 'High confidence shipment tracking query match.';
      generatedReply = `Hello! Thanks for checking in. You can track your order package in real time using the carrier link sent in your shipping confirmation email. Standard transit time is 3-5 business days.`;
    } else if (lower.includes('declined') || lower.includes('payment failed') || lower.includes('checkout error')) {
      detectedIntent = 'Payment Failure';
      confidence = 0.91;
      riskLevel = 'HIGH';
      decision = 'ESCALATE';
      decisionReason = 'Checkout transaction failure requires payment gateway error code inspection.';
      generatedReply = `Hi! Payment declines usually occur when bank billing Zip codes mismatch (AVS check). We recommend checking your card details or trying an alternative payment method while our team verifies the gateway status.`;
    } else if (lower.includes('cancel') || lower.includes('stop my order')) {
      detectedIntent = 'Cancellation';
      confidence = 0.89;
      riskLevel = 'MEDIUM';
      decision = 'AUTO_HANDLE';
      decisionReason = 'Self-service order cancellation guidance.';
      generatedReply = `Hi! Orders can be cancelled within 30 minutes of placement via your Order History tab. If the order has already moved to warehouse dispatch, you may return it upon arrival for a full refund.`;
    } else {
      detectedIntent = 'General Question';
      confidence = 0.86;
      riskLevel = 'LOW';
      decision = 'AUTO_HANDLE';
      decisionReason = 'Standard policy query answered using verified knowledge base evidence.';
      generatedReply = `Hi! Thank you for contacting customer support. For detailed information regarding our policies, shipping options, or account features, please visit our online Help Center or let us know if you need specific guidance!`;
    }

    // Dynamic Evidence Generation
    const evidence = [
      {
        id: `ev-sim-1`,
        customerMessage: `Historical sample matching: "${message.slice(0, 40)}..."`,
        brandResponse: `Verified historical resolution for ${detectedIntent}.`,
        resolution: `Resolved cleanly in historical dataset with score ${Math.round(confidence * 100)}%.`,
        similarityScore: Math.round((confidence - 0.03) * 100) / 100,
        timestamp: '2026-08-18',
        handle: '@support_archive'
      },
      {
        id: `ev-sim-2`,
        customerMessage: `Similar query regarding ${detectedIntent} resolved last month.`,
        brandResponse: `Standard operating policy followed for ${detectedIntent}.`,
        resolution: `Provided self-service links and verified resolution.`,
        similarityScore: Math.round((confidence - 0.07) * 100) / 100,
        timestamp: '2026-08-28',
        handle: '@support_archive'
      }
    ];

    const endTime = performance.now();

    const newConv: Conversation = {
      id: `conv-test-${Date.now()}`,
      customerName: 'Interactive Sandbox User',
      customerHandle: '@test_user',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      timestamp: 'Just now',
      message,
      conversationHistory: [
        { id: `h-t-1`, sender: 'customer', text: message, timestamp: 'Just now' }
      ],
      intent: detectedIntent,
      confidence,
      decision,
      decisionReason,
      riskLevel,
      generatedReply,
      evidence,
      priority: riskLevel === 'CRITICAL' || riskLevel === 'HIGH' ? 'high' : 'medium',
      status: 'open',
      groundednessScore: 4.7,
      relevanceScore: 4.8,
      helpfulnessScore: 4.6
    };

    // Store in memory list so inbox updates if navigated
    mockConversationsStore.unshift(newConv);

    return {
      conversation: newConv,
      executionTimeMs: Math.round(endTime - startTime + 320)
    };
  },

  async getMetrics(): Promise<EvaluationMetrics> {
    return EVALUATION_METRICS;
  },

  async getGoldenDataset(): Promise<GoldenExample[]> {
    return GOLDEN_DATASET;
  },

  async getFailures(): Promise<FailureMode[]> {
    return FAILURE_MODES;
  },

  async getBaselines(): Promise<BaselineModel[]> {
    return BASELINE_MODELS;
  },

  async getDecisionLog(): Promise<DecisionLogItem[]> {
    return DECISION_LOG;
  }
};
