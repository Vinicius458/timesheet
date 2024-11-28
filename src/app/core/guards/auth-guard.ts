import { inject } from '@angular/core';
import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs';

export const routerInjection = () => inject(Router);

export const authStateObs$ = () => inject(AuthService).authState$;

export const canActivateGuard: CanActivateFn = () => {
  const router = routerInjection();
  const toastrService = inject(ToastrService);

  return authStateObs$().pipe(
    map((user) => {
      if (!user) {
        toastrService.info(
          'You need to login to access the feature.',
          'Login Required'
        );
        router.navigateByUrl('auth/login');
        return false;
      }
      return true;
    })
  );
};
