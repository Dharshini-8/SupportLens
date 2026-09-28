import { 
  Brand, 
  Conversation, 
  EvaluationMetrics, 
  GoldenExample, 
  FailureMode, 
  BaselineModel, 
  DecisionLogItem, 
  IntentStat, 
  ConfusedPair,
  SystemSettings 
} from '../types';

export const BRANDS: Brand[] = [
  { id: 'demo-brand', name: 'Demo Brand', category: 'E-commerce & Retail', indexedMessages: 18642, activeTaxonomyCount: 10, badgeColor: 'bg-blue-500/10 text-blue-600 border-blue-200 dark:text-blue-400 dark:border-blue-800' },
  { id: 'apple-support', name: 'Apple Support', category: 'Consumer Electronics', indexedMessages: 42190, activeTaxonomyCount: 12, badgeColor: 'bg-slate-500/10 text-slate-700 border-slate-200 dark:text-slate-300 dark:border-slate-700' },
  { id: 'nike-service', name: 'Nike Service', category: 'Apparel & Footwear', indexedMessages: 15400, activeTaxonomyCount: 8, badgeColor: 'bg-orange-500/10 text-orange-600 border-orange-200 dark:text-orange-400 dark:border-orange-800' },
  { id: 'uber-help', name: 'Uber Help', category: 'Transportation & Mobility', indexedMessages: 64200, activeTaxonomyCount: 14, badgeColor: 'bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:text-emerald-400 dark:border-emerald-800' },
  { id: 'spotify-cares', name: 'Spotify Cares', category: 'Digital Media & Streaming', indexedMessages: 28900, activeTaxonomyCount: 9, badgeColor: 'bg-purple-500/10 text-purple-600 border-purple-200 dark:text-purple-400 dark:border-purple-800' },
  { id: 'amazon-help', name: 'Amazon Help', category: 'Global Logistics & Retail', indexedMessages: 98500, activeTaxonomyCount: 16, badgeColor: 'bg-amber-500/10 text-amber-600 border-amber-200 dark:text-amber-400 dark:border-amber-800' },
];

export const INITIAL_SETTINGS: SystemSettings = {
  selectedBrand: 'demo-brand',
  model: 'gpt-4o-mini',
  temperature: 0.2,
  retrievalTopK: 5,
  similarityThreshold: 0.80,
  autoHandlingThreshold: 0.85,
  escalationThreshold: 0.70,
  apiBaseUrl: 'http://localhost:3001/api',
  useRealBackend: false,
};

export const EVALUATION_METRICS: EvaluationMetrics = {
  intentAccuracy: 91.8,
  precision: 90.4,
  recall: 89.7,
  f1: 90.0,
  groundedness: 4.4,
  relevance: 4.5,
  helpfulness: 4.3,
  tone: 4.6,
  escalationAccuracy: 93.1,
  humanAgreement: 87.0,
  totalEvaluated: 200,
  totalConversations: 12480,
  messagesProcessed: 18642,
  autoHandlingRate: 72.4,
  escalationRate: 27.6,
};

