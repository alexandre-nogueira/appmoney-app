import { tap } from 'rxjs/operators';
import { FamilyService } from '../../services/family.service';
import { FamilyInvitation } from '../../interfaces/family-invitation';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-family-invitation',
  templateUrl: './family-invitation.component.html',
  styleUrls: ['./family-invitation.component.scss'],
})
export class FamilyInvitationComponent implements OnInit {
  token!: string;
  familyInvitation$!: Observable<FamilyInvitation>;
  resolved = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private familyService: FamilyService
  ) {}

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.params['token'];
    if (this.token) {
      this.familyInvitation$ = this.familyService
        .getMemberInvitation(this.token)
        .pipe(tap({ error: () => (this.resolved = true) }));
    }
  }
}
