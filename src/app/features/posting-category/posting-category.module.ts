import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostingCategoryRoutingModule } from './posting-category-routing.module';
import { PostingCategoryMainComponent } from './components/posting-category-main/posting-category-main.component';
import { PostingCategoryListComponent } from './components/posting-category-list/posting-category-list.component';
import { PostingCategoryDetailComponent } from './components/posting-category-detail/posting-category-detail.component';

@NgModule({
  declarations: [
    PostingCategoryMainComponent,
    PostingCategoryListComponent,
    PostingCategoryDetailComponent,
  ],
  imports: [
    CommonModule,
    PostingCategoryRoutingModule,
    SharedModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class PostingCategoryModule {}
