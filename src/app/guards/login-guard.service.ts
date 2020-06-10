import { Injectable } from '@angular/core';
import { AuthService } from '../auth-servises/auth.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginGuardService implements CanActivate {

  constructor(private authSErv : AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
  
    if(this.authSErv.getIsLogin()){
      return true;
    }else{
      this.router.navigateByUrl('/home');
      return false;
    }
  }

  
}
