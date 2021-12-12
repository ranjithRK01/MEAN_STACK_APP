import { AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges,OnInit {

  @Input() DataList: User[] =[]
  displayedColumns = ['userName', 'email', 'role'];
  dataSource = new MatTableDataSource<User>(this.DataList);

  constructor(){}

  ngOnChanges() {
    this.dataSource = new MatTableDataSource<User>(this.DataList);
  }
   ngOnInit() {}
}

