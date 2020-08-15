import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  allData:any=[];

  constructor(private dataService:DataService) { }
  ngOnInit(): void {
    this.dataService.getAllData().subscribe({
      next:data=>{
        this.allData=data;
        console.log(this.allData);
      },
      error:err=>console.log(err)
    })
  }
 

}
