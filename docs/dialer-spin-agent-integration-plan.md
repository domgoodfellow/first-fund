# Dialer S.P.I.N Agent Integration Plan (BDR First)

This document defines how to integrate a real-time call assistant into the First Fund dialer. The assistant listens to calls, uses live speech-to-text (STT) and voice activity detection (VAD), and provides contextual coaching prompts based on the S.P.I.N framework:

- Situation
- Problem
- Implication
- Need-payoff

Scope in this version is BDR only. The design intentionally leaves room for future role-specific behavior (for example, Closers).

---

## 1) Goals and non-goals

### Goals
- Provide real-time, low-latency S.P.I.N prompts while a BDR is on a call.
- Use business context from First Fund (industry, location, estimated team size, estimated revenue) to personalize suggestions.
- Display suggestions without disrupting call flow.
- Capture coaching analytics to improve scripts and agent performance over time.

### Non-goals (phase 1)
- Full autonomous agent that speaks on the call.
- Final "source of truth" enrichment for business data (treat it as estimated context only).
- Closer-specific workflows and objection trees.

---

## 2) High-level architecture

Design around an event-driven pipeline so each component can be swapped independently (STT vendor, LLM provider, VAD, etc.).

1. Dialer session starts.
2. Audio stream is forked to:
   - call path (existing telephony),
   - STT/VAD pipeline (assistant path).
3. STT emits partial and final transcript segments.
4. VAD + diarization identify who is speaking and turn boundaries.
5. Context service fetches business profile for the lead.
6. Coaching engine builds a prompt state (conversation + context + S.P.I.N stage).
7. LLM generates suggestions, questions, and next-best-action.
8. UI shows short suggestions in a coaching panel.
9. Events are logged for QA, analytics, and model tuning.

Recommended logical services:

- `dialer-ui` (existing + coaching panel)
- `realtime-audio-gateway` (audio fork + stream session handling)
- `transcription-service` (provider adapter + diarization mapping)
- `coaching-orchestrator` (state machine + prompting + throttling)
- `business-context-service` (lead/business profile aggregation)
- `analytics-service` (events, outcomes, QA views)

---

## 3) Core data contracts

Use versioned event payloads (for example `v1`) to avoid tight coupling.

### `CallStarted`
- `callId`
- `agentId`
- `role` (`BDR`)
- `leadId`
- `startedAt`

### `BusinessContextReady`
- `callId`
- `leadId`
- `businessName`
- `industry`
- `location`
- `estimatedTeamSize`
- `estimatedRevenue`
- `confidence` (per field if available)

### `TranscriptSegment`
- `callId`
- `segmentId`
- `speaker` (`agent` | `prospect` | `unknown`)
- `text`
- `isFinal`
- `startMs`
- `endMs`

### `SpinSuggestion`
- `callId`
- `suggestionId`
- `stage` (`situation` | `problem` | `implication` | `need_payoff`)
- `priority` (`low` | `medium` | `high`)
- `reason`
- `suggestedPrompt`
- `createdAt`

### `CallEnded`
- `callId`
- `durationSec`
- `outcome` (no answer, not interested, callback, qualified, etc.)
- `endedAt`

---

## 4) S.P.I.N coaching logic (phase 1)

Implement as a lightweight state machine plus confidence scoring.

### State machine
- Start in `situation`.
- Move to `problem` after baseline facts are confirmed.
- Move to `implication` after at least one clear pain point.
- Move to `need_payoff` after implications are acknowledged.

### Input signals
- Transcript intent markers (keywords + LLM classification).
- Talk ratio and turn count.
- Prospect sentiment or uncertainty markers (optional).
- Staleness timer (if no progression after N minutes, suggest a transition question).

### Output style rules
- Max 1-2 suggestions visible at once.
- Short, actionable prompts (one sentence).
- Include one fallback question when confidence is low.
- Never claim estimated business fields are factual certainty.

---

## 5) UI/UX in the dialer (BDR)

Add a right-side "Live Coach" panel with the following blocks:

- **Current stage**: Situation/Problem/Implication/Need-payoff.
- **Best next question**: one primary prompt.
- **Optional follow-up**: one alternate phrasing.
- **Signals**: talk ratio, detected pain themes, objections seen.
- **Context card**: industry, location, estimated team size/revenue.

