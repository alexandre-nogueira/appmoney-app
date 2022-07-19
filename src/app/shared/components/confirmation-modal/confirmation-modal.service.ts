import { ConfirmationModalComponent } from './confirmation-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { of, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationModalService {
  constructor(private modal: NgbModal) {}

  result: Subject<boolean> = new Subject();

  show(
    title: string,
    body: string,
    confirmButton?: string,
    cancelButton?: string
  ): Observable<boolean> {
    const confirmationModal = this.modal.open(ConfirmationModalComponent);
    confirmationModal.componentInstance.title = title;
    confirmationModal.componentInstance.body = body;
    if (confirmButton) {
      confirmationModal.componentInstance.confirmButton = confirmButton;
    }
    if (cancelButton) {
      confirmationModal.componentInstance.cancelButton = cancelButton;
    }

    confirmationModal.result.then(
      () => {
        // console.log('confirmou');
        this.result.next(true);
      },
      () => {
        // console.log('cancelou');
        this.result.next(false);
      }
    );
    return this.result.asObservable();
  }
}
