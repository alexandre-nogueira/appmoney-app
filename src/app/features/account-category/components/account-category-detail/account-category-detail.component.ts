import { ConfirmationModalService } from './../../../../shared/components/confirmation-modal/confirmation-modal.service';
import { ScreenController } from './../../../../shared/utils/screenControl/screen-controller';
import { AlertService } from './../../../../shared/components/alert/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  faPenToSquare,
  faTrash,
  faFloppyDisk,
} from '@fortawesome/free-solid-svg-icons';
import { UpdateState } from './../../../../shared/enums/UpdateState';
import { AccountCategoryStateService } from './../../services/account-category-state.service';
import { AccountCategoryService } from './../../services/account-category.service';
import { Component, OnInit } from '@angular/core';
import { AccountCategory } from '../../interfaces/account-category';
import { take } from 'rxjs/operators';

@Component({
  selector: 'account-category-detail',
  templateUrl: './account-category-detail.component.html',
  styleUrls: ['./account-category-detail.component.scss'],
})
export class AccountCategoryDetailComponent implements OnInit {
  state: UpdateState = UpdateState.CREATE;
  stateDescription = 'Create';
  accountCategory!: AccountCategory;
  accountCategoryForm!: FormGroup;
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  faFloppyDisk = faFloppyDisk;

  descriptionEnabled = true;

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
  ]);

  constructor(
    private accountCategoryService: AccountCategoryService,
    private accountCategoryStateService: AccountCategoryStateService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private confirmationModalService: ConfirmationModalService
  ) {}

  ngOnInit(): void {
    this.accountCategoryStateService.getState().subscribe({
      next: (state) => this.setState(state),
    });
    this.accountCategoryStateService.getAccountCategory().subscribe({
      next: (accountCategory) => {
        this.accountCategory = accountCategory;
        this.accountCategoryForm.patchValue({
          description: accountCategory.description,
        });
      },
    });

    this.accountCategoryForm = this.formBuilder.group({
      description: [
        { value: '', disabled: !this.descriptionEnabled },
        Validators.required,
      ],
    });
  }

  setState(state: UpdateState) {
    this.state = state;
    this.screenController.setEnabledStatus(
      this.accountCategoryForm,
      'description',
      this.state
    );
    // this.setEnabledStatus('description', this.state);
    if (this.state === UpdateState.CREATE) {
      this.accountCategoryForm.reset();
    }
  }

  setStateToUpdate() {
    this.setState(UpdateState.UPDATE);
  }

  delete() {
    this.accountCategoryService.delete(this.accountCategory).subscribe({
      next: (data) => {
        this.alertService.success('Eliminado com sucesso.');
        this.accountCategoryStateService.create();
        this.accountCategoryService.refreshList();
      },
      error: (error) => {
        this.alertService.danger('Erro ao eliminar categoria de conta');
        console.log(error);
      },
    });
  }

  confirmDelete() {
    this.confirmationModalService
      .show(
        'Eliminar Categoria de Conta',
        `Deseja realmente eliminar
        ${this.accountCategory.description}?`
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

  createOrUpdate() {
    const description =
      this.accountCategoryForm.get('description')?.value ?? '';
    if (this.state === UpdateState.CREATE) {
      this.accountCategoryService.create(description).subscribe({
        next: (data) => {
          this.alertService.success('Criado com sucesso.');
          this.accountCategoryStateService.create();
          this.accountCategoryService.refreshList();
        },
        error: (error) => {
          this.alertService.danger('Erro ao criar categoria de conta');
          console.log(error);
        },
      });
    } else if (this.state === UpdateState.UPDATE) {
      const accountCategoryForUpdate: AccountCategory = {
        id: this.accountCategory.id,
        description: description,
        familyId: this.accountCategory.familyId,
      };

      this.accountCategoryService.edit(accountCategoryForUpdate).subscribe({
        next: (data) => {
          this.alertService.success('Alterado com sucesso.');
          this.accountCategoryStateService.create();
          this.accountCategoryService.refreshList();
        },
        error: (error) => {
          this.alertService.danger('Erro ao alterar categoria de conta');
          console.log(error);
        },
      });
    }
  }
}
