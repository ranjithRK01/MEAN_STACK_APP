import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SubSink } from 'subsink';
import { User } from '../../model/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit,OnDestroy {
   ELEMENT_DATA: User[] = [];
   private subs = new SubSink();
   constructor(private userService: UserService){}
   ngOnInit() {
    this.subs.add(this.userService.getAdminList().subscribe({
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




