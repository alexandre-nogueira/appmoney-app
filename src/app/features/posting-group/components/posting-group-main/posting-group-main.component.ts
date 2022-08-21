import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { CrudStateService } from './../../../../shared/services/crud-state.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posting-group-main',
  templateUrl: './posting-group-main.component.html',
  styleUrls: ['./posting-group-main.component.scss'],
})
export class PostingGroupMainComponent implements OnInit {
  faCirclePlus = faCirclePlus;
  constructor(private crudStateService: CrudStateService) {}

  ngOnInit(): void {}

  new() {
    this.crudStateService.create();
  }
}
