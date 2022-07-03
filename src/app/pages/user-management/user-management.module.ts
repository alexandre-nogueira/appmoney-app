import { UserManagementRoutingModule } from './user-management.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotMyPasswordComponent } from './components/forgot-my-password/forgot-my-password.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { ConfirmUserComponent } from './components/confirm-user/confirm-user.component';

@NgModule({
  declarations: [
    LoginComponent,
    ForgotMyPasswordComponent,
    RegisterUserComponent,
    ChangePasswordComponent,
    RecoverPasswordComponent,
    ConfirmUserComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    UserManagementRoutingModule,
  ],
  exports: [RegisterUserComponent],
})
export class UserManagementModule {}
