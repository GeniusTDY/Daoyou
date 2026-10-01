import type {
  SectAdmissionContext,
  SectAdmissionResult,
  SectDefinition,
} from '../domain';
import type { SectOrganizationModule } from '../organization';

export interface SectAdmissionPolicy {
  check(context: SectAdmissionContext): SectAdmissionResult;
}


export interface SectModule {
  readonly definition: SectDefinition;
  readonly organization: SectOrganizationModule;
  checkAdmission(context: SectAdmissionContext): SectAdmissionResult;
}
