import { StandardSectMethodGrowthPolicy } from '../authoring';
import type { SectDefinitionWithoutPaths } from '../domain';
import {
  StandardSectOrganizationModule,
  type SectOrganizationTheme,
} from '../organization';
import { standardSectProgression } from '../progression';
import { BaseSectModule } from './BaseSectModule';
import type { SectPathModule } from './contracts';
import { AllowedRaceAdmissionPolicy } from './policies';

export interface StandardSectModuleOptions {
  organizationTheme?: SectOrganizationTheme;
  admissionRejectedReason?: string;
}


export abstract class StandardSectModule extends BaseSectModule {
  protected constructor(
    definition: SectDefinitionWithoutPaths,
    pathModules: readonly SectPathModule[],
    options: StandardSectModuleOptions = {},
  ) {
    super(
      definition,
      pathModules,
      standardSectProgression,
      new StandardSectMethodGrowthPolicy(definition.methods),
      new StandardSectOrganizationModule(options.organizationTheme),
      new AllowedRaceAdmissionPolicy(
        definition.raceIds,
        options.admissionRejectedReason ?? `当前种族无法拜入${definition.name}`,
      ),
    );
  }
}
