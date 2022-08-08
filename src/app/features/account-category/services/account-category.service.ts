import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  AccountCategories,
  AccountCategory,
} from './../interfaces/account-category';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class AccountCategoryService {
  accountCategories$: Subject<AccountCategories> = new Subject();

  constructor(private httpClient: HttpClient) {}

  refreshList() {
    this.httpClient.get<AccountCategories>(`${API}/accountCategory`).subscribe({
      next: (data) => {
        this.accountCategories$.next(data);
      },
    });
  }

  getList() {
    this.refreshList();
    return this.accountCategories$.asObservable();
  }

  getSingle(id: number) {
    return this.httpClient.get<AccountCategories>(
      `${API}/accountCategory/${id}`
    );
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
