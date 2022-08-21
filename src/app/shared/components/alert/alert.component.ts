import { AlertService } from './alert.service';
import { Component, Input, OnInit } from '@angular/core';
import { Alert } from './alert';
// import { setTimeout } from 'timers';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  @Input() timeout = 3000;
  alerts: Alert[] = [];

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertService.getAlert().subscribe({
      next: (alert) => {
        this.alerts.push(alert);
        setTimeout(() => {
          this.removeAlert(alert);
        }, this.timeout);
      },
    });
  }

  removeAlert(alertToRemove: Alert) {
    this.alerts = this.alerts.filter((alert) => {
      alert != alertToRemove;
    });
  }
}