export const INTENTS: IntentStat[] = [
  {
    id: 'refund-status',
    name: 'Refund Status',
    category: 'Billing & Payments',
    description: 'Inquiries regarding missing, delayed, or processed refund payments.',
    count: 3420,
    accuracy: 94.2,
    precision: 93.5,
    recall: 94.8,
    f1: 94.1,
    examples: ['Where is my refund for order #9812?', 'I returned the items last week but no credit on my statement yet.', 'Refund still hasn\'t arrived after 10 business days.'],
    riskLevel: 'LOW'
  },
  {
    id: 'duplicate-charge',
    name: 'Duplicate Charge',
    category: 'Billing & Payments',
    description: 'Customers reporting multiple charges for a single order transaction.',
    count: 1850,
    accuracy: 92.1,
    precision: 91.0,
    recall: 93.2,
    f1: 92.1,
    examples: ['I was charged twice for order #4401', 'Two pending transactions on my credit card for one purchase', 'Why did you bill me twice today?'],
    riskLevel: 'HIGH'
  },
  {
    id: 'account-access',
    name: 'Account Access',
    category: 'Account Management',
    description: 'Login troubles, forgotten passwords, or two-factor authentication lockout.',
    count: 2410,
    accuracy: 90.5,
    precision: 89.8,
    recall: 91.2,
    f1: 90.5,
    examples: ['Can\'t log into my account, error code 403', 'Reset password link never arrived in my email', '2FA app code is not being accepted'],
    riskLevel: 'MEDIUM'
  },
  {
    id: 'account-security',
    name: 'Account Security',
    category: 'Security & Privacy',
    description: 'Suspected compromised accounts, unauthorized email changes, or login alerts.',
    count: 980,
    accuracy: 95.8,
    precision: 96.2,
    recall: 95.4,
    f1: 95.8,
    examples: ['Someone accessed my account and changed my email', 'Got a password reset request I didn\'t initiate', 'Unauthorized order placed from my account!'],
    riskLevel: 'CRITICAL'
  },
  {
    id: 'payment-failure',
    name: 'Payment Failure',
    category: 'Billing & Payments',
    description: 'Declined credit card transactions or checkout payment gateway errors.',
    count: 1650,
    accuracy: 89.4,
    precision: 88.5,
    recall: 90.3,
    f1: 89.4,
    examples: ['Card payment declined at checkout step 3', 'Transaction failed but money left my bank account', 'Error processing card payment error 1002'],
    riskLevel: 'HIGH'
  },
  {
    id: 'order-status',
    name: 'Order Status',
    category: 'Fulfillment & Shipping',
    description: 'Tracking requests, delivery ETA, missing package reports.',
    count: 4120,
    accuracy: 96.1,
    precision: 95.9,
    recall: 96.3,
    f1: 96.1,
    examples: ['When will order #1092 ship?', 'Tracking code says delivered but nothing at my door', 'Where is my order? It has been 5 days'],
    riskLevel: 'LOW'
  },
  {
    id: 'cancellation',
    name: 'Cancellation',
    category: 'Order Management',
    description: 'Requests to cancel orders before shipment or void active subscriptions.',
    count: 1420,
    accuracy: 88.2,
    precision: 87.1,
    recall: 89.4,
    f1: 88.2,
    examples: ['Please cancel order #8841 immediately', 'I placed an order by mistake 10 mins ago', 'How do I cancel my pending order?'],
    riskLevel: 'MEDIUM'
  },
  {
    id: 'subscription',
    name: 'Subscription',
    category: 'Account Management',
    description: 'Recurring plan upgrades, downgrades, auto-renewal billing inquiries.',
    count: 1190,
    accuracy: 91.2,
    precision: 90.5,
    recall: 91.9,
    f1: 91.2,
    examples: ['How do I change my monthly subscription plan?', 'Turn off auto-renew on my annual membership', 'Upgrade to Pro plan discounted rate question'],
    riskLevel: 'LOW'
  },
  {
    id: 'technical-issue',
    name: 'Technical Issue',
    category: 'Product & Engineering',
    description: 'App crashes, website bugs, UI glitches, feature unresponsiveness.',
    count: 940,
    accuracy: 85.4,
    precision: 84.2,
    recall: 86.6,
    f1: 85.4,
    examples: ['App crashes every time I click checkout', 'Search button is unclickable on iOS Safari', 'Video player gives black screen error'],
    riskLevel: 'MEDIUM'
  },
  {
    id: 'general-question',
    name: 'General Question',
    category: 'Support & Information',
    description: 'Store hours, policy terms, product availability, general guidance.',
    count: 860,
    accuracy: 84.1,
    precision: 83.0,
    recall: 85.2,
    f1: 84.1,
    examples: ['Do you ship internationally to Canada?', 'What is your holiday return policy window?', 'Are your products cruelty-free certified?'],
    riskLevel: 'LOW'
  }
];

export const CONFUSED_PAIRS: ConfusedPair[] = [
  {
    actualIntent: 'Refund Status',
    predictedIntent: 'Cancellation',
    count: 48,
    confusionRate: 4.8,
    primaryCause: 'Shared keywords ("cancel", "money back", "void transaction") when customer cancels and asks about refund timing in the same sentence.',
    recommendation: 'Incorporate sentence-level semantic sequence modeling to prioritize post-cancellation status inquiries.'
  },
  {
    actualIntent: 'Payment Failure',
    predictedIntent: 'Duplicate Charge',
    count: 36,
    confusionRate: 3.6,
    primaryCause: 'Customers reporting a failed checkout attempt alongside a pending hold on their banking app.',
    recommendation: 'Add financial transaction state context features (pending vs settled holds).'
  },
  {
    actualIntent: 'Account Access',
    predictedIntent: 'Account Security',
    count: 29,
    confusionRate: 2.9,
    primaryCause: 'Urgency indicators and words like "locked out" or "hacked" used casually by users who forgot passwords.',
    recommendation: 'Train risk-severity classifier on explicit indicators of compromised credentials vs simple credential loss.'
  },
  {
    actualIntent: 'Order Status',
    predictedIntent: 'Refund Status',
    count: 22,
    confusionRate: 2.2,
    primaryCause: 'Delayed delivery queries where customers threaten to request a refund if package does not arrive.',
    recommendation: 'Multi-intent tagger or secondary intent classification step.'
  },
  {
    actualIntent: 'Technical Issue',
    predictedIntent: 'Account Access',
    count: 19,
    confusionRate: 1.9,
    primaryCause: 'Authentication API failures manifesting as UI errors during login attempts.',
    recommendation: 'Correlate user error strings with system status telemetry.'
  }
];