Interaction rules:
- Suggestion updates should be throttled (for example every 8-12 seconds unless urgent).
- Do not steal focus from dialer controls.
- Allow BDR to mark suggestion as useful/not useful for feedback loops.

---

## 6) Privacy, compliance, and risk controls

- Add explicit call recording/transcription disclosures where legally required.
- Define retention policies for audio and transcript separately.
- Encrypt audio/transcript at rest and in transit.
- Mask sensitive data in logs (PII, financial account data).
- Use role-based access control for transcript replay and QA.
- Store provenance metadata for estimated business fields.

---

## 7) Integration phases and milestones

## Phase 0 - Foundations (1-2 weeks)
- Define event schemas and service boundaries.
- Pick STT/VAD provider strategy (single provider + abstraction).
- Implement `CallStarted` and `CallEnded` events.
- Add feature flags (`spinCoachEnabled`, `spinCoachRole=BDR`).

## Phase 1 - Real-time transcript + panel MVP (2-4 weeks)
- Stream call audio to transcription service.
- Support partial/final transcript events and speaker mapping.
- Build dialer coaching panel with mock suggestions.
- Add business context card fed from existing lead/business data.

Exit criteria:
- BDR can see live transcript + context + mock S.P.I.N stage in active calls.

## Phase 2 - S.P.I.N intelligence loop (2-4 weeks)
- Implement stage classifier and state transition logic.
- Add LLM-generated `SpinSuggestion` with throttling and confidence gates.
- Add feedback capture (useful/not useful).

Exit criteria:
- Suggestions update live with acceptable latency and low noise.

## Phase 3 - QA + analytics + hardening (2-3 weeks)
- Add post-call timeline view (stages traversed, suggestions shown, outcomes).
- Build dashboards: adoption, suggestion acceptance, qualification lift.
- Tune prompts and thresholds from real call feedback.

Exit criteria:
- Stable production behavior for BDR team with measurable impact.

---

## 8) Suggested technical decisions

Keep these as decisions-to-confirm during implementation:

- **Realtime transport**: WebSocket for transcript/suggestion events to dialer UI.
- **Provider abstraction**: adapter interfaces for STT and VAD vendors.
- **Prompting strategy**: short rolling context window + structured output schema.
- **Fallbacks**:
  - If STT drops, show "coaching paused" and preserve call.
  - If LLM fails, continue stage detection with rules-only mode.

---

## 9) Backlog (implementation-ready stories)

1. Add call lifecycle events and unique `callId` in dialer.
2. Build audio stream fork service with secure auth between services.
3. Implement transcription adapter with partial/final segment callbacks.
4. Add speaker attribution mapping (`agent` vs `prospect`).
5. Build business context fetch endpoint for active lead.
6. Build coaching orchestrator (state + suggestion generation).
7. Build Live Coach panel in dialer.
8. Add telemetry + feedback buttons.
9. Add QA replay page (internal only).
10. Run pilot with BDR subgroup and compare baseline metrics.

---

## 10) BDR pilot success metrics

Track at minimum:

- Time to first meaningful problem discovery.
- Percentage of calls reaching implication stage.
- Qualification rate uplift vs. baseline.
- Suggestion usefulness rate (thumbs up/down).
- Average latency from prospect utterance to suggestion.

---

## 11) Future expansion: Closers

After BDR rollout is stable:

- Add role-aware prompt templates (`BDR`, `Closer`).
- Add closing-focused playbooks (pricing, urgency, objection handling).
- Add handoff summary from BDR call into closer workflow.

The same architecture supports this by changing role configuration, prompt packs, and success metrics without redesigning the whole pipeline.

---

## 12) Open decisions to finalize now

- Telephony provider and audio access method for real-time fork.
- Initial STT/VAD vendor choice and expected per-minute cost.
- Latency budget target (for example under 2 seconds end-to-end).
- Legal/compliance requirements by geography for recording/transcription.
- Which fields in business context are mandatory for suggestion generation.

These decisions should be confirmed before starting Phase 1 build.
