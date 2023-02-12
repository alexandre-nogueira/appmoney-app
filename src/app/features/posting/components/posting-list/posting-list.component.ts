import { PostingSearchParams } from './../../enums/postingSearchParams';
import { RouteUtil } from 'src/app/shared/utils/route/route-util';
import { PostingService } from './../../services/posting.service';
import { ActivatedRoute } from '@angular/router';
import { PostingsPaginated } from './../../interfaces/posting';
import { Observable, tap } from 'rxjs';
import { AfterViewInit, Component, OnInit } from '@angular/core';

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
    private activatedRoute: ActivatedRoute
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
}
