import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable()
export class HomeGuard implements CanActivate {
    constructor(
       private router: Router,
       private cookieService: CookieService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot
                ): Observable<boolean> | Promise<boolean> | boolean {
        var token = this.cookieService.get('jwt');
        var allowAccess = false;
        if(token){
        const infoDetails = this.getDecodedAccessToken(token);
        if(infoDetails.role == 'admin') this.router.navigateByUrl('/admin');
        else if(infoDetails.role == 'manager')  this.router.navigateByUrl('/manager');
        else if(infoDetails.role == 'customer')  this.router.navigateByUrl('/customer');
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
