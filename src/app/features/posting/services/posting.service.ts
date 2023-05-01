import { CrudStateService } from './../../../shared/services/crud-state.service';
import { PostingDetailComponent } from './../components/posting-detail/posting-detail.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RouteUtil } from 'src/app/shared/utils/route/route-util';
import {
  Posting,
  PostingsPaginated,
  MassPostings,
  MassPostingsReturn,
} from './../interfaces/posting';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CrudService } from 'src/app/shared/interfaces/crud-service';
import { Injectable } from '@angular/core';
import { Observable, Subject, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Params } from '@angular/router';
import { PostingStatus } from '../enums/posting-status';
import { Natures } from '../../../shared/enums/Nature';
import { ConfirmationModalService } from 'src/app/shared/components/confirmation-modal/confirmation-modal.service';
import { PostingFileUploadComponent } from '../components/posting-file-upload/posting-file-upload.component';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class PostingService implements CrudService {
  private _postings$ = new Subject<PostingsPaginated>();
  private _revenueTotal = new Subject<number>();
  private _expenseTotal = new Subject<number>();

  constructor(
    private httpClient: HttpClient,
    private modal: NgbModal,
    private crudStateService: CrudStateService,
    private confirmationModalService: ConfirmationModalService
  ) {}

  setTotal(value: number, nature: Natures) {
    if (nature === Natures.REVENUE) {
      this._revenueTotal.next(value);
    } else {
      this._expenseTotal.next(value);
    }
  }

  getExpenseTotal(): Observable<number> {
    return this._expenseTotal.asObservable();
  }

  getRevenueTotal(): Observable<number> {
    return this._revenueTotal.asObservable();
  }

  refreshList(params: Params): void {
    const httpParams = RouteUtil.prepareHttpParams(params);

    this.httpClient
      .get<PostingsPaginated>(`${API}/posting`, { params: httpParams })
      .subscribe({
        next: (postings) => {
          this._postings$.next(postings);
        },
        error: (error) => {
          this._postings$.error(error);
          console.log(error);
        },
      });
  }

  getList(params?: Params): Observable<PostingsPaginated> {
    // this.refreshList(params);
    return this._postings$.asObservable();
  }

  getSingle(id: number): Observable<Posting> {
    return this.httpClient.get<Posting>(`${API}/posting/${id}`);
  }

  create(posting: Posting): Observable<Posting> {
    return this.httpClient.post<Posting>(`${API}/posting/create`, {
      accountId: posting.accountId,
      postingCategoryId: posting.postingCategoryId,
      postingGroupId: posting.postingGroupId,
      description: posting.description,
      value: posting.value,
      dueDate: posting.dueDate,
      paymentDate: posting.paymentDate,
    });
  }

  edit(posting: Posting): Observable<Posting> {
    return this.httpClient.patch<Posting>(`${API}/posting/${posting.id}`, {
      accountId: posting.accountId,
      postingCategoryId:
        posting.postingCategoryId == 0 ? null : posting.postingCategoryId,
      postingGroupId:
        posting.postingGroupId == 0 ? null : posting.postingGroupId,
      description: posting.description,
      value: posting.value,
      dueDate: posting.dueDate,
      paymentDate: posting.paymentDate,
    });
  }

  delete(posting: Posting): Observable<Posting> {
    return this.httpClient.delete<Posting>(`${API}/posting/${posting.id}`);
  }

  restore(posting: Posting): Observable<Posting> {
    return this.httpClient.get<Posting>(`${API}/posting/${posting.id}/restore`);
  }

  createMultiple(massPostings: MassPostings): Observable<MassPostingsReturn> {
    return this.httpClient.post<MassPostingsReturn>(
      `${API}/posting/createMultiple`,
      {
        postings: massPostings.postings,
        ignoreDuplicated: massPostings.ignoreDuplicated,
      }
    );
  }

  openDetailDialog(posting?: Posting, routeParams?: Params) {
    const postingDetailModal = this.modal.open(PostingDetailComponent, {
      size: 'lg',
      centered: true,
      keyboard: false,
      backdrop: 'static',
    });

    //It is necessary to pass the route params via input because
    // the modal does not have access to activatedRoute params.
    postingDetailModal.componentInstance.routeParams = routeParams;

    // The state must be set here because this "shown" method ensures the modal is fully load
    postingDetailModal.shown.subscribe(() => {
      if (posting) {
        this.crudStateService.show(posting);
      } else {
        this.crudStateService.create();
      }
    });
  }

  openFileUploadDialog(routeParams?: Params) {
    const uploadModal = this.modal.open(PostingFileUploadComponent);
    uploadModal.componentInstance.routeParams = routeParams;
  }
}
