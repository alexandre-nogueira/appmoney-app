import { Component, OnInit } from '@angular/core';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { CrudStateService } from 'src/app/shared/services/crud-state.service';

@Component({
  selector: 'app-account-main',
  templateUrl: './account-main.component.html',
  styleUrls: ['./account-main.component.scss'],
})
export class AccountMainComponent implements OnInit {
  faCirclePlus = faCirclePlus;
  constructor(private crudStateService: CrudStateService) {}

  ngOnInit(): void {}

  new() {
    this.crudStateService.create();
  }
}
