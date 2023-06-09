import { PostingService } from './../../services/posting.service';
import { ActivatedRoute } from '@angular/router';
import {
  Posting,
  Postings,
  PostingsPaginated,
} from './../../interfaces/posting';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Natures } from 'src/app/shared/enums/Nature';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { DefaultSizes } from 'src/app/shared/utils/layout/default-sizes';
import { PostingCategory } from 'src/app/features/posting-category/interfaces/posting-category';
import { PostingGroup } from 'src/app/features/posting-group/interfaces/posting-group';
import { RouteUtil } from 'src/app/shared/utils/route/route-util';
import { faCommentDots } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'posting-list',
  templateUrl: './posting-list.component.html',
  styleUrls: ['./posting-list.component.scss'],
})
export class PostingListComponent implements OnInit {
  @Input() postingList!: PostingsPaginated;

  // postingList$!: Observable<PostingsPaginated>;
  resolved = false;
  defaultSizes = DefaultSizes;
  filterText!: string;

  //icons
  faCommentDots = faCommentDots;

  constructor(
    private postingService: PostingService,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {}

  showDetail(posting: Posting) {
    this.postingService.openDetailDialog(
      posting,
      this.activatedRoute.snapshot.params
    );
  }

  getValueClass(posting: Posting): string {
    if (!posting.postingCategory) {
      return '';
    }
    if (posting.postingCategory?.nature === Natures.EXPENSE) {
      return 'text-danger';
    } else {
      return 'text-success';
    }
  }

  postingCategorySelected(postingCategory: PostingCategory, posting: Posting) {
    posting.postingCategoryId = postingCategory.id;
    posting.postingCategory = postingCategory;
    this.postingService.edit(posting).subscribe({
      next: () => {
        this.alertService.success('Categoria atualizada');
        this.postingService.refreshList(
          RouteUtil.prepareQSParams(this.activatedRoute.snapshot.params, {})
        );
      },
      error: (error) => {
        this.alertService.danger('Erro ao atualizar categoria');
        console.log(error);
      },
    });
  }

  postingGroupSelected(postingGroup: PostingGroup, posting: Posting) {
    posting.postingGroupId = postingGroup.id;
    posting.postingGroup = postingGroup;
    this.postingService.edit(posting).subscribe({
      next: () => {
        this.alertService.success('Lançamento atualizado');
        this.postingService.refreshList(
          RouteUtil.prepareQSParams(this.activatedRoute.snapshot.params, {})
        );
      },
      error: (error) => {
        this.alertService.danger('Erro ao atualizar lançamento');
        console.log(error);
      },
    });
  }

  sortPostings(postingList?: Postings) {
    return postingList?.sort((a: Posting, b: Posting) => {
      if (a.dueDate && b.dueDate) {
        if (a.dueDate < b.dueDate) {
          return -1;
        } else if (a.dueDate > b.dueDate) {
          return 1;
        } else {
          return 0;
        }
      }
      return 0;
    });
  }
}
