import { RuleDecisionMeta, RuleReason, RuleTraceEntry } from './types';

/*
 * RuleDiagnostics:  reasons/warnings/trace
 * Rules  decision.reasons.push/addWarning/addTrace
 *  RuleSet  Decision
 */
export class RuleDiagnostics {
  private readonly reasons: RuleReason[] = [];
  private readonly warnings: RuleReason[] = [];
  private readonly trace: RuleTraceEntry[] = [];

  addReason(reason: RuleReason): void {
    this.reasons.push(reason);
  }

  addWarning(warning: RuleReason): void {
    this.warnings.push(warning);
  }

  addTrace(entry: RuleTraceEntry): void {
    this.trace.push(entry);
  }

  merge(snapshot: Partial<RuleDecisionMeta>): void {
    if (snapshot.reasons) {
      this.reasons.push(...snapshot.reasons);
    }

    if (snapshot.warnings) {
      this.warnings.push(...snapshot.warnings);
    }

    if (snapshot.trace) {
      this.trace.push(...snapshot.trace);
    }
  }

  toSnapshot(): RuleDecisionMeta {
    return {
      reasons: [...this.reasons],
      warnings: [...this.warnings],
      trace: [...this.trace],
    };
  }
}