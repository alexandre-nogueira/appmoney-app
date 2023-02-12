import { Observable } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostingCategories } from '../../interfaces/posting-category';
import { PostingCategoryService } from './../../services/posting-category.service';
import { PostingCategory } from './../../interfaces/posting-category';

@Component({
  selector: 'posting-category-selector',
  templateUrl: './posting-category-selector.component.html',
  styleUrls: ['./posting-category-selector.component.scss'],
})
export class PostingCategorySelectorComponent implements OnInit {
  @Input() selectedId = 0;
  @Output() selectedPostingCategoryEvent = new EventEmitter<PostingCategory>();

  postingCategoryList$!: Observable<PostingCategories>;

  constructor(private postingCategoryService: PostingCategoryService) {}

  ngOnInit(): void {
    this.postingCategoryList$ = this.postingCategoryService.getList();
  }

  onPostingCategorySelected(id: number) {
    if (id == 0) {
      this.selectedPostingCategoryEvent.emit({ id: 0 });
    } else {
      this.postingCategoryService.getSingle(id).subscribe({
        next: (postingCategory) => {
          this.selectedPostingCategoryEvent.emit(postingCategory);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
