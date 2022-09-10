import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { AccountService } from './../../services/account.service';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { faPeopleGroup, faLock } from '@fortawesome/free-solid-svg-icons';
import { Account, Accounts } from './../../interfaces/account';
import { CrudStateService } from 'src/app/shared/services/crud-state.service';
import { AccountSearchParams } from '../../enums/accountSearchParams';
import { RouteUtil } from 'src/app/shared/utils/route/route-util';

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
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateSerchParameters();

        this.accountService.refreshList(
          RouteUtil.prepareRouteParams(this.activatedRoute, [])
        );
      }
    });
    this.refreshAccountList();
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

  refreshAccountList() {
    this.updateSerchParameters();

    this.accountList$ = this.accountService
      .getList(RouteUtil.prepareRouteParams(this.activatedRoute, []))
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

  show(account: Account) {
    this.crudStateService.show(account);
  }

  isMyAccount(account: Account): boolean {
    return this.accountService.isMyAccount(account);
  }

  getFamilyAccountsChanged(value: boolean) {
    const params = this.accountService.prepareRouteParams(this.activatedRoute, {
      getFamilyAccounts: value,
    });
    this.accountService.refreshList(params);

    const qs = RouteUtil.formatRouteParams(params);
    this.router.navigate(['/account', qs]);
  }

  getInactiveAccountsChanged(value: boolean) {
    const params = this.accountService.prepareRouteParams(this.activatedRoute, {
      getInactiveAccounts: value,
    });
    this.accountService.refreshList(params);

    const qs = RouteUtil.formatRouteParams(params);
    this.router.navigate(['/account', qs]);
  }
}
