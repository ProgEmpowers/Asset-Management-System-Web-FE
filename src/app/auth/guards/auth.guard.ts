import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);
  const authService = inject(AuthService);
  const user = authService.getUser();

  //check for the jwt token
  let token = cookieService.get('Authorization');

  if(token && user){
    token = token.replace('Bearer ', '');
    const decodedToken: any  = jwtDecode(token);
    //check if token has expired
    const expirationDate = decodedToken.exp * 1000;
    const currentTime = new Date().getTime();

    if(expirationDate < currentTime){
      //logout
    authService.logout();
    return router.createUrlTree(['/login'], { queryParams : { returnUrl: state.url }})
    }
    else{
      //token is still valid
      return true;
    }
  }
  else{
    //logout
    authService.logout();
    return router.createUrlTree(['/login'], { queryParams : { returnUrl: state.url }})
  }
};