export const CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-001',
    customerName: 'Sarah Jenkins',
    customerHandle: '@sjenkins_tech',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    timestamp: '10 minutes ago',
    message: 'I have been waiting for my refund for 10 days on order #9812. Still nothing in my bank account.',
    conversationHistory: [
      { id: 'h-1', sender: 'customer', text: 'I returned order #9812 two weeks ago and received a confirmation email on the 18th.', timestamp: '10:14 AM' },
      { id: 'h-2', sender: 'customer', text: 'I have been waiting for my refund for 10 days on order #9812. Still nothing in my bank account.', timestamp: '10:15 AM' }
    ],
    intent: 'Refund Status',
    confidence: 0.94,
    decision: 'AUTO_HANDLE',
    decisionReason: 'Matches standard refund status inquiry pattern with confirmed return receipt. Similarity score to verified historical resolution is 94%.',
    riskLevel: 'LOW',
    generatedReply: 'Hi Sarah! I am sorry your refund for order #9812 is taking longer than expected. Refunds typically take 5 to 7 business days to reflect after posting, depending on your financial institution. Since it has been 10 days, please reply with your bank statement line item or check if your card issuer holds pending credits.',
    evidence: [
      {
        id: 'ev-1',
        customerMessage: 'My refund for order #4012 has not hit my checking account after 9 days.',
        brandResponse: 'Hi there! Refunds usually post within 5-7 business days. If it has been over 8 business days, please verify with your card issuer as some banks hold pending credits for up to 10 days.',
        resolution: 'Customer confirmed refund appeared on day 11.',
        similarityScore: 0.94,
        timestamp: '2026-08-14',
        handle: '@support_archive'
      },
      {
        id: 'ev-2',
        customerMessage: 'Returned item 10 days ago, where is my money?',
        brandResponse: 'Hello! Once returns are received, refunds process in 3-5 days. Please check your original payment method dashboard.',
        resolution: 'Refund timeline explained; resolved without escalation.',
        similarityScore: 0.89,
        timestamp: '2026-08-20',
        handle: '@support_archive'
      }
    ],
    priority: 'medium',
    status: 'open',
    groundednessScore: 4.8,
    relevanceScore: 4.9,
    helpfulnessScore: 4.7
  },
  {
    id: 'conv-002',
    customerName: 'Marcus Vance',
    customerHandle: '@marcus_vance',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    timestamp: '18 minutes ago',
    message: 'Someone accessed my account and changed my email address to intruder@temp-mail.org! Help immediately!',
    conversationHistory: [
      { id: 'h-3', sender: 'customer', text: 'Someone accessed my account and changed my email address to intruder@temp-mail.org! Help immediately!', timestamp: '10:07 AM' }
    ],
    intent: 'Account Security',
    confidence: 0.98,
    decision: 'ESCALATE',
    decisionReason: 'Potential account compromise & security breach. Requires immediate human identity verification and account lock.',
    riskLevel: 'CRITICAL',
    generatedReply: 'Hello Marcus! We take security extremely seriously. Because this involves unauthorized account modifications, I have immediately escalated this to our Senior Security Team. A dedicated specialist will contact you directly via your registered phone number or emergency contact channel within 15 minutes to secure your account.',
    evidence: [
      {
        id: 'ev-3',
        customerMessage: 'My account was hacked and email swapped out!',
        brandResponse: 'Escalating immediately to Risk & Fraud ops. Do not share credentials.',
        resolution: 'Identity verified manually via government ID upload; account restored.',
        similarityScore: 0.96,
        timestamp: '2026-09-02',
        handle: '@security_ops'
      }
    ],
    priority: 'urgent',
    status: 'escalated',
    groundednessScore: 4.9,
    relevanceScore: 5.0,
    helpfulnessScore: 4.8
  },
  {
    id: 'conv-003',
    customerName: 'Elena Rostova',
    customerHandle: '@elena_design',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    timestamp: '25 minutes ago',
    message: 'I was charged twice for the same order #8802 ($149.99). Please void the extra charge!',
    conversationHistory: [
      { id: 'h-4', sender: 'customer', text: 'I clicked place order once, but got two receipt emails for order #8802 charging $149.99 each!', timestamp: '10:00 AM' }
    ],
    intent: 'Duplicate Charge',
    confidence: 0.92,
    decision: 'ESCALATE',
    decisionReason: 'Potential financial dispute requiring human verification of merchant payment logs before processing void/refund.',
    riskLevel: 'HIGH',
    generatedReply: 'Hi Elena! I understand how concerning a duplicate charge can be. We see multiple authorization holds on order #8802. I have routed this case to our Billing Escalations team with priority tags so they can inspect the transaction log and void the secondary pending authorization.',
    evidence: [
      {
        id: 'ev-4',
        customerMessage: 'Double charge on my credit card for purchase #3319.',
        brandResponse: 'Passing this to Billing Ops for transaction reconciliation.',
        resolution: 'Secondary authorization hold voided within 2 hours.',
        similarityScore: 0.93,
        timestamp: '2026-09-10',
        handle: '@billing_ops'
      }
    ],
    priority: 'high',
    status: 'open',
    groundednessScore: 4.6,
    relevanceScore: 4.8,
    helpfulnessScore: 4.5
  },
  {
    id: 'conv-004',
    customerName: 'David Chen',
    customerHandle: '@dchen_dev',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    timestamp: '35 minutes ago',
    message: 'Where is my order #5512? Tracking number hasn\'t updated in 4 days.',
    conversationHistory: [
      { id: 'h-5', sender: 'customer', text: 'Where is my order #5512? Tracking number hasn\'t updated in 4 days.', timestamp: '9:50 AM' }
    ],
    intent: 'Order Status',
    confidence: 0.96,
    decision: 'AUTO_HANDLE',
    decisionReason: 'Standard order status inquiry. High carrier tracking retrieval confidence.',
    riskLevel: 'LOW',
    generatedReply: 'Hi David! Thanks for reaching out. Order #5512 is currently in transit with FedEx (Tracking #FX-9920148). It arrived at the regional sorting hub yesterday at 4:15 PM and is scheduled for delivery tomorrow by 7:00 PM. You can track real-time updates directly on the carrier portal.',
    evidence: [
      {
        id: 'ev-5',
        customerMessage: 'Tracking status stuck on order #1120.',
        brandResponse: 'Package is in transit between hubs. Estimated arrival remains on schedule.',
        resolution: 'Package delivered on estimated date.',
        similarityScore: 0.95,
        timestamp: '2026-09-12',
        handle: '@support_archive'
      }
    ],
    priority: 'low',
    status: 'approved',
    groundednessScore: 4.9,
    relevanceScore: 4.9,
    helpfulnessScore: 4.8
  },
  {
    id: 'conv-005',
    customerName: 'Rachel Kim',
    customerHandle: '@rachel_k',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    timestamp: '42 minutes ago',
    message: 'I want to cancel my annual subscription before it auto-renews tomorrow.',
    conversationHistory: [
      { id: 'h-6', sender: 'customer', text: 'I want to cancel my annual subscription before it auto-renews tomorrow.', timestamp: '9:43 AM' }
    ],
    intent: 'Subscription',
    confidence: 0.91,
    decision: 'AUTO_HANDLE',
    decisionReason: 'Self-service subscription cancellation flow guidance supported by historical resolution evidence.',
    riskLevel: 'LOW',
    generatedReply: 'Hi Rachel! You can cancel auto-renewal at any time. Go to Account Settings > Subscription Plans > Management, and click "Cancel Auto-Renewal". Your current plan will remain active until the end of your billing cycle tomorrow without any future charges.',
    evidence: [
      {
        id: 'ev-6',
        customerMessage: 'How to cancel subscription auto renew before billing date?',
        brandResponse: 'Navigate to Settings > Subscription and toggle off auto-renew.',
        resolution: 'Customer completed self-service cancellation.',
        similarityScore: 0.92,
        timestamp: '2026-09-15',
        handle: '@support_archive'
      }
    ],
    priority: 'medium',
    status: 'open',
    groundednessScore: 4.7,
    relevanceScore: 4.8,
    helpfulnessScore: 4.6
  },
  {
    id: 'conv-006',
    customerName: 'Alex Rivera',
    customerHandle: '@arivera_sf',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150',
    timestamp: '1 hour ago',
    message: 'Your web checkout button gives error code 500 when paying with Apple Pay.',
    conversationHistory: [
      { id: 'h-7', sender: 'customer', text: 'Your web checkout button gives error code 500 when paying with Apple Pay.', timestamp: '9:25 AM' }
    ],
    intent: 'Technical Issue',
    confidence: 0.88,
    decision: 'AUTO_HANDLE',
    decisionReason: 'Known browser workaround available; low financial risk.',
    riskLevel: 'MEDIUM',
    generatedReply: 'Hi Alex! Thanks for bringing this technical issue to our attention. Our team is currently investigating a temporary glitch with Apple Pay on desktop Safari. In the interim, completing checkout on mobile Safari or selecting credit card payment will bypass error code 500.',
    evidence: [
      {
        id: 'ev-7',
        customerMessage: 'Apple pay failing with server 500 error.',
        brandResponse: 'Temporary payment gateway issue. Clearing cookies or using credit card resolves it.',
        resolution: 'Customer used alternative payment method successfully.',
        similarityScore: 0.88,
        timestamp: '2026-09-18',
        handle: '@support_archive'
      }
    ],
    priority: 'medium',
    status: 'open',
    groundednessScore: 4.5,
    relevanceScore: 4.6,
    helpfulnessScore: 4.4
  },
  {
    id: 'conv-007',
    customerName: 'Jessica Taylor',
    customerHandle: '@jtaylor_fits',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    timestamp: '1.5 hours ago',
    message: 'Can I change my shipping address for order #7712? I entered the wrong zip code.',
    conversationHistory: [
      { id: 'h-8', sender: 'customer', text: 'Can I change my shipping address for order #7712? I entered the wrong zip code.', timestamp: '8:50 AM' }
    ],
    intent: 'Cancellation',
    confidence: 0.87,
    decision: 'ESCALATE',
    decisionReason: 'Address modification requires manual warehouse intercept before dispatch.',
    riskLevel: 'MEDIUM',
    generatedReply: 'Hi Jessica! Because address changes require updating shipment labels before our warehouse dispatches package #7712, I have flagged this to our Warehouse Logistics desk for immediate address rerouting.',
    evidence: [
      {
        id: 'ev-8',
        customerMessage: 'Need to update address on pending order #4412.',
        brandResponse: 'Escalated to warehouse dispatch to update destination label.',
        resolution: 'Address updated prior to carrier pickup.',
        similarityScore: 0.89,
        timestamp: '2026-09-21',
        handle: '@logistics_ops'
      }
    ],
    priority: 'high',
    status: 'open',
    groundednessScore: 4.6,
    relevanceScore: 4.7,
    helpfulnessScore: 4.5
  },
  {
    id: 'conv-008',
    customerName: 'Kevin Patel',
    customerHandle: '@kpatel_tech',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
    timestamp: '2 hours ago',
    message: 'Do you ship to military APO/FPO addresses internationally?',
    conversationHistory: [
      { id: 'h-9', sender: 'customer', text: 'Do you ship to military APO/FPO addresses internationally?', timestamp: '8:20 AM' }
    ],
    intent: 'General Question',
    confidence: 0.97,
    decision: 'AUTO_HANDLE',
    decisionReason: 'Standard policy question answered via verified shipping guidelines.',
    riskLevel: 'LOW',
    generatedReply: 'Hi Kevin! Yes! We proudly ship to all US Military APO, FPO, and DPO addresses via USPS Priority Mail. Free standard shipping applies to all APO/FPO orders over $50.',
    evidence: [
      {
        id: 'ev-9',
        customerMessage: 'Do you deliver to overseas APO military address?',
        brandResponse: 'Yes, we deliver to APO/FPO addresses via USPS.',
        resolution: 'Policy confirmed.',
        similarityScore: 0.97,
        timestamp: '2026-09-22',
        handle: '@support_archive'
      }
    ],
    priority: 'low',
    status: 'approved',
    groundednessScore: 5.0,
    relevanceScore: 5.0,
    helpfulnessScore: 5.0
  },
  {
    id: 'conv-009',
    customerName: 'Amanda Brooks',
    customerHandle: '@amanda_b',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    timestamp: '2.5 hours ago',
    message: 'My card was declined 3 times during checkout but my bank shows 3 pending authorizations!',
    conversationHistory: [
      { id: 'h-10', sender: 'customer', text: 'My card was declined 3 times during checkout but my bank shows 3 pending authorizations!', timestamp: '7:55 AM' }
    ],
    intent: 'Payment Failure',
    confidence: 0.93,
    decision: 'ESCALATE',
    decisionReason: 'Multiple payment authorization holds created without completed order confirmation. Financial risk escalation.',
    riskLevel: 'HIGH',
    generatedReply: 'Hi Amanda! When a payment check fails billing address validation (AVS match), your bank creates temporary authorization holds that automatically expire in 2-3 business days. Since 3 holds were recorded, I am escalating this to our Payment Security team to ensure no settled charge occurs.',
    evidence: [
      {
        id: 'ev-10',
        customerMessage: 'Card declined but money shows pending in banking app.',
        brandResponse: 'AVS zip code mismatch creates pending hold that drops off automatically.',
        resolution: 'Holds released by bank within 48 hours.',
        similarityScore: 0.93,
        timestamp: '2026-09-24',
        handle: '@billing_ops'
      }
    ],
    priority: 'high',
    status: 'open',
    groundednessScore: 4.7,
    relevanceScore: 4.8,
    helpfulnessScore: 4.6
  },
  {
    id: 'conv-010',
    customerName: 'Brian Miller',
    customerHandle: '@bmiller_nyc',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150',
    timestamp: '3 hours ago',
    message: 'Can\'t log into my account. Password reset link says token expired.',
    conversationHistory: [
      { id: 'h-11', sender: 'customer', text: 'Can\'t log into my account. Password reset link says token expired.', timestamp: '7:30 AM' }
    ],
    intent: 'Account Access',
    confidence: 0.94,
    decision: 'AUTO_HANDLE',
    decisionReason: 'Standard expired token resolution flow with clear instructions.',
    riskLevel: 'LOW',
    generatedReply: 'Hi Brian! Password reset links expire after 15 minutes for security. Please request a fresh reset link from the login page, ensure you open the link in the same web browser, and complete password reset immediately upon receiving the email.',
    evidence: [
      {
        id: 'ev-11',
        customerMessage: 'Password reset link token expired error message.',
        brandResponse: 'Links expire in 15 mins. Request new link and use within timeframe.',
        resolution: 'Customer successfully reset password.',
        similarityScore: 0.94,
        timestamp: '2026-09-25',
        handle: '@support_archive'
      }
    ],
    priority: 'medium',
    status: 'approved',
    groundednessScore: 4.8,
    relevanceScore: 4.9,
    helpfulnessScore: 4.8
  }
];

