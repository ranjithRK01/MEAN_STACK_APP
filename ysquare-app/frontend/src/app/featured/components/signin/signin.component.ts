import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../model/user.model';
import { UserService } from '../../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit,OnDestroy{
  submitted = false;
  loading = false;
  user: User = {} ;
  signinForm : FormGroup | any;
  private subs = new SubSink();
  constructor( private formBuilder: FormBuilder,
               private router: Router,
               private userService: UserService,
               private cookieService: CookieService
               ) { }

  ngOnInit(): void {
     this.initForm();
  }

  initForm(): void {
    this.signinForm = this.formBuilder.group({
      'email': [null, [Validators.required, Validators.email]],
      'password': [null, [Validators.required,Validators.minLength(6)]],
    });
  }
  get f() { return this.signinForm.controls; }


  onSubmit() {
    this.submitted = true;
    if (this.signinForm.invalid) {
        return;
    }
    this.user = this.signinForm.value;
    this.subs.add(this.userService.signinUser(this.user).subscribe({
      next:(data:User | any) => {
       this.cookieService.set('jwt',JSON.stringify(data.data))
      },
      error:(error)=>{
         console.log(error);
      },
      complete:()=>{
        this.submitted = true;
        this.loading = true;
        this.initForm();
        this.router.navigateByUrl('/home');
        this.userService.updateListers();
      }
    }))
  }

    onReset() {
      this.submitted = false;
      this.signinForm.reset();
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
