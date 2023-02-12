import { Observable } from 'rxjs';
import { PostingGroupService } from './../../services/posting-group.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostingGroup, PostingGroups } from '../../interfaces/posting-group';

@Component({
  selector: 'posting-group-selector',
  templateUrl: './posting-group-selector.component.html',
  styleUrls: ['./posting-group-selector.component.scss'],
})
export class PostingGroupSelectorComponent implements OnInit {
  @Input() selectedId = 0;
  @Output() selectedPostingGroupEvent = new EventEmitter<PostingGroup>();

  postingGroupList$!: Observable<PostingGroups>;

  constructor(private postingGroupService: PostingGroupService) {}

  ngOnInit(): void {
    this.postingGroupList$ = this.postingGroupService.getList();
  }

  onPostingGroupSelected(id: number) {
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
}