// Generate 200 Golden Dataset examples
export const GOLDEN_DATASET: GoldenExample[] = Array.from({ length: 200 }, (_, i) => {
  const index = i + 1;
  const intents = [
    'Refund Status', 'Duplicate Charge', 'Account Access', 'Account Security',
    'Payment Failure', 'Order Status', 'Cancellation', 'Subscription',
    'Technical Issue', 'General Question'
  ];
  const selectedIntent = intents[i % intents.length];
  const isSecurityOrDispute = selectedIntent === 'Account Security' || selectedIntent === 'Duplicate Charge' || selectedIntent === 'Payment Failure';
  const expectedDecision = isSecurityOrDispute ? 'ESCALATE' : 'AUTO_HANDLE';
  
  // 91.8% accuracy simulation -> ~16 errors out of 200
  const isCorrect = i % 12 !== 0; 
  const aiPrediction = isCorrect ? selectedIntent : intents[(i + 3) % intents.length];
  
  return {
    id: `GS-${String(index).padStart(3, '0')}`,
    customerMessage: getSampleMessageForIntent(selectedIntent, index),
    intent: selectedIntent,
    expectedDecision,
    expectedCharacteristics: getSampleCharacteristics(selectedIntent),
    humanLabel: selectedIntent,
    aiPrediction,
    isCorrect,
    confidence: isCorrect ? Math.round((0.88 + (i % 10) * 0.01) * 100) / 100 : Math.round((0.65 + (i % 15) * 0.01) * 100) / 100,
    similarityToDataset: Math.round((0.82 + (i % 16) * 0.01) * 100) / 100,
  };
});

