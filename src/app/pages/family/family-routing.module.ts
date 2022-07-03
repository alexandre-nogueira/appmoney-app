import { AuthGuard } from './../../core/guards/auth.guard';
import { MemberListComponent } from './components/member-list/member-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/core/guards/login.guard';
import { FamilyInvitationComponent } from './components/family-invitation/family-invitation.component';

const routes: Routes = [
  {
    path: '',
    component: MemberListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'invitation/:token',
    component: FamilyInvitationComponent,
    canActivate: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FamilyRoutingModule {}
