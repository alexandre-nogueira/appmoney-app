import { FormMessageComponent } from './components/form-message/form-message.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './components/alert/alert.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { FilterTablePipe } from './pipes/filter-table.pipe';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { SummarizerComponent } from './components/summarizer/summarizer.component';

@NgModule({
  declarations: [
    FormMessageComponent,
    AlertComponent,
    LoadingComponent,
    ConfirmationModalComponent,
    FilterTablePipe,
    UploadFileComponent,
    SummarizerComponent,
  ],
  imports: [CommonModule],
  exports: [
    FormMessageComponent,
    AlertComponent,
    LoadingComponent,
    FilterTablePipe,
    UploadFileComponent,
    SummarizerComponent,
  ],
})
export class SharedModule {}
