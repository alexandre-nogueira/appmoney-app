import { AccountCategoryService } from './account-category.service';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { UpdateState } from 'src/app/shared/enums/UpdateState';
import { AccountCategory } from '../interfaces/account-category';
import { AccountCategoryState } from '../interfaces/account-category-state';

@Injectable({
  providedIn: 'root',
})
export class AccountCategoryStateService {
  state$: Subject<UpdateState> = new Subject();
  accountCategory$: Subject<AccountCategory> = new Subject();
  accountCategoryState$: Subject<AccountCategoryState> = new Subject();

  constructor(private accountCategoryService: AccountCategoryService) {}

  getAccountCategoryState() {
    return this.accountCategoryState$.asObservable();
  }

  create() {
    this.accountCategoryState$.next({ state: UpdateState.CREATE });
  }

  update(accountCategory: AccountCategory) {
    this.accountCategoryState$.next({
      state: UpdateState.UPDATE,
      accountCategory: accountCategory,
    });
  }

  show(accountCategory: AccountCategory) {
    this.accountCategoryState$.next({
      state: UpdateState.SHOW,
      accountCategory: accountCategory,
    });
  }
}
