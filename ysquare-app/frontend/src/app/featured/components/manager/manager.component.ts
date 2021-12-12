import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { User } from '../../model/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit,OnDestroy {
  private subs = new SubSink();
  ELEMENT_DATA: User[] = [];
  constructor(private userService: UserService){}
   ngOnInit() {
    this.subs.add(this.userService.getManagerList().subscribe({
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
