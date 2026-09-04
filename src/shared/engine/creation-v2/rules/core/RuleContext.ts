/*
 * RuleContext:
 *  facts decision diagnostics metadata phase/sessionId
 */

import { RuleDecisionMeta } from './types';

export interface RuleContextMetadata {
  phase?: string;
  sessionId?: string;
  [key: string]: unknown;
}

export interface RuleContext<
  TFacts,
  TDecision extends RuleDecisionMeta,
> {
  facts: TFacts;
  decision: TDecision;
  metadata: RuleContextMetadata;
}