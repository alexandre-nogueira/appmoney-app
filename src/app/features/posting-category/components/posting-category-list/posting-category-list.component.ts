import { CrudStateService } from './../../../../shared/services/crud-state.service';
import { PostingCategoryService } from './../../services/posting-category.service';
import { Observable, tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {
  PostingCategories,
  PostingCategory,
} from '../../interfaces/posting-category';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'posting-category-list',
  templateUrl: './posting-category-list.component.html',
  styleUrls: ['./posting-category-list.component.scss'],
})
export class PostingCategoryListComponent implements OnInit {
  postingCategoryList$!: Observable<PostingCategories>;
  resolved = false;
  faCirclePlus = faCirclePlus;
  filterText!: string;

  constructor(
    private postingCategoryService: PostingCategoryService,
    private crudStateService: CrudStateService
  ) {}

  ngOnInit(): void {
    this.postingCategoryList$ = this.postingCategoryService.getList().pipe(
      tap({
        error: () => (this.resolved = true),
        complete: () => (this.resolved = true),
      })
    );
  }

  show(postingCategory: PostingCategory) {
    this.crudStateService.show(postingCategory);
  }
}
