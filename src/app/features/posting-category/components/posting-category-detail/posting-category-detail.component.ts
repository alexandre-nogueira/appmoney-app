import { PostingCategoryService } from './../../services/posting-category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UpdateState } from 'src/app/shared/enums/UpdateState';
import { PostingCategory } from '../../interfaces/posting-category';
import {
  faFloppyDisk,
  faPenToSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { ScreenController } from 'src/app/shared/utils/screenControl/screen-controller';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { ConfirmationModalService } from 'src/app/shared/components/confirmation-modal/confirmation-modal.service';
import { CrudStateService } from 'src/app/shared/services/crud-state.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'posting-category-detail',
  templateUrl: './posting-category-detail.component.html',
  styleUrls: ['./posting-category-detail.component.scss'],
})
export class PostingCategoryDetailComponent implements OnInit {
  state: UpdateState = UpdateState.CREATE;
  postingCategory!: PostingCategory;
  postingCategoryForm!: FormGroup;
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
    private postingCategoryService: PostingCategoryService,
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

    this.postingCategoryForm = this.formBuilder.group({
      description: [
        { value: '', disabled: !this.descriptionEnabled },
        Validators.required,
      ],
    });
  }

  setState(state: UpdateState, postingCategory?: PostingCategory) {
    this.state = state;
    this.screenController.setEnabledStatus(
      this.postingCategoryForm,
      'description',
      this.state
    );
    if (postingCategory) {
      this.postingCategory = postingCategory;
      this.postingCategoryForm.patchValue({
        description: postingCategory.description,
      });
    }
    if (this.state === UpdateState.CREATE) {
      this.postingCategoryForm.reset();
      this.descriptionInput.nativeElement.focus();
    }
  }

  setStateToUpdate() {
    this.crudStateService.update(this.postingCategory);
  }

  confirmDelete() {
    this.confirmationModalService
      .show(
        'Eliminar cagegoria',
        `Deseja realmente eliminar
        ${this.postingCategory.description}?`
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
    this.postingCategoryService.delete(this.postingCategory).subscribe({
      next: () => {
        this.alertService.success('Eliminado com sucesso.');
        this.crudStateService.create();
        this.postingCategoryService.refreshList();
      },
      error: (error) => {
        this.alertService.danger('Erro ao eliminar agrupador');
        console.log(error);
      },
    });
  }

  createOrUpdate() {
    const description =
      this.postingCategoryForm.get('description')?.value ?? '';
    if (this.state === UpdateState.CREATE) {
      this.postingCategoryService
        .create({ description: description })
        .subscribe({
          next: () => {
            this.alertService.success('Categoria criada com sucesso.');
            this.crudStateService.create();
            this.postingCategoryService.refreshList();
          },
          error: (error) => {
            this.alertService.danger('Erro ao criar categoria');
            console.log(error);
          },
        });
    } else if (this.state === UpdateState.UPDATE) {
      this.postingCategoryService
        .edit({
          id: this.postingCategory.id,
          description: description,
          familyId: this.postingCategory.familyId,
        })
        .subscribe({
          next: () => {
            this.alertService.success('Categoria alterada com sucesso.');
            this.crudStateService.create();
            this.postingCategoryService.refreshList();
          },
          error: (error) => {
            this.alertService.danger('Erro ao alterar categoria');
            console.log(error);
          },
        });
    }
  }
}
