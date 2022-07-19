import { FamilyService } from './../../services/family.service';
import { Component, OnInit } from '@angular/core';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-family-management',
  templateUrl: './family-management.component.html',
  styleUrls: ['./family-management.component.scss'],
})
export class FamilyManagementComponent implements OnInit {
  faCirclePlus = faCirclePlus;
  constructor(private familyService: FamilyService) {}

  ngOnInit(): void {}

  invite() {
    this.familyService.openCreateDialog();
  }
}
