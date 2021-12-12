import { ThrowStmt } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { User } from '../../model/user.model';
import { UserService } from '../../services/user.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit,OnDestroy{
  private subs = new SubSink();
  constructor(
    private cookieService: CookieService,
    private route: Router,
    private userService: UserService
    ) { }

  checkUserIsLogin: boolean = false;
  checkUserAccess: string = '';
  ngOnInit(): void {
   this.navUpdateCheck();
   this.subs.add(this.userService.updateNavbar$.subscribe((data)=>{
    this.navUpdateCheck();
   }))
  }
  onLogout() {
    this.checkUserIsLogin = false;
    this.cookieService.delete('jwt');
    this.navUpdateCheck();
    this.route.navigateByUrl('/signin');
  }

  navUpdateCheck() {
    var token = this.cookieService.get('jwt');
    if(token) this.checkUserIsLogin = true;
    if(token){
     this.checkUserAccess = this.getDecodedAccessToken(token);
    }
  }

  getDecodedAccessToken(token: string): any {
    try {
        var tokenInfo:any = jwt_decode(token);
        return tokenInfo['role'];
    }
    catch (Error){
        return null;
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