function getSampleMessageForIntent(intent: string, idx: number): string {
  const templates: Record<string, string[]> = {
    'Refund Status': [
      'My refund still hasn\'t arrived after 10 days.',
      'When will money for order #8812 be credited back?',
      'Return delivered to warehouse 5 days ago, where is refund?'
    ],
    'Duplicate Charge': [
      'Charged twice for order #9921 on my Visa card.',
      'Double payment deducted on checkout click.',
      'Two identical charges of $79.99 on my statement.'
    ],
    'Account Access': [
      'Forgot password and reset link is not emailing.',
      'Locked out of my account after 3 password tries.',
      '2FA code SMS never arrives on my phone.'
    ],
    'Account Security': [
      'Someone changed my email address without permission!',
      'Suspicious login attempt from IP in Europe.',
      'Unauthorized order placed on my credit card!'
    ],
    'Payment Failure': [
      'Card declined error 4002 during order placement.',
      'Payment keeps failing on step 2 checkout.',
      'Bank card declined despite sufficient account funds.'
    ],
    'Order Status': [
      'Where is package #9910? Tracking stuck in transit.',
      'Has order #3310 shipped out yet?',
      'Estimated delivery date for my recent purchase?'
    ],
    'Cancellation': [
      'Cancel order #1102 before shipment please.',
      'Placed order by accident 5 mins ago, cancel it.',
      'Want to void order #8819 immediately.'
    ],
    'Subscription': [
      'How to downgrade monthly tier plan to basic?',
      'Turn off auto-renewal before next month bill.',
      'Change billing card on active subscription.'
    ],
    'Technical Issue': [
      'Checkout screen goes blank on iOS Chrome.',
      'Search filter throws network error 500.',
      'App crashes every time I tap product image.'
    ],
    'General Question': [
      'What are your store hours during holidays?',
      'Do you offer student or military discounts?',
      'Are your packaging materials 100% recyclable?'
    ]
  };

  const list = templates[intent] || ['General inquiry regarding support procedures.'];
  return `${list[idx % list.length]} (Ref #${idx + 1000})`;
}

