import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class CommonInterceptorsService implements HttpInterceptor {
  constructor(private cookieService: CookieService){}
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var token = this.cookieService.get('jwt');
    if(token){
    request = request.clone({
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'authorization': `Beares ${token}`
      })
     });
    }
    return next.handle(request);
  }
}
