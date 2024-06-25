import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { map, tap } from 'rxjs';
import { getApiConfig } from '../../shared/configs/api.config';
import { Account } from '../../shared/entites/account';
import { GetAllAccountsResponse } from './accounts.response';

const apiCOnfig = getApiConfig();

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  me = signal<Account | null>(null);
  http: HttpClient = inject(HttpClient);
  baseApiUrl = apiCOnfig.apiUrl;

  getTestAccounts() {
    return this.http.get<Account[]>(`${this.baseApiUrl}/account/test_accounts`);
  }

  getMe() {
    return this.http.get<Account>(`${this.baseApiUrl}/account/me`)
    .pipe(
      tap((response: Account) => this.me.set(response))
    );
  }

  getAccountById(accountId: string) {
    return this.http.get<Account>(`${this.baseApiUrl}/account/${accountId}`);
  }

  getSubscribers({
    page = 1,
    size = 50,
  }: {
    page?: number;
    size?: number;
  }) {
    return this.http.get<GetAllAccountsResponse>(`${this.baseApiUrl}/account/subscribers/`, {
      params: {
        page: +page,
        size: +size,
      }
    })
      .pipe(
        map((response: GetAllAccountsResponse) => ({
          items: response.items,
          total: response.total,
        }))
      );
  }
}
