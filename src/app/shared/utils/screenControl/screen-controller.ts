import { FormGroup } from '@angular/forms';
import { UpdateState } from './../../enums/UpdateState';
import { ScreenControl, ScreenControls } from './screen-control';
import { FieldType } from '../../enums/FieldType';
export class ScreenController {
  private _fieldControl: ScreenControls;

  constructor(fieldControl: ScreenControls) {
    this._fieldControl = fieldControl;
  }

  getFieldControl(): ScreenControls {
    return this._fieldControl;
  }

  public getFieldStatus(fieldName: string, state: UpdateState) {
    const fieldControl = this._fieldControl.filter(
      (item) => item.fieldName === fieldName
    );

    if (fieldControl.length !== 1) {
      console.log('Erro na determinação de tela', fieldName, state);
      return false;
    } else {
      const value = fieldControl[0].values.filter(
        (value) => value.state === state
      );
      if (value.length !== 1) {
        console.log('Erro na determinação de tela', fieldName, state);
        return false;
      } else {
        return value[0].enable;
      }
    }
  }

  setEnabledStatus(
    form: FormGroup,
    screenController: ScreenControls,
    state: UpdateState
  ) {
    screenController
      .filter((screenControl) => {
        return screenControl.fieldType === FieldType.INPUT;
      })
      .forEach((screenControl) => {
        if (this.getFieldStatus(screenControl.fieldName, state)) {
          form.controls[screenControl.fieldName].enable();
        } else {
          form.controls[screenControl.fieldName].disable();
        }
      });
  }
}
