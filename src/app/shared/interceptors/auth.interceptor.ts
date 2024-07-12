import { HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpStatusCode } from "@angular/common/http";
import { inject } from "@angular/core";
import { BehaviorSubject, catchError, filter, switchMap, tap, throwError } from "rxjs";
import { AuthService } from "../../api/auth/auth.service";
import { AuthResponse } from "../../api/auth/auth.response";

let isRefreshing$ = new BehaviorSubject(false);

export const authTokenInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const token = authService.auth?.accessToken;

  if (!token) {
    return next(req);
  }

  if (isRefreshing$.value) {
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
  if (!isRefreshing$.value) {
    isRefreshing$.next(true);

    return authService.refreshAuthToken()
      .pipe(
        switchMap((res: AuthResponse) => {
          return next(addToken(req, res.access_token)).pipe(
            tap(() => isRefreshing$.next(false)),
          );
        })
      )
    }

  if (req.url.includes('refresh')) {
    return next(addToken(req, authService.auth?.accessToken!));
  }

  return isRefreshing$.pipe(
    filter((isRefreshing) =>!isRefreshing),
    switchMap(() => next(addToken(req, authService.auth?.accessToken!)))
  );

  // return next(addToken(req, authService.auth?.accessToken!));
}

const addToken = (req: HttpRequest<any>, token: string) => {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
}