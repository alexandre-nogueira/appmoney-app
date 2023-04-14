import { PostingSearchParams } from './../../enums/postingSearchParams';
import { RouteUtil } from 'src/app/shared/utils/route/route-util';
import { PostingService } from './../../services/posting.service';
import { ActivatedRoute } from '@angular/router';
import { Posting, PostingsPaginated } from './../../interfaces/posting';
import { Observable, tap } from 'rxjs';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CrudStateService } from 'src/app/shared/services/crud-state.service';

@Component({
  selector: 'posting-list',
  templateUrl: './posting-list.component.html',
  styleUrls: ['./posting-list.component.scss'],
})
export class PostingListComponent implements OnInit {
  postingList$!: Observable<PostingsPaginated>;
  resolved = false;

  constructor(
    private postingService: PostingService,
    private activatedRoute: ActivatedRoute,
    private crudStateService: CrudStateService
  ) {}

  ngOnInit(): void {
    this.postingList$ = this.postingService
      .getList(
        RouteUtil.prepareQSParams(this.activatedRoute.snapshot.params, {
          [PostingSearchParams.page]: 1,
          [PostingSearchParams.perPage]: 5000,
        })
      )
      .pipe(
        tap({
          next: () => {
            this.resolved = true;
          },
          complete: () => {
            this.resolved = true;
            console.log();
          },
          error: () => {
            this.resolved = true;
          },
        })
      );
  }

  checkMandatoryParameters(): boolean {
    if (
      !this.activatedRoute.snapshot.params[PostingSearchParams.dateTo] ||
      !this.activatedRoute.snapshot.params[PostingSearchParams.dateTo]
    ) {
      return false;
    }

    return true;
  }

  showDetail(posting: Posting) {
    this.postingService.openDetailDialog(
      posting,
      this.activatedRoute.snapshot.params
    );
  }
}
