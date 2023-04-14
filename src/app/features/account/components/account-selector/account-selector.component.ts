import { AccountService } from './../../services/account.service';
import { Observable } from 'rxjs';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  forwardRef,
} from '@angular/core';
import { Account, Accounts } from '../../interfaces/account';
import { LayoutUtil } from 'src/app/shared/utils/layout/layout-util';
import { DefaultSizes } from './../../../../shared/utils/layout/default-sizes';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'account-selector',
  templateUrl: './account-selector.component.html',
  styleUrls: ['./account-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AccountSelectorComponent),
      multi: true,
    },
  ],
})
export class AccountSelectorComponent implements OnInit, ControlValueAccessor {
  @Input() selectedId = 0;
  @Input() size = DefaultSizes.MEDIUM;
  @Output() selectedAccountEvent = new EventEmitter<Account>();

  accountList$!: Observable<Accounts>;
  layoutUtil = new LayoutUtil();
  disabled = false;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountList$ = this.accountService.getList({});
  }

  private onChange!: (_: any) => void;
  private onTouched!: () => void;

  writeValue(value: any): void {
    this.selectedId = value;
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onAccountSelected(id: number) {
    if (this.onChange) this.onChange(id);
    if (this.onTouched) this.onTouched();

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
