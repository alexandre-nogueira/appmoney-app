import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Alert, AlertTypes } from './alert';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  public alertSubject: Subject<Alert> = new Subject<Alert>();

  constructor() {}

  public success(message: string) {
    this.alert(message, AlertTypes.SUCCESS);
  }

  public danger(message: string) {
    this.alert(message, AlertTypes.DANGER);
  }

  public warning(message: string) {
    this.alert(message, AlertTypes.WARNING);
  }

  public info(message: string) {
    this.alert(message, AlertTypes.INFO);
  }

  public primary(message: string) {
    this.alert(message, AlertTypes.PRIMARY);
  }

  public light(message: string) {
    this.alert(message, AlertTypes.LIGHT);
  }

  public dark(message: string) {
    this.alert(message, AlertTypes.DARK);
  }

  private alert(message: string, type: AlertTypes) {
    this.alertSubject.next(new Alert(message, type));
  }

  public getAlert() {
    return this.alertSubject.asObservable();
  }
}