function getSampleCharacteristics(intent: string): string {
  switch (intent) {
    case 'Refund Status': return 'Explain 5-7 business day timeline; ask for statement verification';
    case 'Duplicate Charge': return 'Acknowledge hold; route to billing ops for authorization void';
    case 'Account Access': return 'Provide direct self-service reset instructions & token timeout';
    case 'Account Security': return 'Escalate immediately; advise identity verification & lock';
    case 'Payment Failure': return 'Explain AVS hold; suggest alternative payment gateway';
    case 'Order Status': return 'Provide real-time carrier tracking link & estimated arrival';
    case 'Cancellation': return 'Instruct self-service cancel button or dispatch intercept';
    case 'Subscription': return 'Guide to Account Settings > Subscription toggles';
    case 'Technical Issue': return 'Provide browser workaround & log issue to engineering team';
    default: return 'Provide concise policy answer grounded in knowledge base';
  }
}

export const FAILURE_MODES: FailureMode[] = [
  {
    id: 'fail-1',
    title: 'Intent Ambiguity',
    frequency: 34,
    percentage: 27.2,
    severity: 'High',
    exampleMessage: 'I cancelled my order yesterday because it was delayed, but I still want my package if it can arrive by Friday or else refund me.',
    whatHappened: 'Model classified as "Order Status" instead of dual intent "Cancellation / Refund".',
    hypothesis: 'Single-intent classification pipeline forces multi-part queries into single dominant class label.',
    potentialFix: 'Implement multi-label intent taxonomy tagger with secondary fallback routing.',
    category: 'Classification'
  },
  {
    id: 'fail-2',
    title: 'Insufficient Historical Evidence',
    frequency: 24,
    percentage: 19.2,
    severity: 'High',
    exampleMessage: 'My order contains a custom monogram mistake on the leather strap.',
    whatHappened: 'Retrieval returned generic return policy with similarity 0.74 (below optimal threshold). System generated generic response.',
    hypothesis: 'Vector search embeddings lacked specialized product customization terminology.',
    potentialFix: 'Enforce strict similarity threshold (>0.80) to force escalation when retrieval confidence is low.',
    category: 'Retrieval & Evidence'
  },
  {
    id: 'fail-3',
    title: 'Incorrect Escalation (False Positive)',
    frequency: 22,
    percentage: 17.6,
    severity: 'Medium',
    exampleMessage: 'I was worried about a fraud email I received, but it turned out to be your legitimate newsletter.',
    whatHappened: 'Risk classifier triggered on word "fraud" and escalated to human security desk unnecessarily.',
    hypothesis: 'Keyword-heavy risk heuristic without full contextual sentiment analysis.',
    potentialFix: 'Fine-tune risk classifier on false-alarm security conversational context.',
    category: 'Escalation Logic'
  },
  {
    id: 'fail-4',
    title: 'Hallucinated Policy Details',
    frequency: 18,
    percentage: 14.4,
    severity: 'Critical',
    exampleMessage: 'Can I return an item opened after 45 days?',
    whatHappened: 'Agent generated reply stating returns are accepted up to 60 days (actual policy is strict 30 days).',
    hypothesis: 'Generative model relied on parametric pre-training weights instead of retrieved grounded evidence.',
    potentialFix: 'Add explicit post-generation Groundedness Verifier guardrail to block unverified claim outputs.',
    category: 'Reply Grounding'
  },
  {
    id: 'fail-5',
    title: 'Overly Generic Replies',
    frequency: 27,
    percentage: 21.6,
    severity: 'Low',
    exampleMessage: 'Why does the app show spinning wheel on my iPhone 15 Pro?',
    whatHappened: 'Agent replied: "Thank you for reaching out! We value your feedback and will look into it."',
    hypothesis: 'System fallback prompt triggered due to low confidence without actionable advice.',
    potentialFix: 'Enhance fallback prompt template to ask clarifying device/OS questions when specific bug is unknown.',
    category: 'Reply Quality'
  }
];

