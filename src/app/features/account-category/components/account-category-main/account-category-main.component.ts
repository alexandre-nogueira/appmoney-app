import { Component, OnInit } from '@angular/core';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { AccountCategoryStateService } from '../../services/account-category-state.service';
@Component({
  selector: 'app-account-category-main',
  templateUrl: './account-category-main.component.html',
  styleUrls: ['./account-category-main.component.scss'],
})
export class AccountCategoryMainComponent implements OnInit {
  faCirclePlus = faCirclePlus;
  constructor(
    private accountCategoryStateService: AccountCategoryStateService
  ) {}

  ngOnInit(): void {}

  new() {
    this.accountCategoryStateService.create();
  }
}
