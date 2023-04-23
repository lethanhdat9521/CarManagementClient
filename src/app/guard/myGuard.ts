import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AccountService } from "../services/account.service";

export const MyGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AccountService);
  const router = inject(Router);
  console.log("Role", route.routeConfig?.data?.['role']);
  console.log("Return", authService.isAccessTokenExpired());
  //if (authService.isAccessTokenExpired() == false) {
  //  return true;
  //} else {
  //  router.navigate(["login"]);
  //  return false;
  //}
  return true;
};

export const canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => MyGuard(route, state);
