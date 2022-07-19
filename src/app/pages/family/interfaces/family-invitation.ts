export interface FamilyInvitation {
  id: number;
  familyId: number;
  familyName?: string;
  invitedEmail: string;
  hostEmail: string;
  message: string;
  expiresAt: Date;
}
export type FamilyInvitations = Array<FamilyInvitation>;
