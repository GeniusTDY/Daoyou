import { CreationEventBus } from '../core/EventBus';
import {
  CreationEvent,
  CreationEventPriorityLevel,
  CreationPhase,
  CreationPhaseHandler,
} from '../core/types';
import { CreationSession } from '../CreationSession';
import { CreationError } from '../errors';
import { PhaseActionRegistry, WorkflowActionKey } from './PhaseActionRegistry';
import { WorkflowVariantPolicy } from './WorkflowVariantPolicy';

export interface CreationPhaseHandlerDeps {
  getSession(sessionId: string): CreationSession | undefined;
  isWorkflowActive(sessionId: string): boolean;
  completeWorkflow(sessionId: string): void;
  fail(
    session: CreationSession,
    reason: string,
    details?: Record<string, unknown>,
  ): void;
  /**
   *  session  WorkflowVariantPolicy
   *  undefinedworkflow  session
   */
  getVariantPolicy(sessionId: string): WorkflowVariantPolicy | undefined;
  /**
   *  PhaseActionRegistry
   */
  readonly phaseActionRegistry: PhaseActionRegistry;
}

interface WorkflowTransition<TEvent extends CreationEvent = CreationEvent> {
  eventType: TEvent['type'];
  priority: CreationEventPriorityLevel;
  expectedPhase?: CreationPhase;
  resolveAction: (
    event: TEvent,
    policy: WorkflowVariantPolicy,
  ) => WorkflowActionKey | null;
}

/*
 * CreationPhaseHandlerRegistry:  CreationDomainEvent
 * subscribe WorkflowVariantPolicy  action
 * expectedPhase session  PhaseActionRegistry
 *  workflow completeWorkflowCraftFailedEvent
 */
export class CreationPhaseHandlerRegistry {
  constructor(private readonly deps: CreationPhaseHandlerDeps) {}

  register(eventBus: CreationEventBus): void {
    const transitions: WorkflowTransition[] = [
      {
        eventType: 'MaterialSubmittedEvent',
        priority: CreationEventPriorityLevel.INTENT_ANALYSIS,
        expectedPhase: CreationPhase.MATERIAL_SUBMITTED,
        resolveAction: (_event, policy) =>
          policy.resolveMaterialAnalysisAction(),
      },
      {
        eventType: 'MaterialAnalyzedEvent',
        priority: CreationEventPriorityLevel.INTENT_ANALYSIS,
        expectedPhase: CreationPhase.MATERIAL_ANALYZED,
        resolveAction: () => 'resolveIntent',
      },
      {
        eventType: 'IntentResolvedEvent',
        priority: CreationEventPriorityLevel.RULE_VALIDATION,
        expectedPhase: CreationPhase.INTENT_RESOLVED,
        resolveAction: () => 'validateRecipe',
      },
      {
        eventType: 'RecipeValidatedEvent',
        priority: CreationEventPriorityLevel.ENERGY_BUDGET,
        expectedPhase: CreationPhase.RECIPE_VALIDATED,
        resolveAction: () => 'budgetEnergy',
      },
      {
        eventType: 'EnergyBudgetedEvent',
        priority: CreationEventPriorityLevel.AFFIX_SELECTION,
        expectedPhase: CreationPhase.ENERGY_BUDGETED,
        resolveAction: () => 'buildAffixPool',
      },
      {
        eventType: 'AffixPoolBuiltEvent',
        priority: CreationEventPriorityLevel.AFFIX_SELECTION,
        expectedPhase: CreationPhase.AFFIX_POOL_BUILT,
        resolveAction: () => 'rollAffixes',
      },
      {
        eventType: 'AffixRolledEvent',
        priority: CreationEventPriorityLevel.BLUEPRINT_COMPOSITION,
        expectedPhase: CreationPhase.AFFIX_ROLLED,
        resolveAction: () => 'composeBlueprint',
      },
      {
        eventType: 'BlueprintComposedEvent',
        priority: CreationEventPriorityLevel.MATERIALIZATION,
        expectedPhase: CreationPhase.BLUEPRINT_COMPOSED,
        resolveAction: (_event, policy) =>
          policy.resolveBlueprintComposedAction(),
      },
      {
        eventType: 'OutcomeMaterializedEvent',
        priority: CreationEventPriorityLevel.AUDIT,
        resolveAction: () => 'completeWorkflow',
      },
      {
        eventType: 'CraftFailedEvent',
        priority: CreationEventPriorityLevel.AUDIT,
        resolveAction: () => 'completeWorkflow',
      },
    ];

    const handlers: CreationPhaseHandler[] = transitions.map((transition) => ({
      eventType: transition.eventType,
      priority: transition.priority,
      handle: (event) => {
        void this.handleTransition(event as CreationEvent, transition);
      },
    }));

    handlers.forEach((handler) => {
      eventBus.subscribe(
        handler.eventType,
        handler.handle,
        handler.priority ?? 0,
      );
    });
  }

  private async handleTransition(
    event: CreationEvent,
    transition: WorkflowTransition,
  ): Promise<void> {
    const policy = this.deps.getVariantPolicy(event.sessionId);
    if (!policy) return;

    const action = transition.resolveAction(event, policy);
    if (!action) {
      return;
    }

    if (action === 'completeWorkflow') {
      if (this.deps.isWorkflowActive(event.sessionId)) {
        this.deps.completeWorkflow(event.sessionId);
      }
      return;
    }

    const session = transition.expectedPhase
      ? this.getWorkflowSession(event.sessionId, transition.expectedPhase)
      : undefined;

    if (!session) {
      return;
    }

    await this.executeAction(session, action);
  }

  private async executeAction(
    session: CreationSession,
    action: Exclude<WorkflowActionKey, 'completeWorkflow'>,
  ): Promise<void> {
    try {
      await this.deps.phaseActionRegistry.execute(action, session);
    } catch (error) {
      const reason = resolveWorkflowFailureReason(action, error);
      this.deps.fail(
        session,
        reason,
        {
          action,
          cause: error instanceof Error ? error.message : String(error),
          ...(error instanceof CreationError
            ? {
                code: error.code,
                creationPhase: error.phase,
              }
            : {}),
        },
      );
      if (!session.state.intentCraftMeta?.suppressLogs) {
        console.error(
          `[CreationPhaseHandlerRegistry] 执行阶段动作失败: ${action}`,
          error,
        );
      }
    }
  }

  private getWorkflowSession(
    sessionId: string,
    expectedPhase: CreationPhase,
  ): CreationSession | undefined {
    if (!this.deps.isWorkflowActive(sessionId)) {
      return undefined;
    }

    const session = this.deps.getSession(sessionId);
    if (!session || session.state.phase !== expectedPhase) {
      return undefined;
    }

    return session;
  }
}

function resolveWorkflowFailureReason(
  action: Exclude<WorkflowActionKey, 'completeWorkflow'>,
  error: unknown,
): string {
  if (isPlayerFacingCreationError(error)) {
    return error.message;
  }

  return action === 'analyzeAsync'
    ? '异步材料分析失败'
    : '造物工作流阶段执行失败';
}

function isPlayerFacingCreationError(error: unknown): error is CreationError {
  return (
    error instanceof CreationError &&
    error.phase === 'Selection' &&
    error.code === 'NO_CORE_AFFIX'
  );
}
