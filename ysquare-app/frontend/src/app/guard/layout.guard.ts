import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable()
export class LayoutGuard implements CanActivate {
    constructor(
       private router: Router,
       private cookieService: CookieService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot
                ): Observable<boolean> | Promise<boolean> | boolean {
        var token = this.cookieService.get('jwt');
        var allowAccess = false;
        if(token){
        const infoDetails = this.getDecodedAccessToken(token);
        if (state.url === '/admin') {
            if(infoDetails.role == 'admin') allowAccess = true;
        }
        else if(state.url === '/manager') {
          if(infoDetails.role == 'manager' || infoDetails.role == 'admin')  allowAccess = true;
        }
        else if(state.url === '/customer') {
          if(infoDetails.role == 'customer' || infoDetails.role == 'manager' || infoDetails.role == 'admin')  allowAccess = true;
        }
      }
      else {
        this.router.navigateByUrl('/signup');
      }
      return allowAccess;
    }
    getDecodedAccessToken(token: string): any {
      try{
          return jwt_decode(token);
      }
      catch (Error){
          return null;
      }
    }
}
