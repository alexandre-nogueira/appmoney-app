import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent implements OnInit {
  @Input() title = 'Confirmar';
  @Input() body = '';
  @Input() cancelButton = 'Cancelar';
  @Input() confirmButton = 'Confirmar';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  cancel() {
    this.activeModal.dismiss();
  }
  confirm() {
    this.activeModal.close();
  }
}
