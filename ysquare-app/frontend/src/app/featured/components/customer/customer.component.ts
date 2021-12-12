import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { User } from '../../model/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit,OnDestroy {
  ELEMENT_DATA: User[] = [];
  private subs = new SubSink();
  constructor(private userService: UserService){}
   ngOnInit() {
    this.subs.add(this.userService.getCustomerList().subscribe({
      next: (data: User | any) => {
       this.ELEMENT_DATA = data.data;
      },
      error: (error) => {
        console.log(error,"error");
      },
      complete: () => {
       console.log("complete");
      }
    }))
   }

   ngOnDestroy() {
     this.subs.unsubscribe();
   }
}
