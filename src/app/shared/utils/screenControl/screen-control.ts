export interface ScreenControl {
  fieldName: string;
  values: Array<{
    state: number;
    enable: boolean;
  }>;
}
