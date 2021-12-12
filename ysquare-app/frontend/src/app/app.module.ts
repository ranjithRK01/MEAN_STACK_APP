import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './featured/components/home/home.component';
import { PageNotFoundComponent } from './featured/components/page-not-found/page-not-found.component';
import { SignupComponent } from './featured/components/signup/signup.component';
import { SigninComponent } from './featured/components/signin/signin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarComponent } from './featured/components/navbar/navbar.component';
import { MaterialModule } from './material.module';
import { CustomerComponent } from './featured/components/customer/customer.component';
import { ManagerComponent } from './featured/components/manager/manager.component';
import { AdminComponent } from './featured/components/admin/admin.component';
import { TableComponent } from './featured/components/table/table.component';
import { CommonInterceptorsService } from './interceptors/common.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { LayoutGuard } from './guard/layout.guard';
import { HomeGuard } from './guard/home.guatd';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    SignupComponent,
    SigninComponent,
    NavbarComponent,
    CustomerComponent,
    ManagerComponent,
    AdminComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,useClass:CommonInterceptorsService,multi:true
    },
    CookieService,
    LayoutGuard,
    HomeGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
