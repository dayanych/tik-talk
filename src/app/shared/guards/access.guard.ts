import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../api/auth/auth.service";

export const canActivateAuthGuard = () => {
  const isLoggedIn = inject(AuthService).isAuth;

  if (isLoggedIn) {
    return true;
  }

  return inject(Router).navigate(['/login']);
};
