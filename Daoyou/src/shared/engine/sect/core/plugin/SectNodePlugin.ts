import type { SectBuildBuilder } from '../compilation';
import type {
  SectMeridianNodeDefinition,
  SectNodeApplyContext,
  SectProjectionContext,
} from '../domain';
import type { SectNodePlugin } from './contracts';

/** “” */
export class ConfiguredSectNodePlugin implements SectNodePlugin {
  constructor(
    readonly definition: SectMeridianNodeDefinition,
    private readonly behavior: (
      context: SectNodeApplyContext,
      builder: SectBuildBuilder,
    ) => void,
    private readonly descriptionResolver?: (
      context: SectProjectionContext,
    ) => string,
  ) {}

  describe(context: SectProjectionContext): string {
    return this.descriptionResolver?.(context) ?? this.definition.description;
  }

  apply(context: SectNodeApplyContext, builder: SectBuildBuilder): void {
    this.behavior(context, builder);
  }
}
