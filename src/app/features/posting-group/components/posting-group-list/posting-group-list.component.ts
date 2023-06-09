import { PostingGroup } from './../../interfaces/posting-group';
import { CrudStateService } from './../../../../shared/services/crud-state.service';
import { PostingGroupService } from './../../services/posting-group.service';
import { Observable, tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { PostingGroups } from '../../interfaces/posting-group';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'posting-group-list',
  templateUrl: './posting-group-list.component.html',
  styleUrls: ['./posting-group-list.component.scss'],
})
export class PostingGroupListComponent implements OnInit {
  postingGroupList$!: Observable<PostingGroups>;
  resolved = false;
  faCirclePlus = faCirclePlus;
  filterText!: string;

  constructor(
    private postingGroupService: PostingGroupService,
    private crudStateService: CrudStateService
  ) {}

  ngOnInit(): void {
    this.postingGroupList$ = this.postingGroupService.getList().pipe(
      tap({
        next: () => (this.resolved = true),
        error: () => (this.resolved = true),
        complete: () => (this.resolved = true),
      })
    );
  }

  show(postingGroup: PostingGroup) {
    this.crudStateService.show(postingGroup);
  }
}
