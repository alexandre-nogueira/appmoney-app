import { FormMessageComponent } from './components/form-message/form-message.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './components/alert/alert.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';

@NgModule({
  declarations: [FormMessageComponent, AlertComponent, LoadingComponent, ConfirmationModalComponent],
  imports: [CommonModule],
  exports: [FormMessageComponent, AlertComponent, LoadingComponent],
})
export class SharedModule {}
