import { CreationWorkflowOptions } from '../core/types';
import { WorkflowActionKey } from './PhaseActionRegistry';

/**
 * WorkflowVariantPolicy
 *
 *  workflow sync/asyncautoMaterialize
 * 1.  action analyzeSync vs analyzeAsync
 * 2.
 *
 *  `CreationPhaseHandlerRegistry`
 *  workflow variant quick craft, expert craft
 *  WorkflowVariantPolicy  handler
 */
export class WorkflowVariantPolicy {
  private readonly autoMaterialize: boolean;
  private readonly materialAnalysisMode: 'sync' | 'async';
  private readonly namingMode: 'skip' | 'llm';
  private readonly workflowMode: 'material' | 'intent';

  constructor(options: Required<CreationWorkflowOptions>) {
    this.autoMaterialize = options.autoMaterialize;
    this.materialAnalysisMode = options.materialAnalysisMode;
    this.namingMode = options.namingMode;
    this.workflowMode = options.workflowMode;
  }

  /**
   *  options
   */
  resolveMaterialAnalysisAction(): WorkflowActionKey {
    return this.materialAnalysisMode === 'async' ? 'analyzeAsync' : 'analyzeSync';
  }

  /**
   *  options
   */
  resolveBlueprintComposedAction(): WorkflowActionKey {
    if (this.namingMode === 'llm') {
      return 'enrichNaming';
    }
    return this.autoMaterialize ? 'materializeOrComplete' : 'completeWorkflow';
  }

  
  isAsyncAnalysis(): boolean {
    return this.materialAnalysisMode === 'async';
  }

  
  isAutoMaterialize(): boolean {
    return this.autoMaterialize;
  }

  workflowKind(): 'material' | 'intent' {
    return this.workflowMode;
  }

  /**
   *  CreationWorkflowOptions
   *
   */
  static fromOptions(options: CreationWorkflowOptions = {}): WorkflowVariantPolicy {
    const materialAnalysisMode = options.materialAnalysisMode ?? 'sync';
    return new WorkflowVariantPolicy({
      autoMaterialize: options.autoMaterialize ?? true,
      materialAnalysisMode,
      namingMode:
        options.namingMode ??
        (materialAnalysisMode === 'async' ? 'llm' : 'skip'),
      workflowMode: options.workflowMode ?? 'material',
    });
  }
}
