import { Params } from '@angular/router';
import { UpdateState } from './../../../../shared/enums/UpdateState';
import { CrudStateService } from 'src/app/shared/services/crud-state.service';
import { ConfirmationModalService } from 'src/app/shared/components/confirmation-modal/confirmation-modal.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostingService } from './../../services/posting.service';
import { Posting } from './../../interfaces/posting';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  faDollarSign,
  faFloppyDisk,
  faPenToSquare,
  faRotateLeft,
  faTrash,
  faTrashArrowUp,
} from '@fortawesome/free-solid-svg-icons';
import { ScreenController } from 'src/app/shared/utils/screenControl/screen-controller';
import { FieldType } from 'src/app/shared/enums/FieldType';
import { take } from 'rxjs/operators';
import { PostingStatus } from '../../enums/posting-status';
import { Natures } from 'src/app/shared/enums/Nature';
import { PostingCategory } from 'src/app/features/posting-category/interfaces/posting-category';

@Component({
  selector: 'posting-detail',
  templateUrl: './posting-detail.component.html',
  styleUrls: ['./posting-detail.component.scss'],
})
export class PostingDetailComponent implements OnInit {
  state: UpdateState = UpdateState.CREATE;
  posting!: Posting;
  postingForm!: FormGroup;
  postingStatus = PostingStatus;
  title = 'Lançamento';
  tittleClass = 'modal-header';

  @Input() routeParams!: Params;

  //Icons
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  faFloppyDisk = faFloppyDisk;
  faDollarSign = faDollarSign;
  faRotateLeft = faRotateLeft;
  faTrashArrowUP = faTrashArrowUp;

  @ViewChild('descriptionInput')
  descriptionInput!: ElementRef<HTMLInputElement>;

  screenController = new ScreenController([
    {
      fieldName: 'saveButton',
      fieldType: FieldType.BUTTON,
      values: [
        { state: UpdateState.CREATE, enable: true },
        { state: UpdateState.SHOW, enable: false },
        { state: UpdateState.UPDATE, enable: true },
      ],
    },
    {
      fieldName: 'editButton',
      fieldType: FieldType.BUTTON,
      values: [
        { state: UpdateState.CREATE, enable: false },
        { state: UpdateState.SHOW, enable: true },
        { state: UpdateState.UPDATE, enable: false },
      ],
    },
    {
      fieldName: 'restoreButton',
      fieldType: FieldType.BUTTON,
      values: [
        { state: UpdateState.CREATE, enable: false },
        { state: UpdateState.SHOW, enable: true },
        { state: UpdateState.UPDATE, enable: true },
      ],
    },
    {
      fieldName: 'deleteButton',
      fieldType: FieldType.BUTTON,
      values: [
        { state: UpdateState.CREATE, enable: false },
        { state: UpdateState.SHOW, enable: true },
        { state: UpdateState.UPDATE, enable: true },
      ],
    },
    {
      fieldName: 'description',
      fieldType: FieldType.INPUT,
      values: [
        { state: UpdateState.CREATE, enable: true },
        { state: UpdateState.SHOW, enable: false },
        { state: UpdateState.UPDATE, enable: true },
      ],
    },
    {
      fieldName: 'value',
      fieldType: FieldType.INPUT,
      values: [
        { state: UpdateState.CREATE, enable: true },
        { state: UpdateState.SHOW, enable: false },
        { state: UpdateState.UPDATE, enable: true },
      ],
    },
    {
      fieldName: 'postingCategoryId',
      fieldType: FieldType.INPUT,
      values: [
        { state: UpdateState.CREATE, enable: true },
        { state: UpdateState.SHOW, enable: false },
        { state: UpdateState.UPDATE, enable: true },
      ],
    },
    {
      fieldName: 'postingGroupId',
      fieldType: FieldType.INPUT,
      values: [
        { state: UpdateState.CREATE, enable: true },
        { state: UpdateState.SHOW, enable: false },
        { state: UpdateState.UPDATE, enable: true },
      ],
    },
    {
      fieldName: 'dueDate',
      fieldType: FieldType.INPUT,
      values: [
        { state: UpdateState.CREATE, enable: true },
        { state: UpdateState.SHOW, enable: false },
        { state: UpdateState.UPDATE, enable: true },
      ],
    },
    {
      fieldName: 'paymentDate',
      fieldType: FieldType.INPUT,
      values: [
        { state: UpdateState.CREATE, enable: true },
        { state: UpdateState.SHOW, enable: false },
        { state: UpdateState.UPDATE, enable: true },
      ],
    },
    {
      fieldName: 'accountId',
      fieldType: FieldType.INPUT,
      values: [
        { state: UpdateState.CREATE, enable: true },
        { state: UpdateState.SHOW, enable: false },
        { state: UpdateState.UPDATE, enable: true },
      ],
    },
    {
      fieldName: 'status',
      fieldType: FieldType.INPUT,
      values: [
        { state: UpdateState.CREATE, enable: false },
        { state: UpdateState.SHOW, enable: false },
        { state: UpdateState.UPDATE, enable: false },
      ],
    },
  ]);

