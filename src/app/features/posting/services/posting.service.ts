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
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Params } from '@angular/router';
import { PostingStatus } from '../enums/posting-status';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class PostingService implements CrudService {
  private _postings$ = new Subject<PostingsPaginated>();

  constructor(
    private httpClient: HttpClient,
    private modal: NgbModal,
    private crudStateService: CrudStateService,
    private activatedRoute: ActivatedRoute
  ) {}

  refreshList(params: Params): void {
    const httpParams = RouteUtil.prepareHttpParams(params);

    this.httpClient
      .get<PostingsPaginated>(`${API}/posting`, { params: httpParams })
      .subscribe({
        next: (postings) => {
          this._postings$.next(postings);
        },
        error: (error) => console.log(error),
      });
  }

  getList(params: Params): Observable<PostingsPaginated> {
    this.refreshList(params);
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
      postingCategoryId: posting.postingCategoryId,
      postingGroupId: posting.postingGroupId,
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

  // pay(posting: Posting): Observable<Posting> {
  //   return this.httpClient.patch(`${API}/posting/${posting.id}/pay`, {
  //     paymentDate: posting.paymentDate,
  //   });
  // }

  // reversePayment(posting: Posting): Observable<Posting> {
  //   return this.httpClient.patch(
  //     `${API}/posting/${posting.id}/reversePayment`,
  //     {}
  //   );
  // }

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
    });

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
}
