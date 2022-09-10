import { UserService } from 'src/app/core/auth/user/user.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

import { environment } from './../../../../environments/environment';
import { Account, Accounts } from './../interfaces/account';
import { AccountSearchParams } from './../enums/accountSearchParams';
import { CrudService } from 'src/app/shared/interfaces/crud-service';
import { ActivatedRoute } from '@angular/router';

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

  refreshList(args: string[]): void {
    let httpParams: HttpParams = new HttpParams({
      fromObject: {
        getInactiveAccounts: false,
      },
    });
    let urlComplement = 'userAccounts';

    args.forEach((arg) => {
      const argument = JSON.parse(arg);
      Object.keys(argument).some((field) => {
        if (field === AccountSearchParams.getFamilyAccounts) {
          if (argument[field] === 'true') {
            urlComplement = 'familyAccounts';
          }
        }
        if (field === AccountSearchParams.getInactiveAccounts) {
          if (argument[field] === 'true') {
            httpParams = httpParams.set(
              AccountSearchParams.getInactiveAccounts,
              true
            );
          }
        }
      });
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

  getList(args: string[]): Observable<Accounts> {
    this.refreshList(args);
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

  public prepareRouteParams(activatedRoute: ActivatedRoute, params: any) {
    const retParams: string[] = [];

    //Preserve params of the activated route.
    Object.keys(activatedRoute.snapshot.params).some((key) => {
      if (Object.keys(params).filter((param) => param === key).length === 0) {
        retParams.push(`{"${key}": "${activatedRoute.snapshot.params[key]}"}`);
      }
    });

    //Add changed params.
    Object.keys(params).some((key) => {
      retParams.push(`{"${key}":"${params[key]}"}`);
    });

    return retParams;
  }
}
