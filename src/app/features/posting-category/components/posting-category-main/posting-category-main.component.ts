import { CrudStateService } from './../../../../shared/services/crud-state.service';
import { Component, OnInit } from '@angular/core';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'posting-category-main',
  templateUrl: './posting-category-main.component.html',
  styleUrls: ['./posting-category-main.component.scss'],
})
export class PostingCategoryMainComponent implements OnInit {
  faCirclePlus = faCirclePlus;
  constructor(private crudStateService: CrudStateService) {}

  ngOnInit(): void {}

  new() {
    this.crudStateService.create();
  }
}
