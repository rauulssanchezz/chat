import { CanActivateFn, Router } from '@angular/router';
import { LoginComponent } from '../pages/auth/login/login.component';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const router = new Router();
  if(!token){
    router.navigate(['/login']);
    return false;
  }else{
    return true;
  }
};
