import { UserManagementModule } from './../user-management/user-management.module';
import { SharedModule } from './../../shared/shared.module';
import { FamilyInvitationComponent } from './components/family-invitation/family-invitation.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FamilyRoutingModule } from './family-routing.module';
import { MemberListComponent } from './components/member-list/member-list.component';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';

@NgModule({
  declarations: [FamilyInvitationComponent, MemberListComponent, MemberDetailComponent],
  imports: [
    CommonModule,
    FamilyRoutingModule,
    SharedModule,
    UserManagementModule,
  ],
})
export class FamilyModule {}
