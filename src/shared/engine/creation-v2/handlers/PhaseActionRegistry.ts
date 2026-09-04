import { CreationSession } from '../CreationSession';

/**
 *
 *  workflow
 */
export type WorkflowActionKey =
  | 'analyzeSync'
  | 'analyzeAsync'
  | 'resolveIntent'
  | 'validateRecipe'
  | 'budgetEnergy'
  | 'buildAffixPool'
  | 'rollAffixes'
  | 'composeBlueprint'
  | 'enrichNaming'
  | 'materializeOrComplete'
  | 'completeWorkflow';

/**
 *  session
 *
 */
export type PhaseAction = (session: CreationSession) => void | Promise<void>;

/**
 * PhaseActionRegistry
 *
 *  WorkflowActionKey  PhaseAction
 *  CreationOrchestrator  override()  action
 *
 *  workflow variant expert craft / quick craft
 * orchestrator
 */
export class PhaseActionRegistry {
  private readonly actions = new Map<WorkflowActionKey, PhaseAction>();

  /**
   *  CreationOrchestrator
   */
  registerDefaults(
    defaults: Partial<Record<WorkflowActionKey, PhaseAction>>,
  ): void {
    for (const [key, action] of Object.entries(defaults) as [WorkflowActionKey, PhaseAction][]) {
      if (!this.actions.has(key)) {
        this.actions.set(key, action);
      }
    }
  }

  /**
   *
   *  workflow variant
   */
  override(key: WorkflowActionKey, action: PhaseAction): void {
    this.actions.set(key, action);
  }

  /**
   *  key
   *  undefined
   */
  get(key: WorkflowActionKey): PhaseAction | undefined {
    return this.actions.get(key);
  }

  /**
   *  key
   * workflow
   */
  async execute(key: WorkflowActionKey, session: CreationSession): Promise<void> {
    const action = this.actions.get(key);
    if (action) {
      await action(session);
    }
  }

  /**
   *  key
   */
  has(key: WorkflowActionKey): boolean {
    return this.actions.has(key);
  }
}
