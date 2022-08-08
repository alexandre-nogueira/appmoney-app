import { Subject } from 'rxjs';
import { InviteCreateComponent } from './../components/invite-create/invite-create.component';
import { FamilyInvitations } from './../interfaces/family-invitation';
import { FamilyMember } from './../interfaces/family-member';
import { FamilyInvitation } from '../interfaces/family-invitation';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

const API = environment.apiURL;
const APP = environment.appURL;

@Injectable({
  providedIn: 'root',
})
export class FamilyService {
  pendingInvitations$: Subject<FamilyInvitations> = new Subject();

  constructor(private httpClient: HttpClient, private modal: NgbModal) {}

  getMemberInvitation(token: string) {
    return this.httpClient.get<FamilyInvitation>(
      `${API}/family/getMemberInvitation/${token}`
    );
  }

  getMembers() {
    return this.httpClient.get<FamilyMember[]>(`${API}/family/members`);
  }

  getPendingInvitations() {
    this.refreshPendingInvitationsList();
    return this.pendingInvitations$.asObservable();
  }

  refreshPendingInvitationsList() {
    this.httpClient
      .get<FamilyInvitations>(`${API}/family/pendingInvitations`)
      .subscribe({
        next: (data) => {
          this.pendingInvitations$.next(data);
        },
      });
  }

  openCreateDialog(email?: string) {
    const inviteCreateModal = this.modal.open(InviteCreateComponent);
    if (email) {
      inviteCreateModal.componentInstance.invitedEmail = email;
    }
  }

  inviteMember(invitedEmail: string, message: string) {
    return this.httpClient.post(`${API}/family/inviteMember`, {
      invitedEmail: invitedEmail,
      message: message,
      appLinkAdress: `${APP}/family/invitation`,
    });
  }

  cancelInvitation(invitedEmail: string) {
    return this.httpClient.post(`${API}/family/cancelInvitation`, {
      invitedEmail: invitedEmail,
    });
  }
}
