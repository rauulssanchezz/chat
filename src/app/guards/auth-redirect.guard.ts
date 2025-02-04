import { CanActivateFn } from '@angular/router';

export const authRedirectGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  if(token){
    return false;
  }else{
    return true;
  }
};
