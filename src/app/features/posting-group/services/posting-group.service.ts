import { CrudService } from 'src/app/shared/interfaces/crud-service';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PostingGroup, PostingGroups } from '../interfaces/posting-group';
import { environment } from 'src/environments/environment';

const API = environment.apiURL;
@Injectable({
  providedIn: 'root',
})
export class PostingGroupService implements CrudService {
  postingGroups$: Subject<PostingGroups> = new Subject();

  constructor(private httpClient: HttpClient) {}
  refreshList(): void {
    this.httpClient.get<PostingGroups>(`${API}/postingGroup`).subscribe({
      next: (data) => {
        this.postingGroups$.next(data);
      },
    });
  }

  getList(): Observable<PostingGroups> {
    this.refreshList();
    return this.postingGroups$.asObservable();
  }

  getSingle(id: number): Observable<PostingGroup> {
    return this.httpClient.get<PostingGroup>(`${API}/postingGroup/${id}`);
  }

  create(postingGroupd: PostingGroup): Observable<PostingGroup> {
    return this.httpClient.post<PostingGroup>(`${API}/postingGroup`, {
      description: postingGroupd.description,
    });
  }

  edit(postingGroup: PostingGroup): Observable<PostingGroup> {
    return this.httpClient.patch<PostingGroup>(
      `${API}/postingGroup/${postingGroup.id}`,
      { description: postingGroup.description }
    );
  }

  delete(postingGroup: PostingGroup): Observable<PostingGroup> {
    return this.httpClient.delete<PostingGroup>(
      `${API}/postingGroup/${postingGroup.id}`
    );
  }
}
