import { FilterTablePipe } from './pipes/filter-table.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountCategoryRoutingModule } from './account-category-routing.module';
import { AccountCategoryListComponent } from './components/account-category-list/account-category-list.component';
import { AccountCategoryMainComponent } from './components/account-category-main/account-category-main.component';
import { AccountCategoryDetailComponent } from './components/account-category-detail/account-category-detail.component';

@NgModule({
  declarations: [
    AccountCategoryListComponent,
    AccountCategoryMainComponent,
    AccountCategoryDetailComponent,
    FilterTablePipe,
  ],
  imports: [
    CommonModule,
    AccountCategoryRoutingModule,
    SharedModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class AccountCategoryModule {}
