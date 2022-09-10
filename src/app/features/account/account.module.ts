import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from './../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountListComponent } from './components/account-list/account-list.component';
import { AccountMainComponent } from './components/account-main/account-main.component';
import { AccountDetailComponent } from './components/account-detail/account-detail.component';

@NgModule({
  declarations: [
    AccountListComponent,
    AccountMainComponent,
    AccountDetailComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    FontAwesomeModule,
  ],
})
export class AccountModule {}
