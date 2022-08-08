import { AuthGuard } from './../../core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountCategoryMainComponent } from './components/account-category-main/account-category-main.component';

const routes: Routes = [
  {
    path: '',
    component: AccountCategoryMainComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountCategoryRoutingModule {}
