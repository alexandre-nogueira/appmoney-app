import { Observable } from 'rxjs';
import { PostingGroupService } from './../../services/posting-group.service';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  forwardRef,
} from '@angular/core';
import { PostingGroup, PostingGroups } from '../../interfaces/posting-group';
import { DefaultSizes } from './../../../../shared/utils/layout/default-sizes';
import { LayoutUtil } from 'src/app/shared/utils/layout/layout-util';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
  selector: 'posting-group-selector',
  templateUrl: './posting-group-selector.component.html',
  styleUrls: ['./posting-group-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PostingGroupSelectorComponent),
      multi: true,
    },
  ],
})
export class PostingGroupSelectorComponent
  implements OnInit, ControlValueAccessor
{
  @Input() selectedId = 0;
  @Input() size = DefaultSizes.MEDIUM;
  @Input() noLabel = false;

  @Output() selectedPostingGroupEvent = new EventEmitter<PostingGroup>();

  postingGroupList$!: Observable<PostingGroups>;
  layoutUtil = new LayoutUtil();
  disabled = false;

  constructor(private postingGroupService: PostingGroupService) {}

  ngOnInit(): void {
    this.postingGroupList$ = this.postingGroupService.getList();
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

  onPostingGroupSelected(id: number) {
    if (this.onChange) this.onChange(id);
    if (this.onTouched) this.onTouched();

    if (id == 0) {
      this.selectedPostingGroupEvent.emit({ id: 0 });
    } else {
      this.postingGroupService.getSingle(id).subscribe({
        next: (postingGroup) => {
          this.selectedPostingGroupEvent.emit(postingGroup);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  sort(postingGroup?: PostingGroups) {
    return postingGroup?.sort((a: PostingGroup, b: PostingGroup) => {
      if (a.description && b.description) {
        return a.description.localeCompare(b.description);
      }
      return 0;
    });
  }
}
