import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostingGroupRoutingModule } from './posting-group-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PostingGroupRoutingModule,
    SharedModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class PostingGroupModule {}
