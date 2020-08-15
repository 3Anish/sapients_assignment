import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute, Router, RouterEvent, NavigationEnd, Data } from '@angular/router';
import { map, shareReplay, filter, takeUntil } from 'rxjs/operators';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {
  allData: any=[];
  navigationSubscription: any;
  message: string;

  constructor(private activatedRoute:ActivatedRoute,private router:Router,private service:DataService) { }
  state$: Observable<object>;
  public destroyed = new Subject<any>();

  ngOnInit(): void {
    
    this.fetchData();

    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        console.log(e);
       this.fetchData();
      }
      // else{
      //   console.log("SOmething fisshy");
      // }
      console.log(this.allData);
    });
   
  }
    // this.router.events.pipe(
    //   filter((event: RouterEvent) => {
    //     console.log(event); 
    //    return event instanceof NavigationEnd;
    //   }),
    //   takeUntil(this.destroyed)
    // ).subscribe((data) => {
    //   console.log(data);
    //   this.fetchData();
    // });
  //  this.fetchData();
  
 fetchData(){
            this.state$ = this.activatedRoute.paramMap
            .pipe(
            map(() => window.history.state)
            // shareReplay(1) 

            )
            // this.activatedRoute.paramMap.subscribe(next)
            this.state$.subscribe({
              next:obj=>{
                this.allData=obj;
                this.allData=this.allData.data;
                if(this.allData===undefined){
                  console.log('1');

                  //this.allData=this.service.filteredLists;
                  this.router.navigateByUrl('/');
                }
                if(this.allData.length===0){
                  console.log('1');

                  this.message="No Records Found !";
                }
               
                console.log(this.allData);
                console.log(this.service.filteredLists);
              },
              error:err=>console.log(err)
            })
            console.log(this.state$);
            // console.log(this.service.filteredLists);
            // this.allData=this.service.filteredLists;
            console.log(this.allData);
    }
   
  
  //       console.log(this.state$);
  // }
  ngOnDestroy(): void {
   this.navigationSubscription.unsubscribe();
    // console.log("destroy called");
    // this.destroyed.next();
    // this.destroyed.complete();
  }

}


