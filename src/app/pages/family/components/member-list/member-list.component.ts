import { FamilyMember } from './../../interfaces/family-member';
import { Component, OnInit } from '@angular/core';
import { FamilyService } from '../../services/family.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent implements OnInit {
  membersList$!: Observable<FamilyMember[]>;
  resolved = false;

  constructor(private familyService: FamilyService) {}

  ngOnInit(): void {
    this.membersList$ = this.familyService
      .getMembers()
      .pipe(
        tap({
          error: () => (this.resolved = true),
          complete: () => (this.resolved = true),
        })
      );
  }
}