  constructor(
    public activeModal: NgbActiveModal,
    private postingService: PostingService,
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

    this.postingForm = this.formBuilder.group({
      description: ['', Validators.required],
      value: ['', Validators.required],
      postingCategoryId: ['0'],
      postingGroupId: ['0'],
      dueDate: ['', Validators.required],
      paymentDate: [''],
      accountId: ['', Validators.required],
      status: [''],
    });
  }

  setState(state: UpdateState, posting?: Posting) {
    this.state = state;
    this.posting = {};

    this.screenController.setEnabledStatus(
      this.postingForm,
      this.screenController.getFieldControl(),
      this.state
    );

    if (this.state === UpdateState.CREATE) {
      this.postingForm.reset();
    } else if (
      this.state === UpdateState.UPDATE ||
      this.state === UpdateState.SHOW
    ) {
      this.posting = posting ?? {};
      this.postingForm.patchValue({
        description: posting?.description,
        value: posting?.value,
        postingCategoryId: posting?.postingCategoryId
          ? posting?.postingCategoryId
          : 0,
        postingGroupId: posting?.postingGroupId ? posting?.postingGroupId : 0,
        dueDate: posting?.dueDate,
        paymentDate: posting?.paymentDate,
        accountId: posting?.accountId,
      });
      this.setTitleDetais(this.posting.postingCategory?.nature);
    }
  }

  setStateToUpdate() {
    this.crudStateService.update(this.posting);
    this.descriptionInput.nativeElement.focus();
  }

  close() {
    if (this.state === UpdateState.SHOW) {
      this.activeModal.dismiss();
    } else {
      this.confirmationModalService
        .show(
          'Fechar',
          'As informações não salvas serão perdidas, deseja realmente fechar?'
        )
        .pipe(take(1))
        .subscribe({
          next: (result) => {
            if (result) {
              this.activeModal.dismiss();
            }
          },
        });
    }
  }

  createOrUpdate() {
    this.posting.value = this.postingForm.get('value')?.value ?? 0;
    this.posting.description = this.postingForm.get('description')?.value ?? '';
    this.posting.postingCategoryId =
      this.postingForm.get('postingCategoryId')?.value ?? 0;

    this.posting.postingGroupId =
      this.postingForm.get('postingGroupId')?.value ?? 0;
    this.posting.dueDate = this.postingForm.get('dueDate')?.value ?? undefined;
    this.posting.paymentDate =
      this.postingForm.get('paymentDate')?.value ?? undefined;
    this.posting.accountId = this.postingForm.get('accountId')?.value ?? 0;

    if (this.state === UpdateState.CREATE) {
      this.postingService.create(this.posting).subscribe({
        next: () => {
          this.alertService.success('Lançamento criado com sucesso!');
          this.postingService.refreshList(this.routeParams);
          // console.log(this.routeParams);
          this.activeModal.dismiss();
        },
        error: (error) => {
          this.alertService.danger('Erro ao criar lançamento');
          console.log(error);
        },
      });
    } else if (this.state === UpdateState.UPDATE) {
      this.postingService.edit(this.posting).subscribe({
        next: () => {
          this.alertService.success('Lançamento alterado com sucesso');
          this.postingService.refreshList(this.routeParams);
          this.activeModal.dismiss();
        },
        error: (error) => {
          this.alertService.danger('Erro ao alterar lançamento');
          console.log(error);
        },
      });
    }
  }
  confirmDelete() {
    this.confirmationModalService
      .show(
        'Eliminar Lançamento',
        `Deseja realmente eliminar
      ${this.posting.description}?`
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
    this.postingService.delete(this.posting).subscribe({
      next: () => {
        this.alertService.success('Lançamento eliminado com sucesso');
        this.postingService.refreshList(this.routeParams);
        this.activeModal.close();
      },
      error: (error) => {
        this.alertService.danger('Erro ao eliminar lançamento');
        console.log(error);
      },
    });
  }

  confirmRestore() {
    this.confirmationModalService
      .show(
        'Reativar lançamento',
        `Deseja reativar o lançamento?${this.posting.description}`
      )
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          if (result) {
            this.restore();
          }
        },
      });
  }

  restore() {
    this.postingService.restore(this.posting).subscribe({
      next: (updatedPosting) => {
        this.alertService.success('Lançamento reativado.');
        this.postingService.refreshList(this.routeParams);
        // this.posting.status = updatedPosting.status;
        console.log(updatedPosting);

        this.crudStateService.update(updatedPosting);
      },
      error: (error) => {
        this.alertService.danger('Erro ao reativar lançamento');
        console.log(error);
      },
    });
  }

  postingCategorySelected(postingCategory: PostingCategory) {
    this.setTitleDetais(postingCategory.nature);
  }

  setTitleDetais(nature?: Natures) {
    if (nature === Natures.REVENUE) {
      this.tittleClass = 'modal-header bg-success bg-opacity-75 text-white';
      this.title = 'Receita';
    } else if (nature === Natures.EXPENSE) {
      this.tittleClass = 'modal-header bg-danger bg-opacity-75 text-white';
      this.title = 'Despesa';
    } else {
      this.tittleClass = 'modal-header';
      this.title = 'Lançamento';
    }
  }
}
