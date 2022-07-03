export class Alert {
  public readonly message: string;
  public readonly type: AlertTypes;

  constructor(message: string, type: AlertTypes) {
    this.message = message;
    this.type = type;
  }
}

export enum AlertTypes {
  SUCCESS = 'alert alert-success',
  DANGER = 'alert alert-danger',
  WARNING = 'alert alert-warning',
  INFO = 'alert alert-info',
  PRIMARY = 'alert alert-primary',
  LIGHT = 'alert alert-light',
  DARK = 'alert alert-dark',
}
