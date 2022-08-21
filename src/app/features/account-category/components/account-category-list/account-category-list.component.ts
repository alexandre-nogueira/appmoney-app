import { Observable, tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { CrudStateService } from './../../../../shared/services/crud-state.service';
import { AccountCategoryService } from './../../services/account-category.service';
import {
  AccountCategories,
  AccountCategory,
} from '../../interfaces/account-category';

@Component({
  selector: 'account-category-list',
  templateUrl: './account-category-list.component.html',
  styleUrls: ['./account-category-list.component.scss'],
})
export class AccountCategoryListComponent implements OnInit {
  accountCategoryList$!: Observable<AccountCategories>;
  resolved = false;
  faCirclePlus = faCirclePlus;
  filterText!: string;

  constructor(
    private accountCategoryService: AccountCategoryService,
    private crudStateService: CrudStateService
  ) {}

  ngOnInit(): void {
    this.accountCategoryList$ = this.accountCategoryService.getList().pipe(
      tap({
        error: () => (this.resolved = true),
        complete: () => (this.resolved = true),
      })
    );
  }

  new() {
    this.crudStateService.create();
  }

  show(accountCategory: AccountCategory) {
    this.crudStateService.show(accountCategory);
  }
}
