import { AccountService } from './../../services/account.service';
import { Observable } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Account, Accounts } from '../../interfaces/account';

@Component({
  selector: 'account-selector',
  templateUrl: './account-selector.component.html',
  styleUrls: ['./account-selector.component.scss'],
})
export class AccountSelectorComponent implements OnInit {
  @Input() selectedId = 0;
  @Output() selectedAccountEvent = new EventEmitter<Account>();

  accountList$!: Observable<Accounts>;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountList$ = this.accountService.getList({});
  }

  onAccountSelected(id: number) {
    if (id == 0) {
      this.selectedAccountEvent.emit({ id: 0 });
    } else {
      this.accountService.getSingle(id).subscribe({
        next: (account) => {
          this.selectedAccountEvent.emit(account);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
