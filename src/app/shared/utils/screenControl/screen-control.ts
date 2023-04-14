import { FieldType } from './../../enums/FieldType';
export interface ScreenControl {
  fieldName: string;
  fieldType?: FieldType;
  values: Array<{
    state: number;
    enable: boolean;
  }>;
}

export type ScreenControls = Array<ScreenControl>;
