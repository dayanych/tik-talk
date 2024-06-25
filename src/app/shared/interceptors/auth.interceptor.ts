import { HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpStatusCode } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, switchMap, throwError } from "rxjs";
import { AuthService } from "../../api/auth/auth.service";
import { AuthResponse } from "../../api/auth/auth.response";

let isRefreshing = false;

export const authTokenInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const token = authService.auth?.accessToken;

  if (!token) {
    return next(req);
  }

  if (isRefreshing) {
    return refreshAndProcced(authService, req, next);
  }

  return next(addToken(req, token))
   .pipe(
      catchError((error) => {
        if (error.status === HttpStatusCode.Forbidden) {
          return refreshAndProcced(authService, req, next);
        }

        return throwError(error);
      })
    );
};

const refreshAndProcced = (
  authService: AuthService,
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  if (!isRefreshing) {
    isRefreshing = true;

    return authService.refreshAuthToken()
      .pipe(
        switchMap((res: AuthResponse) => {
          isRefreshing = false;
          return next(addToken(req, res.access_token));
        })
      )
    }

  return next(addToken(req, authService.auth?.accessToken!));
}

const addToken = (req: HttpRequest<any>, token: string) => {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
}