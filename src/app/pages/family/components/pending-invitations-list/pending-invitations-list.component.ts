import {
  FamilyInvitation,
  FamilyInvitations,
} from './../../interfaces/family-invitation';
import { Observable, tap } from 'rxjs';
import { FamilyService } from './../../services/family.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pending-invitations-list',
  templateUrl: './pending-invitations-list.component.html',
  styleUrls: ['./pending-invitations-list.component.scss'],
})
export class PendingInvitationsListComponent implements OnInit {
  pendingInvitations$!: Observable<FamilyInvitations>;
  resolved = false;

  constructor(private familyService: FamilyService) {}

  ngOnInit(): void {
    this.pendingInvitations$ = this.familyService.getPendingInvitations().pipe(
      tap({
        error: () => (this.resolved = true),
        complete: () => (this.resolved = true),
      })
    );
  }
}
