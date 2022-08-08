import { ConfirmationModalService } from './../../../../shared/components/confirmation-modal/confirmation-modal.service';
import { FamilyService } from './../../services/family.service';
import { AlertService } from './../../../../shared/components/alert/alert.service';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FamilyInvitation } from './../../interfaces/family-invitation';
import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';

@Component({
  selector: 'pending-invitation-detail',
  templateUrl: './pending-invitation-detail.component.html',
  styleUrls: ['./pending-invitation-detail.component.scss'],
})
export class PendingInvitationDetailComponent implements OnInit {
  @Input() pendingInvitation!: FamilyInvitation;
  faUser = faUserCircle;
  constructor(
    private alertService: AlertService,
    private familyService: FamilyService,
    private confirmationModalService: ConfirmationModalService
  ) {}

  ngOnInit(): void {}

  resendInvitation(familyInvitation: FamilyInvitation) {
    this.familyService.openCreateDialog(familyInvitation.invitedEmail);
  }

  cancelInvitation(invitedEmail: string) {
    this.familyService.cancelInvitation(invitedEmail).subscribe({
      next: () => {
        this.alertService.success('Convite cancelado');
        this.familyService.refreshPendingInvitationsList();
      },
      error: (error) => {
        console.log(error.message);
        this.alertService.danger('Erro ao cancelar convite');
      },
    });
  }

  confirmCancelInvitation(invitedEmail: string) {
    this.confirmationModalService
      .show('Cancelar', 'Cancelar Convite?')
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          if (result) {
            this.cancelInvitation(invitedEmail);
          }
        },
      });
  }
}
