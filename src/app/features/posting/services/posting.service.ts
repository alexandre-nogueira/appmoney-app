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
import { Params } from '@angular/router';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class PostingService implements CrudService {
  private _postings$ = new Subject<PostingsPaginated>();

  constructor(private httpClient: HttpClient, private modal: NgbModal) {}

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
    return this.httpClient.post<Posting>(`${API}/posting`, {
      accountId: posting.accountId,
      postingCategoryId: posting.postingCategoryId,
      postingGroupId: posting.postingGroupId,
      status: posting.status,
      description: posting.description,
      value: posting.value,
      due_date: posting.dueDate,
    });
  }

  edit(posting: Posting): Observable<Posting> {
    return this.httpClient.patch<Posting>(`${API}/posting`, {
      accountId: posting.accountId,
      postingCategoryId: posting.postingCategoryId,
      postingGroupId: posting.postingGroupId,
      status: posting.status,
      description: posting.description,
      value: posting.value,
      due_date: posting.dueDate,
      paymentDate: posting.paymentDate,
    });
  }

  delete(posting: Posting): Observable<Posting> {
    return this.httpClient.delete<Posting>(`${API}/posting/${posting.id}`);
  }

  pay(posting: Posting): Observable<Posting> {
    return this.httpClient.patch(`${API}/posting/${posting.id}/pay`, {
      paymentDate: posting.paymentDate,
    });
  }

  reversePayment(posting: Posting): Observable<Posting> {
    return this.httpClient.patch(
      `${API}/posting/${posting.id}/reversePayment`,
      {}
    );
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

  openDetailDialog() {
    const postingDetailModal = this.modal.open(PostingDetailComponent);
  }
}
