import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './featured/components/admin/admin.component';
import { CustomerComponent } from './featured/components/customer/customer.component';
import { HomeComponent } from './featured/components/home/home.component';
import { ManagerComponent } from './featured/components/manager/manager.component';
import { PageNotFoundComponent } from './featured/components/page-not-found/page-not-found.component';
import { SigninComponent } from './featured/components/signin/signin.component';
import { SignupComponent } from './featured/components/signup/signup.component';
import { HomeGuard } from './guard/home.guatd';
import { LayoutGuard } from './guard/layout.guard';

const routes: Routes = [
  {
    path: "",
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path:'home',
    component:HomeComponent,
    canActivate: [HomeGuard]
  },
  {
    path:'signup',
    component: SignupComponent
  },
  {
    path:'signin',
    component: SigninComponent
  },
  {
    path:'customer',
    component: CustomerComponent,
    canActivate: [LayoutGuard]
  },
  {
    path:'manager',
    component: ManagerComponent,
    canActivate: [LayoutGuard]
  },
  {
    path:'admin',
    component: AdminComponent,
    canActivate: [LayoutGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

