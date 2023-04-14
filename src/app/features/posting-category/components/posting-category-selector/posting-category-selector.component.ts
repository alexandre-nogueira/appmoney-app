import { Observable } from 'rxjs';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  forwardRef,
} from '@angular/core';
import { PostingCategories } from '../../interfaces/posting-category';
import { PostingCategoryService } from './../../services/posting-category.service';
import { PostingCategory } from './../../interfaces/posting-category';
import { LayoutUtil } from 'src/app/shared/utils/layout/layout-util';
import { DefaultSizes } from './../../../../shared/utils/layout/default-sizes';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'posting-category-selector',
  templateUrl: './posting-category-selector.component.html',
  styleUrls: ['./posting-category-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PostingCategorySelectorComponent),
      multi: true,
    },
  ],
})
export class PostingCategorySelectorComponent
  implements OnInit, ControlValueAccessor
{
  @Input() selectedId = 0;
  @Input() size = DefaultSizes.MEDIUM;

  @Output() selectedPostingCategoryEvent = new EventEmitter<PostingCategory>();

  postingCategoryList$!: Observable<PostingCategories>;
  layoutUtil = new LayoutUtil();
  disabled = false;

  constructor(private postingCategoryService: PostingCategoryService) {}

  ngOnInit(): void {
    this.postingCategoryList$ = this.postingCategoryService.getList();
  }

  private onChange!: (_: any) => void;
  private onTouched!: () => void;

  writeValue(value: any): void {
    this.selectedId = value;
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onPostingCategorySelected(id: number) {
    if (this.onChange) this.onChange(id);
    if (this.onTouched) this.onTouched();
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
