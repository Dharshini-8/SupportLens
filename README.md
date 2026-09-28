# SupportLens AI 🛡️
> **AI Customer Support Intelligence & Evaluation Platform**  
> *Hiver SDE / AI Engineering Take-Home Assignment Implementation*  
> **Repository**: [https://github.com/Dharshini-8/SupportLens](https://github.com/Dharshini-8/SupportLens)

![SupportLens AI Platform](https://img.shields.io/badge/Status-Production--Ready-emerald)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![React](https://img.shields.io/badge/React-19.0-cyan)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38bdf8)
![Backend](https://img.shields.io/badge/Backend-Express.js-gray)
![Developer](https://img.shields.io/badge/Developer-Dharshini-purple)

---

## 🎯 Executive Overview

**SupportLens AI** is a production-quality enterprise AI Support Operations and Evaluation Platform built to demonstrate how an AI customer-support agent can process real customer-support conversations from Twitter/X while proving **whether the agent can be trusted**.

In AI engineering, *"the proof is worth more than the system"*. SupportLens AI elevates evaluation, RAG evidence grounding, failure diagnostics, and human-in-the-loop safety to first-class UI features.

---

## 🌟 Key Features & 12 Dedicated Pages

The platform features a complete left-sidebar navigation layout providing access to 12 distinct interactive operational pages:

1. **Overview Dashboard** (`/overview`): Executive KPI stats, multi-brand selector (Demo Brand, Apple, Nike, Uber, Spotify, Amazon), Recharts volume & quality distributions, performance over time, and live recent support decisions table.
2. **Support Inbox** (`/inbox`): Professional customer support inbox with master-detail conversation view, multi-faceted filtering, intent confidence bars, drafted grounded replies, Approve/Edit/Regenerate/Escalate/Send action workflows, and historical RAG evidence cards with similarity scores.
3. **AI Agent Sandbox** (`/agent`): Interactive 4-stage pipeline playground allowing real-time message analysis, animated inference step visualization, risk assessment indicators, and grounding checks.
4. **Intent Analytics** (`/intents`): 10-class intent taxonomy table, micro/macro F1 breakdown, 10x10 Confusion Matrix Heatmap, and "Most Confused Intent Pairs" root cause error diagnostic.
5. **Evaluation Harness** (`/evaluation`): Multi-tab evaluation suite covering Classification Metrics, RAG Reply Quality Rubrics (Groundedness, Relevance, Helpfulness, Tone), Escalation Safety, LLM-as-Judge (87% human correlation), and Inter-Annotator Agreement (Cohen's κ = 0.84).
6. **Golden Evaluation Set** (`/golden-set`): Searchable, filterable, and paginated table of 200 hand-labelled evaluation examples with inspection drawers and sampling methodology explanations.
7. **Failure Analysis** (`/failures`): Detailed breakdown of Top 5 Failure Modes (Intent Ambiguity, Insufficient Historical Evidence, Incorrect Escalation, Policy Hallucination, Overly Generic Replies) with frequency, severity, root cause hypotheses, and fixes.
8. **Model Comparison Baselines** (`/baselines`): Comparative benchmark suite comparing Majority Class Baseline, Keyword/Rule-Based Classifier, and Proposed SupportLens AI with prominent "Illustrative evaluation data" tags.
9. **"What Is Misleading About My Headline Number?"** (`/headline-critique`): Dedicated mandatory analysis dissecting why aggregate accuracy (91.8%) conceals class imbalance, rare intent failures (76.2%), high-risk security escalation mistakes, and confidence miscalibration.
10. **Engineering Decision Log** (`/decision-log`): 12 non-obvious engineering decisions detailing choices, reasons, trade-offs, and implementation statuses.
11. **System Architecture** (`/architecture`): Animated workflow diagrams for both Real-Time Core Runtime and Offline Evaluation Pipelines with interactive component nodes.
12. **System Settings** (`/settings`): Parameter tuning sliders for RAG Top-K, similarity thresholds, auto-handling cutoffs, LLM model selection, safety warning alerts, and REST API connection toggles.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 19 + TypeScript (Vite 6)
- **Styling**: Tailwind CSS v4 + Vanilla CSS Design System
- **Icons**: Lucide React
- **Data Visualization**: Recharts (Line, Bar, Pie, Scatter)
- **Animations**: Framer Motion
- **State Management**: React Context (`AppContext`) with global toast notifications & dark/light mode toggle

### Backend
- **Runtime**: Node.js v24
- **Framework**: Express.js REST API (`server/index.js`)
- **API Contracts**: JSON over REST (`/api/analyze`, `/api/health`, `/api/conversations`)

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Launch Frontend Dev Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser. The application runs immediately with zero API keys required!

### Step 3: Launch Express Backend (Optional for REST API testing)
In a separate terminal window:
```bash
npm run server
```
The Express backend starts on [http://localhost:3001](http://localhost:3001). To route frontend requests through the live Express server, go to **System Settings** page and check **"Connect Live Express REST API"**.

---

## 🔌 Connecting a Real Python / LLM Backend

The frontend application uses a clean service layer located at `src/services/api.ts`. To connect a real Python / LangChain / LlamaIndex backend powered by OpenAI `gpt-4o` or Google `gemini-1.5-pro`:

1. Start your Python FastAPI / Flask server exposing a `POST /api/analyze` endpoint matching the following JSON contract:

```json
// Request POST /api/analyze
{
  "message": "I was charged twice for order #8802 ($149.99)",
  "brandId": "demo-brand"
}

// Response 200 OK
{
  "conversation": {
    "id": "conv-101",
    "customerName": "Elena Rostova",
    "customerHandle": "@elena_design",
    "message": "I was charged twice for order #8802 ($149.99)",
    "intent": "Duplicate Charge",
    "confidence": 0.96,
    "decision": "ESCALATE",
    "decisionReason": "Potential financial dispute requiring human verification before voiding.",
    "riskLevel": "HIGH",
    "generatedReply": "Hi Elena! Multiple charges require billing log inspection...",
    "evidence": [
      {
        "customerMessage": "Double charge on purchase #3319",
        "brandResponse": "Escalated to Billing Ops...",
        "resolution": "Secondary hold voided.",
        "similarityScore": 0.93
      }
    ]
  },
  "executionTimeMs": 380
}
```

2. In the SupportLens AI UI, navigate to **System Settings**, set the API Base URL to `http://localhost:8000/api`, and toggle **Connect Live Backend**.

---

## 🧪 Evaluation Methodology

SupportLens AI implements a 3-pillar evaluation framework:

1. **Classification Evaluation**: Micro & Macro F1, Precision, Recall, and 10x10 Confusion Matrix Heatmap measured against the 200 hand-labelled Golden Dataset examples.
2. **RAG Groundedness Rubric**: LLM-as-judge automated scoring measuring:
   - **Groundedness**: Are all claims supported by retrieved historical brand tweets?
   - **Relevance**: Does the reply directly answer the customer query?
   - **Helpfulness**: Does the reply provide actionable resolution steps?
   - **Brand Tone**: Does the language adhere to enterprise customer care standards?
3. **Safety & Escalation Accuracy**: Evaluates false auto-handles on high-risk topics (Account Security, Fraud, Duplicate Charges).

---

## 📊 Summary of Engineering Decisions

- **Retrieval Before Response Generation (RAG)**: Prevents raw LLM hallucinations by grounding replies on top-K historical brand tweets.
- **Minimum Similarity Threshold (0.80)**: Enforces vector distance cutoffs; if historical similarity is low, auto-handling is disallowed.
- **Mandatory Escalation Guardrails**: High-risk security or financial disputes bypass LLM auto-handling regardless of confidence scores.
- **Dual Evaluation Architecture**: Decouples Intent Classification F1 from RAG Reply Groundedness scoring.

---

*Developed for the Hiver SDE Intern / AI Engineering Take-Home Assignment.*
