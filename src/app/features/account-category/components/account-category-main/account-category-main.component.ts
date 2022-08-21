import { Component, OnInit } from '@angular/core';
import { CrudStateService } from './../../../../shared/services/crud-state.service';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-account-category-main',
  templateUrl: './account-category-main.component.html',
  styleUrls: ['./account-category-main.component.scss'],
})
export class AccountCategoryMainComponent implements OnInit {
  faCirclePlus = faCirclePlus;
  constructor(private crudStateService: CrudStateService) {}

  ngOnInit(): void {}

  new() {
    this.crudStateService.create();
  }
}
