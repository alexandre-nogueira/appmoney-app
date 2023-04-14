import { PostingGroup } from './../../interfaces/posting-group';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateState } from 'src/app/shared/enums/UpdateState';
import { PostingGroupService } from './../../services/posting-group.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { ConfirmationModalService } from 'src/app/shared/components/confirmation-modal/confirmation-modal.service';
import { CrudStateService } from 'src/app/shared/services/crud-state.service';
import {
  faFloppyDisk,
  faPenToSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { ScreenController } from 'src/app/shared/utils/screenControl/screen-controller';
import { take } from 'rxjs';
import { FieldType } from 'src/app/shared/enums/FieldType';

@Component({
  selector: 'posting-group-detail',
  templateUrl: './posting-group-detail.component.html',
  styleUrls: ['./posting-group-detail.component.scss'],
})
export class PostingGroupDetailComponent implements OnInit {
  state: UpdateState = UpdateState.CREATE;
  postingGroup!: PostingGroup;
  postingGroupForm!: FormGroup;
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
  ]);

  constructor(
    private postingGroupService: PostingGroupService,
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

    this.postingGroupForm = this.formBuilder.group({
      description: [
        { value: '', disabled: !this.descriptionEnabled },
        Validators.required,
      ],
    });
  }

  setState(state: UpdateState, postingGroup?: PostingGroup) {
    this.state = state;
    this.screenController.setEnabledStatus(
      this.postingGroupForm,
      this.screenController.getFieldControl(),
      this.state
    );
    if (postingGroup) {
      this.postingGroup = postingGroup;
      this.postingGroupForm.patchValue({
        description: postingGroup.description,
      });
    }
    if (this.state === UpdateState.CREATE) {
      this.postingGroupForm.reset();
      this.descriptionInput.nativeElement.focus();
    }
  }

  setStateToUpdate() {
    this.crudStateService.update(this.postingGroup);
  }

  confirmDelete() {
    this.confirmationModalService
      .show(
        'Eliminar Agrupador',
        `Deseja realmente eliminar
        ${this.postingGroup.description}?`
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
    this.postingGroupService.delete(this.postingGroup).subscribe({
      next: (data) => {
        this.alertService.success('Eliminado com sucesso.');
        this.crudStateService.create();
        this.postingGroupService.refreshList();
      },
      error: (error) => {
        this.alertService.danger('Erro ao eliminar agrupador');
        console.log(error);
      },
    });
  }

  createOrUpdate() {
    const description = this.postingGroupForm.get('description')?.value ?? '';

    if (this.state === UpdateState.CREATE) {
      this.postingGroupService.create({ description: description }).subscribe({
        next: (data) => {
          this.alertService.success('Agrupador criado com sucesso.');
          this.crudStateService.create();
          this.postingGroupService.refreshList();
        },
        error: (error) => {
          this.alertService.danger('Erro ao criar agrupador');
          console.log(error);
        },
      });
    } else if (this.state === UpdateState.UPDATE) {
      const postingGroupForUpdate: PostingGroup = {
        id: this.postingGroup.id,
        description: description,
        familyId: this.postingGroup.familyId,
      };

      this.postingGroupService.edit(postingGroupForUpdate).subscribe({
        next: (data) => {
          this.alertService.success('Agrupador alterado com sucesso.');
          this.crudStateService.create();
          this.postingGroupService.refreshList();
        },
        error: (error) => {
          this.alertService.danger('Erro ao alterar agrupador');
          console.log(error);
        },
      });
    }
  }
}
