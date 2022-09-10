import { ActivatedRoute } from '@angular/router';
import { RouteUtil } from 'src/app/shared/utils/route/route-util';
import { UserService } from './../../../../core/auth/user/user.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take, Observable } from 'rxjs';
import {
  faFloppyDisk,
  faPenToSquare,
  faPeopleGroup,
  faTrash,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import { AccountCategoryService } from './../../../account-category/services/account-category.service';
import { AccountService } from './../../services/account.service';
import { UpdateState } from 'src/app/shared/enums/UpdateState';
import { ScreenController } from 'src/app/shared/utils/screenControl/screen-controller';
import { Account } from '../../interfaces/account';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { ConfirmationModalService } from 'src/app/shared/components/confirmation-modal/confirmation-modal.service';
import { CrudStateService } from 'src/app/shared/services/crud-state.service';
import {
  AccountCategories,
  AccountCategory,
} from 'src/app/features/account-category/interfaces/account-category';
import { User } from 'src/app/core/auth/user/user';
import { AccountSearchParams } from '../../enums/accountSearchParams';

@Component({
  selector: 'account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss'],
})
export class AccountDetailComponent implements OnInit {
  state: UpdateState = UpdateState.CREATE;
  account!: Account;
  accountForm!: FormGroup;

  accountCategoryList$!: Observable<AccountCategories>;

  //Icons
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  faFloppyDisk = faFloppyDisk;
  faPeopleGroup = faPeopleGroup;
  faLock = faLock;

  @ViewChild('descriptionInput')
  descriptionInput!: ElementRef<HTMLInputElement>;

  screenController = new ScreenController([
    {
      fieldName: 'saveButton',
      values: [
        { state: UpdateState.CREATE, enable: true },
        { state: UpdateState.SHOW, enable: false },
        { state: UpdateState.UPDATE, enable: true },
      ],
    },
    {
      fieldName: 'editButton',
      values: [
        { state: UpdateState.CREATE, enable: false },
        { state: UpdateState.SHOW, enable: true },
        { state: UpdateState.UPDATE, enable: false },
      ],
    },
    {
      fieldName: 'deleteButton',
      values: [
        { state: UpdateState.CREATE, enable: false },
        { state: UpdateState.SHOW, enable: true },
        { state: UpdateState.UPDATE, enable: true },
      ],
    },
    {
      fieldName: 'description',
      values: [
        { state: UpdateState.CREATE, enable: true },
        { state: UpdateState.SHOW, enable: false },
        { state: UpdateState.UPDATE, enable: true },
      ],
    },
    {
      fieldName: 'accountCategory',
      values: [
        { state: UpdateState.CREATE, enable: true },
        { state: UpdateState.SHOW, enable: false },
        { state: UpdateState.UPDATE, enable: true },
      ],
    },
    {
      fieldName: 'privateAccount',
      values: [
        { state: UpdateState.CREATE, enable: true },
        { state: UpdateState.SHOW, enable: false },
        { state: UpdateState.UPDATE, enable: true },
      ],
    },
    {
      fieldName: 'active',
      values: [
        { state: UpdateState.CREATE, enable: true },
        { state: UpdateState.SHOW, enable: false },
        { state: UpdateState.UPDATE, enable: true },
      ],
    },
  ]);

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private confirmationModalService: ConfirmationModalService,
    private crudStateService: CrudStateService,
    private accountCategoryService: AccountCategoryService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.crudStateService.getState().subscribe({
      next: (stateManager) => {
        this.setState(stateManager.state, stateManager.entity);
      },
    });

    this.accountCategoryList$ = this.accountCategoryService.getList();

    this.accountForm = this.formBuilder.group({
      description: ['', Validators.required],
      accountCategory: ['', Validators.required],
      privateAccount: [true, Validators.required],
      active: [true, Validators.required],
    });
  }

  setState(state: UpdateState, account?: Account) {
    this.state = state;
    this.account = {};

    this.screenController.setEnabledStatus(
      this.accountForm,
      'description',
      this.state
    );
    this.screenController.setEnabledStatus(
      this.accountForm,
      'accountCategory',
      this.state
    );
    this.screenController.setEnabledStatus(
      this.accountForm,
      'privateAccount',
      this.state
    );
    this.screenController.setEnabledStatus(
      this.accountForm,
      'active',
      this.state
    );

    if (account) {
      this.account = account;
      this.accountForm.patchValue({
        description: account.description,
        accountCategory: account.accountCategory?.id,
        privateAccount: account.privateAccount,
        active: account.active,
      });
    }
    if (this.state === UpdateState.CREATE) {
      this.accountForm.reset();
      this.accountForm.patchValue({
        privateAccount: true,
        active: true,
      });
      this.descriptionInput.nativeElement.focus();
    }
  }

  setStateToUpdate() {
    this.crudStateService.update(this.account);
  }

  confirmDelete() {
    this.confirmationModalService
      .show(
        'Eliminar Conta',
        `Deseja realmente eliminar
        ${this.account.description}?`
      )
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          if (result) {
            this.delete();
          }
        },
      });
  }

  delete() {
    this.accountService.delete(this.account).subscribe({
      next: (data) => {
        this.alertService.success('Eliminado com sucesso.');
        this.crudStateService.create();
        this.refreshAccountList();
      },
      error: (error) => {
        this.alertService.danger('Erro ao eliminar agrupador');
        console.log(error);
      },
    });
  }

  createOrUpdate() {
    const description = this.accountForm.get('description')?.value ?? '';
    const accountCategoryId =
      this.accountForm.get('accountCategory')?.value ?? '';
    const privateAccount = this.accountForm.get('privateAccount')?.value ?? '';
    const active = this.accountForm.get('active')?.value ?? '';

    if (this.state === UpdateState.CREATE) {
      this.accountService
        .create({
          description: description,
          accountCategoryId: accountCategoryId,
          privateAccount: privateAccount,
        })
        .subscribe({
          next: (data) => {
            this.alertService.success('Agrupador criado com sucesso.');
            this.crudStateService.create();
            this.refreshAccountList();
          },
          error: (error) => {
            this.alertService.danger('Erro ao criar agrupador');
            console.log(error);
          },
        });
    } else if (this.state === UpdateState.UPDATE) {
      this.accountService
        .edit({
          id: this.account.id,
          description: description,
          accountCategoryId: accountCategoryId,
          privateAccount: privateAccount,
          active: active,
        })
        .subscribe({
          next: (data) => {
            this.alertService.success('Agrupador alterado com sucesso.');
            this.crudStateService.create();
            this.refreshAccountList();
          },
          error: (error) => {
            this.alertService.danger('Erro ao alterar agrupador');
            console.log(error);
          },
        });
    }
  }

  refreshAccountList() {
    this.accountService.refreshList(
      RouteUtil.prepareRouteParams(this.activatedRoute, [])
    );
  }

  getBabdgeUserBgColor(account: Account): string {
    if (account.user) {
      if (this.accountService.isMyAccount(account)) {
        return 'bg-primary';
      } else {
        return 'bg-secondary';
      }
    }
    return '';
  }

  isMyAccount(account?: Account): boolean {
    if (account) {
      return this.accountService.isMyAccount(account);
    }
    return false;
  }
}
