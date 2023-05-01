import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CrudService } from 'src/app/shared/interfaces/crud-service';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  PostingCategories,
  PostingCategory,
} from '../interfaces/posting-category';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class PostingCategoryService implements CrudService {
  postingCategories$: Subject<PostingCategories> = new Subject();

  constructor(private httpClient: HttpClient) {}

  refreshList(): void {
    this.httpClient.get<PostingCategories>(`${API}/postingCategory`).subscribe({
      next: (postingCategories) => {
        this.postingCategories$.next(postingCategories);
      },
    });
  }

  getList(): Observable<PostingCategories> {
    this.refreshList();
    return this.postingCategories$.asObservable();
  }

  getSingle(id: number): Observable<PostingCategory> {
    return this.httpClient.get<PostingCategory>(`${API}/postingCategory/${id}`);
  }

  create(postingCategory: PostingCategory): Observable<PostingCategory> {
    return this.httpClient.post<PostingCategory>(`${API}/postingCategory`, {
      description: postingCategory.description,
      nature: postingCategory.nature,
    });
  }

  edit(postingCategory: PostingCategory): Observable<PostingCategory> {
    return this.httpClient.patch<PostingCategory>(
      `${API}/postingCategory/${postingCategory.id}`,
      {
        description: postingCategory.description,
        nature: postingCategory.nature,
      }
    );
  }

  delete(postingCategory: PostingCategory): Observable<PostingCategory> {
    return this.httpClient.delete<PostingCategory>(
      `${API}/postingCategory/${postingCategory.id}`
    );
  }
}
