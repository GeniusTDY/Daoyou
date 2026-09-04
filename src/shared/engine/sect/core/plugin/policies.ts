import type {
  PlayerRaceId,
  SectAdmissionContext,
  SectAdmissionResult,
} from '../domain';
import type { SectAdmissionPolicy } from './contracts';


export class AllowedRaceAdmissionPolicy implements SectAdmissionPolicy {
  constructor(
    private readonly allowedRaceIds: readonly PlayerRaceId[],
    private readonly rejectedReason: string,
  ) {}

  check(context: SectAdmissionContext): SectAdmissionResult {
    return this.allowedRaceIds.includes(context.playerRace)
      ? { allowed: true }
      : { allowed: false, reason: this.rejectedReason };
  }
}
