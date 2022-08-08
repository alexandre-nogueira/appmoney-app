import { AccountCategoryService } from './account-category.service';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { UpdateState } from 'src/app/shared/enums/UpdateState';
import { AccountCategory } from '../interfaces/account-category';

@Injectable({
  providedIn: 'root',
})
export class AccountCategoryStateService {
  state$: Subject<UpdateState> = new Subject();
  accountCategory$: Subject<AccountCategory> = new Subject();

  constructor(private accountCategoryService: AccountCategoryService) {}

  getState() {
    return this.state$.asObservable();
  }

  getAccountCategory() {
    return this.accountCategory$.asObservable();
  }

  create() {
    // let accountCategroy!: AccountCategory;
    this.state$.next(UpdateState.CREATE);
    // this.accountCategory$.next(accountCategroy);
  }

  update(accountCategory: AccountCategory) {
    this.state$.next(UpdateState.UPDATE);
    this.accountCategory$.next(accountCategory);
  }

  show(accountCategory: AccountCategory) {
    this.state$.next(UpdateState.SHOW);
    this.accountCategory$.next(accountCategory);
  }
}
