import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FutureInstallmentsMainComponent } from './future-installments/Components/future-installments-main/future-installments-main.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { FutureInstallmentsListComponent } from './future-installments/Components/future-installments-list/future-installments-list.component';

@NgModule({
  declarations: [
    FutureInstallmentsMainComponent,
    FutureInstallmentsListComponent,
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    FontAwesomeModule,
    CommonModule,
    FormsModule,
  ],
})
export class ReportsModule {}
