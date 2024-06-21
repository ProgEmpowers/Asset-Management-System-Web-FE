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


// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { CookieService } from 'ngx-cookie-service';
// import { AuthService } from '../services/auth.service';
// import { jwtDecode } from 'jwt-decode';

// interface DecodedToken {
//   exp: number;
//   // Add other properties if needed
// }

// export const authGuard: CanActivateFn = (route, state) => {
//   const cookieService = inject(CookieService);
//   const router = inject(Router);
//   const authService = inject(AuthService);
//   const user = authService.getUser();

//   // Check for the JWT token
//   let token = cookieService.get('Authorization');

//   if (token && user) {
//     token = token.replace('Bearer ', '');
//     try {
//       const decodedToken = jwtDecode<DecodedToken>(token);

//       // Check if token has expired
//       const expirationDate = decodedToken.exp * 1000; // JWT exp is in seconds, convert to milliseconds
//       const currentTime = new Date().getTime();

//       if (expirationDate < currentTime) {
//         // Token has expired
//         return handleLogout(authService, router, state.url);
//       } else {
//         // Token is still valid
//         return true;
//       }
//     } catch (error) {
//       // Invalid token
//       return handleLogout(authService, router, state.url);
//     }
//   } else {
//     // No token or user found
//     return handleLogout(authService, router, state.url);
//   }
// };

// const handleLogout = (authService: AuthService, router: Router, returnUrl: string) => {
//   authService.logout();
//   return router.createUrlTree(['/login'], { queryParams: { returnUrl } });
// };
