import { PostingCategoryService } from './../../../posting-category/services/posting-category.service';
import { DefaultSizes } from './../../../../shared/utils/layout/default-sizes';
import { PostingSearchParams } from './../../enums/postingSearchParams';
import { PostingService } from './../../services/posting.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Postings, PostingsPaginated } from './../../interfaces/posting';
import { Observable, tap } from 'rxjs';
import { Account } from './../../../account/interfaces/account';
import { PostingCategory } from './../../../posting-category/interfaces/posting-category';
import { Component, OnInit } from '@angular/core';
import { faCirclePlus, faFileArrowUp } from '@fortawesome/free-solid-svg-icons';
import { PostingGroup } from 'src/app/features/posting-group/interfaces/posting-group';
import { Natures } from 'src/app/shared/enums/Nature';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { PostingGroupService } from 'src/app/features/posting-group/services/posting-group.service';
import { GroupPostingsBy } from '../../enums/group-postings-by';
import { PostingStatus } from '../../enums/posting-status';

@Component({
  selector: 'app-posting-main',
  templateUrl: './posting-main.component.html',
  styleUrls: ['./posting-main.component.scss'],
})
export class PostingMainComponent implements OnInit {
  faCirclePlus = faCirclePlus;
  faFileArrowUp = faFileArrowUp;
  resolved = false;

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
  selectDeleted = false;
  selectPending = true;
  selectPaid = true;
  installmentsOnly = false;
  defaultSizes = DefaultSizes;
  nature = Natures;
  groupBy = GroupPostingsBy;
  activeTab = 1;

