import { AlertService } from './../../../../shared/components/alert/alert.service';
import { FamilyService } from './../../services/family.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'invite-create',
  templateUrl: './invite-create.component.html',
  styleUrls: ['./invite-create.component.scss'],
})
export class InviteCreateComponent implements OnInit {
  @Input() invitedEmail!: string;
  inviteForm!: FormGroup;
  disableEmail = false;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private familyService: FamilyService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    if (this.invitedEmail) {
      this.disableEmail = true;
    }
    this.inviteForm = this.formBuilder.group({
      invitedEmail: [
        { value: this.invitedEmail, disabled: this.disableEmail },
        [Validators.email, Validators.required],
      ],
      message: ['', Validators.required],
    });
  }

  close() {
    this.activeModal.dismiss();
  }
  create() {
    const invitedEmail = this.inviteForm.get('invitedEmail')?.value ?? '';
    const message = this.inviteForm.get('message')?.value ?? '';

    this.familyService.inviteMember(invitedEmail, message).subscribe({
      next: () => {
        this.alertService.success('Convite enviado');
        this.familyService.refreshPendingInvitationsList();
      },
      error: (error) => {
        this.alertService.danger('Erro ao enviar convite');
        console.log(error);
      },
    });

    this.activeModal.dismiss();
  }
}
