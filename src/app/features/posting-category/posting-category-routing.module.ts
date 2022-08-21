import { AuthGuard } from './../../core/guards/auth.guard';
import { PostingCategoryMainComponent } from './components/posting-category-main/posting-category-main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PostingCategoryMainComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostingCategoryRoutingModule {}
