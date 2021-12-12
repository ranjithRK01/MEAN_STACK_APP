import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BackendUrls, Endpoints } from '../constants/url.model';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private updateNavbar = new Subject<string>();

  public updateNavbar$ = this.updateNavbar.asObservable();


  constructor(private http:HttpClient) { }

  signupUser(user:User): Observable<User>{
    return this.http.post<User>(`${BackendUrls.backendUrl}${Endpoints.signup}`, user);
  }

  signinUser(user:User): Observable<User>{
    return this.http.post<User>(`${BackendUrls.backendUrl}${Endpoints.signin}`, user);
  }

  getCustomerList(): Observable<User>{
    return this.http.get<User>(`${BackendUrls.backendUrl}${Endpoints.customerList}`);
  }

  getManagerList(): Observable<User>{
    return this.http.get<User>(`${BackendUrls.backendUrl}${Endpoints.managerList}`);
  }

  getAdminList(): Observable<User>{
    return this.http.get<User>(`${BackendUrls.backendUrl}${Endpoints.adminList}`);
  }

  updateListers() {
    this.updateNavbar.next();
  }
}
