import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  AccountCategory,
  AccountCategories,
} from './../interfaces/account-category';
import { CrudService } from 'src/app/shared/interfaces/crud-service';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class AccountCategoryService implements CrudService {
  accountCategories$: Subject<AccountCategories> = new Subject();

  constructor(private httpClient: HttpClient) {}

  refreshList() {
    this.httpClient.get<AccountCategories>(`${API}/accountCategory`).subscribe({
      next: (data) => {
        this.accountCategories$.next(data);
      },
    });
  }

  getList(): Observable<AccountCategories> {
    this.refreshList();
    return this.accountCategories$.asObservable();
  }

  getSingle(id: number) {
    return this.httpClient.get<AccountCategory>(`${API}/accountCategory/${id}`);
  }

  create(description: string) {
    return this.httpClient.post(`${API}/accountCategory`, {
      description: description,
    });
  }

  edit(accountCategory: AccountCategory) {
    return this.httpClient.patch(
      `${API}/accountCategory/${accountCategory.id}`,
      { description: accountCategory.description }
    );
  }

  delete(accountCategory: AccountCategory) {
    return this.httpClient.delete(
      `${API}/accountCategory/${accountCategory.id}`
    );
  }
}
