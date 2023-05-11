import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthInterceptor } from "../inceptor/auth.interceptor";
import { AccountService } from "../services/account.service";

export const MyGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AccountService);
  const router = inject(Router);
  console.log("Role", route.routeConfig?.data?.['role'].includes("Admin"));
  let userInfor = localStorage.getItem("UserInfor")!;
  if (userInfor == null) {
    router.navigate(["login"]);
    return false;
  }
  let role = (<any>JSON.parse(localStorage.getItem("AccessToken")!).role);
  console.log("ROle ", role);
  console.log("Role is true", (<string[]>route.routeConfig?.data?.['role']).includes(role));
  AuthInterceptor.accessToken = JSON.parse(<any>localStorage.getItem("AccessToken")!).token;
  console.log("Return", authService.isAccessTokenExpired());
  if (authService.isAccessTokenExpired() == false && (<string[]>route.routeConfig?.data?.['role']).includes(role)) {
    return true;
  } else {
    router.navigate(["login"]);
    return false;
  }
};

export const canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => MyGuard(route, state);
