import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,from } from 'rxjs';
import { tap } from 'rxjs/operators'

@Injectable()
export class DataService {

  constructor(private http:HttpClient) { }
  filteredLists:any=[];

  

  getAllData():Observable<any>{

    
      return this.http.get<any>('https://api.spacexdata.com/v3/launches?limit=100')
      .pipe(
          tap(data=>console.log(data))
      )
     
  }
  launchSuccess(value):Observable<any>{
      return this.http.get<any>(`https://api.spaceXdata.com/v3/launches?limit=100&launch_success=${value}`)
      .pipe(
          tap(data=>console.log(data))
      )
  }
  launchYear(value):Observable<any>{
      console.log(value);
      return this.http.get<any>(`https://api.spaceXdata.com/v3/launches?limit=100&launch_year=${value}`)
      .pipe(
          tap(data=>console.log(data))
      )
  }
  landingSuccess(value):Observable<any>{
      return this.http.get<any>(`https://api.spaceXdata.com/v3/launches?limit=100&land_success=${value}`)
      .pipe(
          tap(data=>console.log(data))
      )
  }
  launchAndLandFiter(launchValue,landValue):Observable<any>{
      return this.http.get<any>(`https://api.spaceXdata.com/v3/launches?limit=100&launch_success=${launchValue}&land_success=${landValue}`)
      .pipe(
          tap(data=>console.log(data))
      )
  }
  allFilter(launchYear,launchValue,landValue):Observable<any>{
        return this.http.get<any>(`https://api.spaceXdata.com/v3/launches?limit=100&launch_success=${launchValue}&land_success=${landValue}&launch_year=${launchYear}`)
        .pipe(
            tap(data=>console.log(data))
        )
    }
   

}