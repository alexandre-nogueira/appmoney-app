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

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private familyService: FamilyService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.inviteForm = this.formBuilder.group({
      invitedEmail: [
        this.invitedEmail,
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
      },
      error: (error) => {
        this.alertService.danger('Erro ao enviar convite');
        console.log(error);
      },
    });

    this.activeModal.dismiss();
  }
}
