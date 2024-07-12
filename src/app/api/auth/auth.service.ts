import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { getApiConfig } from '../../shared/configs/api.config';
import { Auth } from '../../shared/entites/auth';
import { AuthResponse } from './auth.response';

const apiCOnfig = getApiConfig();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth: Auth | null = null;
  baseApiUrl = apiCOnfig.apiUrl;
  http: HttpClient = inject(HttpClient);
  cookieService = inject(CookieService);
  router = inject(Router);

  get isAuth() {
    if (!this.auth) {
      const accessToken = this.cookieService.get('access_token');
      const refreshToken = this.cookieService.get('refresh_token');
      const tokenType = this.cookieService.get('token_type');

      if (accessToken && refreshToken && tokenType) {
        this.auth = {
          accessToken: accessToken,
          refreshToken: refreshToken,
          tokenType: tokenType,
        };
      }
    };

    return !!this.auth;
  }

  login(payload: { username: string, password: string }) {
    const body = new FormData();

    body.append('username', payload.username);
    body.append('password',  payload.password);

    return this.http.post<AuthResponse>(
      `${this.baseApiUrl}/auth/token`,
      body,
    ).pipe(
      tap((res) => this.saveTokens(res))
    );
  }

  logout() {
    this.auth = null;
    this.cookieService.deleteAll();
    this.router.navigate(['/login']);
  }

  saveTokens(response: AuthResponse) {
    this.auth = {
      accessToken: response.access_token,
      refreshToken: response.refresh_token,
      tokenType: response.token_type,
    };

    this.cookieService.set('access_token', this.auth.accessToken);
    this.cookieService.set('refresh_token', this.auth.refreshToken);
    this.cookieService.set('token_type', this.auth.tokenType);
  }

  refreshAuthToken() {
    return this.http.post<AuthResponse>(
      `${this.baseApiUrl}/auth/refresh`,
      {
        refresh_token: this.auth?.refreshToken,
      },
    ).pipe(
      tap((res) => this.saveTokens(res)),
      catchError((error) => {
        this.logout();
        return throwError(error);
      }),
    );
  }
}