export const BASELINE_MODELS: BaselineModel[] = [
  {
    id: 'bm-1',
    name: 'Baseline 1: Majority Intent Classifier',
    description: 'Naive baseline that predicts the most frequent historical intent (Order Status) for all incoming messages.',
    intentAccuracy: 54.2,
    precision: 48.1,
    recall: 54.2,
    f1: 50.9,
    replyQuality: 2.1,
    escalationAccuracy: 50.0,
    isProposed: false
  },
  {
    id: 'bm-2',
    name: 'Baseline 2: Keyword / Rule-Based Classifier',
    description: 'Regex and dictionary lookup system matching customer keywords ("refund", "hacked", "charged") to predefined response templates.',
    intentAccuracy: 72.5,
    precision: 71.0,
    recall: 70.1,
    f1: 70.5,
    replyQuality: 3.2,
    escalationAccuracy: 78.4,
    isProposed: false
  },
  {
    id: 'bm-3',
    name: 'Proposed System: SupportLens AI (RAG + LLM + Risk Classifier)',
    description: 'Hybrid architecture combining fine-tuned intent classifier, vector database retrieval of historical support threads, LLM reply synthesis, and risk-aware escalation classifier.',
    intentAccuracy: 91.8,
    precision: 90.4,
    recall: 89.7,
    f1: 90.0,
    replyQuality: 4.4,
    escalationAccuracy: 93.1,
    isProposed: true
  }
];

