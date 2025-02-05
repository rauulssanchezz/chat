import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const router = new Router();

  console.log('Token:', token);
  if(!token){
    router.navigate(['/login']);
    return false;
  }else{
    return true;
  }
};
