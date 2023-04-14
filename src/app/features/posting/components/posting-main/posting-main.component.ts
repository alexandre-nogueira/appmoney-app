import { DefaultSizes } from './../../../../shared/utils/layout/default-sizes';
import { RouteUtil } from 'src/app/shared/utils/route/route-util';
import { PostingSearchParams } from './../../enums/postingSearchParams';
import { PostingService } from './../../services/posting.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PostingsPaginated } from './../../interfaces/posting';
import { Observable } from 'rxjs';
import { Account } from './../../../account/interfaces/account';
import { PostingCategory } from './../../../posting-category/interfaces/posting-category';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { faCirclePlus, faFileArrowUp } from '@fortawesome/free-solid-svg-icons';
import { PostingGroup } from 'src/app/features/posting-group/interfaces/posting-group';
import { CrudStateService } from 'src/app/shared/services/crud-state.service';

@Component({
  selector: 'app-posting-main',
  templateUrl: './posting-main.component.html',
  styleUrls: ['./posting-main.component.scss'],
})
export class PostingMainComponent implements OnInit, AfterViewInit {
  faCirclePlus = faCirclePlus;
  faFileArrowUp = faFileArrowUp;
  resolved = false;
  qsParamsReady = false;

  postingList$!: Observable<PostingsPaginated>;

  dateFrom = `${new Date().toJSON().slice(0, 8)}01`;
  dateTo = `${new Date().toJSON().slice(0, 8)}${new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  )
    .toJSON()
    .slice(8, 10)}`;
  postingCategoryId = 0;
  postingGroupId = 0;
  accountId = 0;
  status = 'ALL';
  defaultSizes = DefaultSizes;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postingService: PostingService,
    private router: Router,
    private crudStateService: CrudStateService
  ) {}

  ngOnInit(): void {
    this.updateSearchParameters();
  }

  ngAfterViewInit(): void {
    //it must be assynchronous to prevent the error:
    //NG0100: Expression has changed after it was checked
    setTimeout(() => {
      this.qsParamsReady = true;
    }, 0);
  }

  updateSearchParameters() {
    let routeParams = this.activatedRoute.snapshot.params;
    let updateRoute = false;

    if (this.activatedRoute.snapshot.params[PostingSearchParams.dateFrom]) {
      this.dateFrom =
        this.activatedRoute.snapshot.params[PostingSearchParams.dateFrom];
    } else {
      updateRoute = true;
      routeParams = RouteUtil.prepareQSParams(routeParams, {
        [PostingSearchParams.dateFrom]: this.dateFrom,
      });
    }

    if (this.activatedRoute.snapshot.params[PostingSearchParams.dateTo]) {
      this.dateTo =
        this.activatedRoute.snapshot.params[PostingSearchParams.dateTo];
    } else {
      updateRoute = true;
      routeParams = RouteUtil.prepareQSParams(routeParams, {
        [PostingSearchParams.dateTo]: this.dateTo,
      });
    }

    this.postingCategoryId = this.updateSingleSearchParameter(
      PostingSearchParams.postingCategoryId
    );

    this.postingGroupId = this.updateSingleSearchParameter(
      PostingSearchParams.postingGroupId
    );

    this.accountId = this.updateSingleSearchParameter(
      PostingSearchParams.accountId
    );

    //Refresh route with updated parameters.
    if (updateRoute) {
      this.router.navigate(['/posting', routeParams]);
    }
  }

  updateSingleSearchParameter(paramName: string) {
    if (this.activatedRoute.snapshot.params[paramName]) {
      return this.activatedRoute.snapshot.params[paramName];
    } else {
      return 0;
    }
  }

  new() {
    this.postingService.openDetailDialog(
      undefined,
      this.activatedRoute.snapshot.params
    );
  }

  postingCategorySelected(postingCategory: PostingCategory) {
    this.postingService.refreshList(
      this.updateParamsAfterChange(
        PostingSearchParams.postingCategoryId,
        postingCategory.id === 0 ? null : postingCategory.id
      )
    );
  }

  postingGroupSelected(postingGroup: PostingGroup) {
    this.postingService.refreshList(
      this.updateParamsAfterChange(
        PostingSearchParams.postingGroupId,
        postingGroup.id === 0 ? null : postingGroup.id
      )
    );
  }

  accountSelected(account: Account) {
    this.postingService.refreshList(
      this.updateParamsAfterChange(
        PostingSearchParams.accountId,
        account.id === 0 ? null : account.id
      )
    );
  }

  statusSelected(status: string) {
    this.postingService.refreshList(
      this.updateParamsAfterChange(
        PostingSearchParams.status,
        status === 'ALL' ? null : status
      )
    );
  }

  dateFromChanged(date: Date) {
    setTimeout(() => {
      this.postingService.refreshList(
        this.updateParamsAfterChange(PostingSearchParams.dateFrom, date)
      );
    }, 2000);
  }

  dateToChanged(date: Date) {
    this.postingService.refreshList(
      this.updateParamsAfterChange(PostingSearchParams.dateTo, date)
    );
  }

  updateParamsAfterChange(paramName: string, paramValue: any) {
    const newParams = RouteUtil.prepareQSParams(
      this.activatedRoute.snapshot.params,
      {
        [paramName]: paramValue,
      }
    );

    this.router.navigate(['/posting', newParams]);
    return newParams;
  }
}