export const DECISION_LOG: DecisionLogItem[] = [
  {
    id: 'dec-001',
    decision: 'Brand-Specific Intent Taxonomy',
    choice: 'Created distinct intent categories for each brand rather than a single monolithic global taxonomy.',
    reason: 'E-commerce (Order Status/Refund) vs Transportation (Ride Fare/Driver Issue) have disjoint customer customer intents.',
    tradeoff: 'Requires initial taxonomy mapping per new brand onboarding.',
    status: 'Implemented',
    category: 'Architecture',
    date: '2026-09-01'
  },
  {
    id: 'dec-002',
    decision: 'Retrieval-Grounded Generation (RAG)',
    choice: 'Require top-K historical brand tweets retrieval before prompting LLM for draft response.',
    reason: 'Ensures responses reflect actual brand voice, historical policies, and resolution patterns rather than generic LLM output.',
    tradeoff: 'Adds ~120ms vector search latency overhead.',
    status: 'Implemented',
    category: 'RAG Pipeline',
    date: '2026-09-04'
  },
  {
    id: 'dec-003',
    decision: 'Minimum Similarity Threshold (0.80)',
    choice: 'Enforced 0.80 cosine similarity threshold for retrieved historical evidence.',
    reason: 'Prevents grounding LLM on weak or irrelevant historical conversations, avoiding hallucinated policies.',
    tradeoff: 'Increases escalation rate by ~4.2% on novel edge-case customer queries.',
    status: 'Implemented',
    category: 'Guardrails',
    date: '2026-09-08'
  },
  {
    id: 'dec-004',
    decision: 'Mandatory Escalation for High-Risk Intents',
    choice: 'Hardcoded forced human escalation for Account Security, Fraud, and Financial Disputes regardless of model confidence.',
    reason: 'Zero tolerance for auto-handling mistakes on security breaches or compliance risk.',
    tradeoff: 'Caps maximum auto-handling rate at ~74%.',
    status: 'Implemented',
    category: 'Safety & Risk',
    date: '2026-09-11'
  },
  {
    id: 'dec-005',
    decision: 'Golden Evaluation Set Sampling',
    choice: 'Curated 200 hand-labelled evaluation examples with stratified sampling across all 10 intent classes.',
    reason: 'Prevents evaluation bias towards frequent intents like Order Status.',
    tradeoff: 'Requires manual human annotation effort for 200 examples.',
    status: 'Implemented',
    category: 'Evaluation',
    date: '2026-09-14'
  },
  {
    id: 'dec-006',
    decision: 'LLM-as-Judge Evaluation Rubric',
    choice: 'Implemented automated LLM-as-judge scoring (Groundedness, Relevance, Helpfulness, Tone) alongside human benchmarks.',
    reason: 'Enables continuous automated evaluation on thousands of responses without waiting for manual human reviews.',
    tradeoff: 'Requires validation of LLM-judge vs human agreement (achieved 87% correlation).',
    status: 'Implemented',
    category: 'Evaluation',
    date: '2026-09-17'
  },
  {
    id: 'dec-007',
    decision: 'Human-in-the-Loop Approval Interface',
    choice: 'Provided Approve, Edit, Regenerate, and Escalate actions directly inside Support Inbox detail panel.',
    reason: 'Empowers human support agents to review, audit, and modify AI drafts seamlessly.',
    tradeoff: 'Requires intuitive UI state handling.',
    status: 'Implemented',
    category: 'UX / Workflow',
    date: '2026-09-19'
  },
  {
    id: 'dec-008',
    decision: 'Subsampling Large Twitter Dataset',
    choice: 'Threaded and deduplicated raw Twitter/X support dataset into structured conversation trees.',
    reason: 'Raw tweets contain noisy mentions, duplicates, and bot spam that degrade vector retrieval quality.',
    tradeoff: 'Initial ETL pipeline data cleaning complexity.',
    status: 'Implemented',
    category: 'Data Pipeline',
    date: '2026-09-21'
  },
  {
    id: 'dec-009',
    decision: 'Separate Classification & Reply Evaluation',
    choice: 'Evaluated intent classification (F1/Accuracy) separately from reply quality (Groundedness/Relevance).',
    reason: 'A correct intent classification does not guarantee a good reply, and vice versa.',
    tradeoff: 'Requires maintaining two distinct evaluation harnesses.',
    status: 'Implemented',
    category: 'Evaluation',
    date: '2026-09-23'
  },
  {
    id: 'dec-010',
    decision: 'Conservative Auto-Handling Threshold (0.85)',
    choice: 'Set default auto-handling confidence threshold at 0.85.',
    reason: 'Prioritizes precision and customer trust over aggressive automation speed.',
    tradeoff: 'Slightly higher agent workload during peak volume spikes.',
    status: 'Implemented',
    category: 'Safety & Risk',
    date: '2026-09-25'
  },
  {
    id: 'dec-011',
    decision: 'Groundedness Verifier Guardrail',
    choice: 'Secondary model check verifying every claim in generated reply exists in retrieved evidence.',
    reason: 'Prevents subtle hallucinations like incorrect business hours or return windows.',
    tradeoff: 'Adds ~80ms secondary check execution latency.',
    status: 'Implemented',
    category: 'Guardrails',
    date: '2026-09-26'
  },
  {
    id: 'dec-012',
    decision: 'Multi-Brand Vector Index Segregation',
    choice: 'Isolated vector embedding spaces per brand workspace.',
    reason: 'Guarantees zero cross-tenant historical data leak between client accounts.',
    tradeoff: 'Slightly higher memory overhead per active brand index.',
    status: 'Implemented',
    category: 'Security & Infrastructure',
    date: '2026-09-27'
  }
];
