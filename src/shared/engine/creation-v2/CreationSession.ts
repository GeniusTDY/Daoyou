import { CreationTagContainer } from '@shared/engine/shared/tag-domain';
import { CreationPhase } from './core/types';
import {
  CreationTagSignal,
  CreationSessionInput,
  CreationSessionState,
  isCreationProductType,
} from './types';

/**
 *  UUID v4
 * crypto.randomUUID HTTPS/localhost
 *  HTTPS + ID
 */
function safeRandomUuid(): string {
  const uuid = globalThis.crypto?.randomUUID?.();
  if (uuid) {
    return uuid;
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (ch) => {
    const r = (Math.random() * 16) | 0;
    const v = ch === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/*
 * CreationSession:
 *  sessionIdphase
 *  phase setPhase / syncTags
 */
/*
 * CreationSession:
 *
 *  Orchestrator
 */
export class CreationSession {
  readonly id: string;
  readonly state: CreationSessionState;
  readonly inputTags = new CreationTagContainer();

  constructor(input: CreationSessionInput) {
    if (!isCreationProductType(input.productType)) {
      throw new Error(`Unsupported creation product type: ${input.productType}`);
    }

    this.id = input.sessionId ?? safeRandomUuid();
    this.state = {
      id: this.id,
      phase: CreationPhase.INIT,
      input,
      inputTagSignals: [],
      inputTags: [],
      materialFingerprints: [],
      affixPool: [],
      rolledAffixes: [],
    };
  }

  setPhase(phase: CreationPhase): void {
    this.state.phase = phase;
  }

  syncInputTagSignals(signals: CreationTagSignal[]): void {
    this.inputTags.clear();
    this.inputTags.addTags(signals.map((signal) => signal.tag));
    this.state.inputTagSignals = signals;
    this.state.inputTags = this.inputTags.getTags();
  }
}
