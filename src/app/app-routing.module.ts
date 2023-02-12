import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./pages/user-management/user-management.module').then(
        (m) => m.UserManagementModule
      ),
  },
  {
    path: 'family',
    loadChildren: () =>
      import('./pages/family/family.module').then((m) => m.FamilyModule),
  },
  {
    path: 'posting',
    loadChildren: () =>
      import('./features/posting/posting.module').then((m) => m.PostingModule),
  },
  {
    path: 'accountCategory',
    loadChildren: () =>
      import('./features/account-category/account-category.module').then(
        (m) => m.AccountCategoryModule
      ),
  },
  {
    path: 'postingGroup',
    loadChildren: () =>
      import('./features/posting-group/posting-group.module').then(
        (m) => m.PostingGroupModule
      ),
  },
  {
    path: 'postingCategory',
    loadChildren: () =>
      import('./features/posting-category/posting-category.module').then(
        (m) => m.PostingCategoryModule
      ),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./features/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
