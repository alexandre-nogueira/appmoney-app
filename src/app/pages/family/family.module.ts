import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserManagementModule } from './../user-management/user-management.module';
import { SharedModule } from './../../shared/shared.module';
import { FamilyInvitationComponent } from './components/family-invitation/family-invitation.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FamilyRoutingModule } from './family-routing.module';
import { MemberListComponent } from './components/member-list/member-list.component';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';
import { FamilyManagementComponent } from './components/family-management/family-management.component';
import { PendingInvitationsListComponent } from './components/pending-invitations-list/pending-invitations-list.component';
import { PendingInvitationDetailComponent } from './components/pending-invitation-detail/pending-invitation-detail.component';
import { InviteCreateComponent } from './components/invite-create/invite-create.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FamilyInvitationComponent,
    MemberListComponent,
    MemberDetailComponent,
    FamilyManagementComponent,
    PendingInvitationsListComponent,
    PendingInvitationDetailComponent,
    InviteCreateComponent,
  ],
  imports: [
    CommonModule,
    FamilyRoutingModule,
    SharedModule,
    UserManagementModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
})
export class FamilyModule {}
