import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authRedirectGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);
  console.log('Token:', token);
  if(token){
    router.navigate(['/home']);
    return false;
  }else{
    return true;
  }
};
