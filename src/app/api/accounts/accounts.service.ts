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
  http: HttpClient = inject(HttpClient);
  me = signal<Account | null>(null);
  filteredAccounts = signal<Account[]>([]);
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

  updateMe(payload: Partial<Account>) {
    const body = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      city: payload.city,
      description: payload.description,
      stack: payload.stack,
    };

    return this.http.patch<Account>(`${this.baseApiUrl}/account/me`, body);
  }

  deleteMe() {
    return this.http.delete<void>(`${this.baseApiUrl}/account/me`);
  }

  uploadAvatar(file: File) {
    const formData = new FormData();
    formData.append('image', file);

    return this.http.post<Account>(`${this.baseApiUrl}/account/upload_image`, formData);
  }

  filterAccounts({
    page = 1,
    size = 50,
    firstName = '',
    lastName = '',
    stack = '',
  }: {
    page?: number;
    size?: number;
    firstName?: string;
    lastName?: string;
    stack?: string;
  }) {
    return this.http.get<GetAllAccountsResponse>(`${this.baseApiUrl}/account/accounts`, {
      params: {
        page: +page,
        size: +size,
        firstName,
        lastName,
        stack,
      }
    }).pipe(
      tap((response: GetAllAccountsResponse) => this.filteredAccounts.set(response.items))
    )
  }
}
