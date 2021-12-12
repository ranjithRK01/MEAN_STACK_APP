import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SubSink } from 'subsink';
import { User } from '../../model/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit,OnDestroy{
  submitted = false;
  loading = false;
  user: User = {} ;
  signupForm : FormGroup | any;
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
    this.signupForm = this.formBuilder.group({
      'email': [null, [Validators.required, Validators.email]],
      'userName': [null, [Validators.required]],
      'password': [null, [Validators.required,Validators.minLength(6)]],
      'role': [null, [Validators.required]],
    });
  }
  get f() { return this.signupForm.controls; }


  onSubmit() {
    if (this.signupForm.invalid) {
        return;
    }
    this.user = this.signupForm.value;
    this.subs.add(this.userService.signupUser(this.user).subscribe({
      next:(data:any)=>{
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
      this.signupForm.reset();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