  totalRevenues = 0;
  totalExpenses = 0;
  totalNonClassified = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postingService: PostingService,
    private router: Router,
    private alertService: AlertService,
    private postingCategoryService: PostingCategoryService,
    private postingGroupService: PostingGroupService
  ) {}

  ngOnInit(): void {
    this.postingCategoryService.refreshList();
    this.postingGroupService.refreshList();

    const routeParams = this.updateSearchParameters();
    this.postingService.refreshList(routeParams);

    this.postingList$ = this.postingService.getList().pipe(
      tap({
        next: (result) => {
          this.resolved = true;
          this.setTotals(result);
        },
        complete: () => {
          this.resolved = true;
        },
        error: (error) => {
          this.resolved = true;
          this.alertService.danger('Erro ao selecionar lançamentos');
          console.log(error);
        },
      })
    );
  }

  setTotals(postingsPagiinated: PostingsPaginated) {
    let revenues = 0;
    let expenses = 0;
    let nonClassified = 0;
    postingsPagiinated.data?.forEach((posting) => {
      if (posting.postingCategory === null) {
        nonClassified += posting.value ?? 0;
      } else if (posting.postingCategory?.nature === Natures.REVENUE) {
        revenues += posting.value ?? 0;
      } else {
        expenses += posting.value ?? 0;
      }
    });
    this.totalRevenues = revenues;
    this.totalExpenses = expenses;
    this.totalNonClassified = nonClassified;
  }

  updateSearchParameters(): Params {
    // let routeParams = this.activatedRoute.snapshot.params;
    const newParams: Params = [];
    let updateRoute = false;

    //DateFrom
    if (this.activatedRoute.snapshot.params[PostingSearchParams.dateFrom]) {
      this.dateFrom =
        this.activatedRoute.snapshot.params[PostingSearchParams.dateFrom];
    } else {
      updateRoute = true;
    }
    newParams[PostingSearchParams.dateFrom] = this.dateFrom;

    //DateTo
    if (this.activatedRoute.snapshot.params[PostingSearchParams.dateTo]) {
      this.dateTo =
        this.activatedRoute.snapshot.params[PostingSearchParams.dateTo];
    } else {
      updateRoute = true;
    }
    newParams[PostingSearchParams.dateTo] = this.dateTo;

    //Posting category
    this.postingCategoryId = this.updateSingleSearchParameter(
      PostingSearchParams.postingCategoryId
    );
    if (this.postingCategoryId)
      newParams[PostingSearchParams.postingCategoryId] = this.postingCategoryId;

    //Posting group
    this.postingGroupId = this.updateSingleSearchParameter(
      PostingSearchParams.postingGroupId
    );
    if (this.postingGroupId)
      newParams[PostingSearchParams.postingGroupId] = this.postingGroupId;

    //Account
    this.accountId = this.updateSingleSearchParameter(
      PostingSearchParams.accountId
    );
    if (this.accountId)
      newParams[PostingSearchParams.accountId] = this.accountId;

    //Installments only
    const installmentsOnly = this.updateSingleSearchParameter(
      PostingSearchParams.installmentsOnly
    );
    if (installmentsOnly !== 0) {
      this.installmentsOnly = installmentsOnly === 'true' ? true : false;
    }
    newParams[PostingSearchParams.installmentsOnly] = this.installmentsOnly;

    const status = this.updateSingleSearchParameter(PostingSearchParams.status);

    if (status !== 0) {
      const statusArray: Array<string> = status.split(',');
      this.selectDeleted = false;
      this.selectPaid = false;
      this.selectPending = false;

      statusArray.forEach((status) => {
        if (status === PostingStatus.DELETED) this.selectDeleted = true;
        if (status === PostingStatus.PAID) this.selectPaid = true;
        if (
          status === PostingStatus.PENDING ||
          status === PostingStatus.REVERSED
        )
          this.selectPending = true;
      });
      newParams[PostingSearchParams.status] = statusArray;
    } else {
      const statusArray = this.updateStatusParam();

      if (statusArray.length > 0) {
        updateRoute = true;
      }
      newParams[PostingSearchParams.status] = statusArray;
    }

    //Refresh route with updated parameters.
    if (updateRoute) {
      this.router.navigate(['/posting', newParams]);
    }
    return newParams;
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

  upload() {
    this.postingService.openFileUploadDialog(
      this.activatedRoute.snapshot.params
    );
  }

  refreshReportData() {
    const params: Params = [];
    this.resolved = false;

    setTimeout(() => {
      params[PostingSearchParams.dateFrom] = this.dateFrom;
      params[PostingSearchParams.dateTo] = this.dateTo;
      if (this.postingCategoryId !== 0)
        params[PostingSearchParams.postingCategoryId] = this.postingCategoryId;
      if (this.postingGroupId !== 0)
        params[PostingSearchParams.postingGroupId] = this.postingGroupId;
      if (this.accountId !== 0)
        params[PostingSearchParams.accountId] = this.accountId;
      const statusArray = this.updateStatusParam();
      if (statusArray.length > 0)
        params[PostingSearchParams.status] = statusArray;
      params[PostingSearchParams.installmentsOnly] = this.installmentsOnly;
      this.router.navigate(['/posting', params]);
      this.postingService.refreshList(params);
    }, 500);
  }

  updateStatusParam(): Array<string> {
    const statusArray = [];
    if (this.selectDeleted) statusArray.push(PostingStatus.DELETED);
    if (this.selectPaid) statusArray.push(PostingStatus.PAID);
    if (this.selectPending) {
      statusArray.push(PostingStatus.PENDING);
      statusArray.push(PostingStatus.REVERSED);
    }
    return statusArray;
  }

  postingCategorySelected(postingCategory: PostingCategory) {
    this.postingCategoryId = postingCategory.id ?? 0;
    this.refreshReportData();
  }

  postingGroupSelected(postingGroup: PostingGroup) {
    this.postingGroupId = postingGroup.id ?? 0;
    this.refreshReportData();
  }

  accountSelected(account: Account) {
    this.accountId = account.id ?? 0;
    this.refreshReportData();
  }

  statusSelected(status: string) {
    this.refreshReportData();
  }

  installmentsOnlySelected() {
    this.refreshReportData();
  }

  dateFromChanged(date: Date) {
    this.refreshReportData();
  }

  dateToChanged(date: Date) {
    this.refreshReportData();
  }

  // updateParamsAfterChange(paramName: string, paramValue: any) {
  //   const newParams = RouteUtil.prepareQSParams(
  //     this.activatedRoute.snapshot.params,
  //     {
  //       [paramName]: paramValue,
  //     }
  //   );

  //   this.router.navigate(['/posting', newParams]);
  //   return newParams;
  // }

  setActiveTab(activeTab: number) {
    this.activeTab = activeTab;
  }

  filterByNature(postings?: Postings, nature?: Natures): Postings {
    if (!postings) return [];
    return postings.filter((posting) => {
      if (nature === Natures.NONE) {
        return posting.postingCategoryId === null;
      }
      return posting.postingCategory?.nature === nature;
    });
  }
}
