import { AccountModule } from './../account/account.module';
import { PostingGroupModule } from './../posting-group/posting-group.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PostingCategoryModule } from './../posting-category/posting-category.module';
import { PostingRoutingModule } from './posting-routing.module';
import { PostingMainComponent } from './components/posting-main/posting-main.component';
import { PostingListComponent } from './components/posting-list/posting-list.component';
import { PostingDetailComponent } from './components/posting-detail/posting-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StatusPipe } from './pipes/status.pipe';
import { PostingStatusComponent } from './components/posting-status/posting-status.component';
import { SummarizerComponent } from './components/summarizer/summarizer.component';
import { PostingFileUploadComponent } from './components/posting-file-upload/posting-file-upload.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    PostingMainComponent,
    PostingListComponent,
    PostingDetailComponent,
    StatusPipe,
    PostingStatusComponent,
    SummarizerComponent,
    PostingFileUploadComponent,
  ],
  imports: [
    CommonModule,
    PostingRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    FontAwesomeModule,
    PostingCategoryModule,
    PostingGroupModule,
    AccountModule,
    NgbNavModule,
  ],
})
export class PostingModule {}
