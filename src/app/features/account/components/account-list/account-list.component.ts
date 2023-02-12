import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { faPeopleGroup, faLock } from '@fortawesome/free-solid-svg-icons';
import { Account, Accounts } from './../../interfaces/account';
import { CrudStateService } from 'src/app/shared/services/crud-state.service';
import { AccountSearchParams } from '../../enums/accountSearchParams';
import { RouteUtil } from 'src/app/shared/utils/route/route-util';
import { AccountService } from './../../services/account.service';

@Component({
  selector: 'account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
})
export class AccountListComponent implements OnInit {
  accountList$!: Observable<Accounts>;
  resolved = false;
  faPeopleGroup = faPeopleGroup;
  faLock = faLock;
  filterText!: string;

  getFamilyAccounts = false;
  getInactiveAccounts = false;

  constructor(
    private accountService: AccountService,
    private crudStateService: CrudStateService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getInitialAccountList();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateSerchParameters();

        this.accountService.refreshList(
          // RouteUtil.prepareQSParams(this.activatedRoute.snapshot.params, [])
          this.activatedRoute.snapshot.params
        );
      }
    });
  }

  getInitialAccountList() {
    this.updateSerchParameters();

    this.accountList$ = this.accountService
      .getList(
        // RouteUtil.prepareQSParams(this.activatedRoute.snapshot.params, [])
        this.activatedRoute.snapshot.params
      )
      .pipe(
        tap({
          next: () => {
            this.resolved = true;
          },
          complete: () => {
            this.resolved = true;
          },
          error: () => {
            this.resolved = true;
          },
        })
      );
  }

  updateSerchParameters() {
    //Get route params
    const getFamilyAccountsParam =
      this.activatedRoute.snapshot.params[
        AccountSearchParams.getFamilyAccounts
      ];
    const getInactiveAccountsParam =
      this.activatedRoute.snapshot.params[
        AccountSearchParams.getInactiveAccounts
      ];

    if (getInactiveAccountsParam === 'true') {
      this.getInactiveAccounts = true;
    } else {
      this.getInactiveAccounts = false;
    }

    if (getFamilyAccountsParam === 'true') {
      this.getFamilyAccounts = true;
    } else {
      this.getFamilyAccounts = false;
    }
  }

  show(account: Account) {
    this.crudStateService.show(account);
  }

  isMyAccount(account: Account): boolean {
    return this.accountService.isMyAccount(account);
  }

  getFamilyAccountsChanged(value: boolean) {
    const newParams = RouteUtil.prepareQSParams(
      this.activatedRoute.snapshot.params,
      {
        [AccountSearchParams.getFamilyAccounts]: value,
      }
    );
    this.accountService.refreshList(newParams);

    this.router.navigate(['/account', newParams]);
  }

  getInactiveAccountsChanged(value: boolean) {
    const newParams = RouteUtil.prepareQSParams(
      this.activatedRoute.snapshot.params,
      {
        [AccountSearchParams.getInactiveAccounts]: value,
      }
    );

    this.accountService.refreshList(newParams);

    this.router.navigate(['/account', newParams]);
  }
}
