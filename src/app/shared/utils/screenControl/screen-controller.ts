import { FormGroup } from '@angular/forms';
import { UpdateState } from './../../enums/UpdateState';
import { ScreenControl } from './screen-control';
export class ScreenController {
  private _fieldControl: Array<ScreenControl>;

  constructor(fieldControl: Array<ScreenControl>) {
    this._fieldControl = fieldControl;
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

  setEnabledStatus(form: FormGroup, fieldName: string, state: UpdateState) {
    if (this.getFieldStatus(fieldName, state)) {
      form.controls[fieldName].enable();
    } else {
      form.controls[fieldName].disable();
    }
  }
}
