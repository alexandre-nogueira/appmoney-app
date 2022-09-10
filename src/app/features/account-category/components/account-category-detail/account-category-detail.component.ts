import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { UpdateState } from './../../../../shared/enums/UpdateState';
import { AccountCategoryService } from './../../services/account-category.service';
import { AccountCategory } from '../../interfaces/account-category';
import { CrudStateService } from './../../../../shared/services/crud-state.service';
import { ConfirmationModalService } from './../../../../shared/components/confirmation-modal/confirmation-modal.service';
import { ScreenController } from './../../../../shared/utils/screenControl/screen-controller';
import { AlertService } from './../../../../shared/components/alert/alert.service';
import {
  faPenToSquare,
  faTrash,
  faFloppyDisk,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'account-category-detail',
  templateUrl: './account-category-detail.component.html',
  styleUrls: ['./account-category-detail.component.scss'],
})
export class AccountCategoryDetailComponent implements OnInit {
  state: UpdateState = UpdateState.CREATE;
  accountCategory!: AccountCategory;
  accountCategoryForm!: FormGroup;
  descriptionEnabled = true;

  //Icons
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  faFloppyDisk = faFloppyDisk;

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
  ]);

  constructor(
    private accountCategoryService: AccountCategoryService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private confirmationModalService: ConfirmationModalService,
    private crudStateService: CrudStateService
  ) {}

  ngOnInit(): void {
    this.crudStateService.getState().subscribe({
      next: (stateManager) => {
        this.setState(stateManager.state, stateManager.entity);
      },
    });

    this.accountCategoryForm = this.formBuilder.group({
      description: [
        { value: '', disabled: !this.descriptionEnabled },
        Validators.required,
      ],
    });
  }

  setState(state: UpdateState, accountCategory?: AccountCategory) {
    this.state = state;
    this.screenController.setEnabledStatus(
      this.accountCategoryForm,
      'description',
      this.state
    );
    if (accountCategory) {
      this.accountCategory = accountCategory;
      this.accountCategoryForm.patchValue({
        description: accountCategory.description,
      });
    }
    if (this.state === UpdateState.CREATE) {
      this.accountCategoryForm.reset();
      this.descriptionInput.nativeElement.focus();
    }
  }

  setStateToUpdate() {
    this.crudStateService.update(this.accountCategory);
  }

  delete() {
    this.accountCategoryService.delete(this.accountCategory).subscribe({
      next: (data) => {
        this.alertService.success('Eliminado com sucesso.');
        this.crudStateService.create();
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
      this.accountCategoryService
        .create({ description: description })
        .subscribe({
          next: () => {
            this.alertService.success('Criado com sucesso.');
            this.crudStateService.create();
            this.accountCategoryService.refreshList();
          },
          error: (error) => {
            this.alertService.danger('Erro ao criar categoria de conta');
            console.log(error);
          },
        });
    } else if (this.state === UpdateState.UPDATE) {
      this.accountCategoryService
        .edit({
          id: this.accountCategory.id,
          description: description,
          familyId: this.accountCategory.familyId,
        })
        .subscribe({
          next: () => {
            this.alertService.success('Alterado com sucesso.');
            this.crudStateService.create();
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
