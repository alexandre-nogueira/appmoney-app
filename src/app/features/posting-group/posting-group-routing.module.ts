import { AuthGuard } from './../../core/guards/auth.guard';
import { PostingGroupMainComponent } from './components/posting-group-main/posting-group-main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PostingGroupMainComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostingGroupRoutingModule {}
