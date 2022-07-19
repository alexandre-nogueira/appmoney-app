import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FamilyMember } from './../../interfaces/family-member';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss'],
})
export class MemberDetailComponent implements OnInit {
  @Input() familyMember!: FamilyMember;
  faUser = faUserCircle;
  constructor() {}

  ngOnInit(): void {}
}
