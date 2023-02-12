import { UserService } from 'src/app/core/auth/user/user.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { environment } from './../../../../environments/environment';
import { Account, Accounts } from './../interfaces/account';
import { AccountSearchParams } from './../enums/accountSearchParams';
import { CrudService } from 'src/app/shared/interfaces/crud-service';
import { ActivatedRoute, Params } from '@angular/router';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class AccountService implements CrudService {
  private _accounts$: Subject<Accounts> = new Subject();

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {}

  refreshList(params: Params): void {
    let httpParams = new HttpParams();
    let urlComplement = 'userAccounts';

    Object.keys(params).some((field) => {
      if (field === AccountSearchParams.getFamilyAccounts) {
        if (params[field] === 'true') {
          urlComplement = 'familyAccounts';
        }
      }
      if (field === AccountSearchParams.getInactiveAccounts) {
        httpParams = httpParams.set(
          AccountSearchParams.getInactiveAccounts,
          params[field]
        );
      }
    });

    this.httpClient
      .get<Accounts>(`${API}/account/${urlComplement}`, {
        params: httpParams,
      })
      .subscribe({
        next: (accounts) => {
          this._accounts$.next(accounts);
        },
        error: (error) => console.log(error),
      });
  }

  getList(params: Params): Observable<Accounts> {
    this.refreshList(params);
    return this._accounts$.asObservable();
  }

  getSingle(id: number): Observable<Account> {
    return this.httpClient.get<Account>(`${API}/account/${id}`);
  }

  create(account: Account): Observable<Account> {
    return this.httpClient.post<Account>(`${API}/account`, {
      description: account.description,
      accountCategoryId: account.accountCategoryId,
      privateAccount: account.privateAccount,
    });
  }

  edit(account: Account): Observable<Account> {
    return this.httpClient.patch<Account>(`${API}/account/${account.id}`, {
      description: account.description,
      accountCategoryId: account.accountCategoryId,
      privateAccount: account.privateAccount,
      active: account.active,
    });
  }

  delete(account: Account): Observable<Account> {
    return this.httpClient.delete<Account>(`${API}/account/${account.id}`);
  }

  isMyAccount(account: Account): boolean {
    if (account.user) {
      return account.user.id === this.userService.getUserData()?.id;
    }
    return false;
  }
}
