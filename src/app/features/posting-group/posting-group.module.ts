import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostingGroupRoutingModule } from './posting-group-routing.module';
import { PostingGroupMainComponent } from './components/posting-group-main/posting-group-main.component';
import { PostingGroupListComponent } from './components/posting-group-list/posting-group-list.component';
import { PostingGroupDetailComponent } from './components/posting-group-detail/posting-group-detail.component';
import { PostingGroupSelectorComponent } from './components/posting-group-selector/posting-group-selector.component';

@NgModule({
  declarations: [
    PostingGroupMainComponent,
    PostingGroupListComponent,
    PostingGroupDetailComponent,
    PostingGroupSelectorComponent,
  ],
  imports: [
    CommonModule,
    PostingGroupRoutingModule,
    SharedModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [PostingGroupSelectorComponent],
})
export class PostingGroupModule {}
