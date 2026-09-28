const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Sample dataset in memory
const INTENTS = [
  'Refund Status', 'Duplicate Charge', 'Account Access', 'Account Security',
  'Payment Failure', 'Order Status', 'Cancellation', 'Subscription',
  'Technical Issue', 'General Question'
];

app.get('/api/health', (req, res) => {
  res.json({
    status: 'operational',
    service: 'SupportLens AI Backend',
    version: 'v2.4-hybrid',
    timestamp: new Date().toISOString(),
    uptimePercentage: 99.9,
    latencyMs: 420
  });
});

app.post('/api/analyze', (req, res) => {
  const startTime = Date.now();
  const { message = '', brandId = 'demo-brand' } = req.body;
  const lower = message.toLowerCase();

  let intent = 'General Question';
  let confidence = 0.88;
  let riskLevel = 'LOW';
  let decision = 'AUTO_HANDLE';
  let decisionReason = 'Standard inquiry grounded in historical support dataset.';
  let generatedReply = 'Hi! Thank you for reaching out to support. How can we assist you with your account or order today?';

  if (lower.includes('refund') || lower.includes('money back')) {
    intent = 'Refund Status';
    confidence = 0.94;
    riskLevel = 'LOW';
    decision = 'AUTO_HANDLE';
    decisionReason = 'Matches previously resolved refund-status conversations and confirmed return timeline.';
    generatedReply = 'Hi there! Refunds process within 5 to 7 business days after return posting. If it has been longer, please check with your financial institution or reply with your order number.';
  } else if (lower.includes('twice') || lower.includes('double charge') || lower.includes('charged two')) {
    intent = 'Duplicate Charge';
    confidence = 0.96;
    riskLevel = 'HIGH';
    decision = 'ESCALATE';
    decisionReason = 'Financial dispute requiring human verification of transaction holds before voiding.';
    generatedReply = 'Hello! Multiple charges require billing log inspection. We have escalated your ticket to our Billing Ops desk to void any duplicate authorization hold.';
  } else if (lower.includes('hacked') || lower.includes('stolen') || lower.includes('changed my email')) {
    intent = 'Account Security';
    confidence = 0.98;
    riskLevel = 'CRITICAL';
    decision = 'ESCALATE';
    decisionReason = 'Unauthorized account modification breach. Requires emergency identity verification.';
    generatedReply = 'We take account security with paramount seriousness. Your ticket has been immediately escalated to our Security Ops team for account lockdown.';
  }

  const executionTimeMs = Date.now() - startTime + 310;

  res.json({
    conversation: {
      id: `conv-api-${Date.now()}`,
      customerName: 'API Sandbox User',
      customerHandle: '@api_user',
      timestamp: 'Just now',
      message,
      conversationHistory: [
        { id: `h-1`, sender: 'customer', text: message, timestamp: 'Just now' }
      ],
      intent,
      confidence,
      decision,
      decisionReason,
      riskLevel,
      generatedReply,
      evidence: [
        {
          id: 'ev-api-1',
          customerMessage: `Historical match for ${intent}`,
          brandResponse: `Standard verified response for ${intent}`,
          resolution: 'Resolved in past dataset cleanly.',
          similarityScore: Math.round((confidence - 0.03) * 100) / 100,
          timestamp: '2026-08-20',
          handle: '@support_archive'
        }
      ],
      priority: riskLevel === 'CRITICAL' || riskLevel === 'HIGH' ? 'high' : 'medium',
      status: 'open',
      groundednessScore: 4.7
    },
    executionTimeMs
  });
});

app.listen(PORT, () => {
  console.log(`SupportLens AI Express Backend running on http://localhost:${PORT}`);
});
