import { Component } from '@angular/core';
import { DataService } from './data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private service: DataService, private router: Router) {}
  title = 'space-x-app';
  btnValues: any = [
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
  ];
  yearValue: any = null;
  launchValue: any = null;
  landingValue: any = null;
  isClicked = [];
  prevYearClicked: number = null;
  launchClicked = [];
  landingClicked = [];

  yearFilter(yearValue, i) {
    this.yearValue = yearValue;
    if (i !== this.prevYearClicked && this.prevYearClicked != null) {
      this.isClicked[this.prevYearClicked] = false;
    }
    console.log(yearValue);
    this.isClicked[i] = true;
    this.prevYearClicked = i;

    this.filter(this.yearValue, this.launchValue, this.landingValue);
    // this.isClicked[i]=false;
  }
  successfulLaunch(launchValue) {
    if (launchValue === true) {
      this.launchClicked[0] = true;
      this.launchClicked[1] = false;
    } else {
      this.launchClicked[1] = true;
      this.launchClicked[0] = false;
    }

    this.launchValue = launchValue;

    this.filter(this.yearValue, this.launchValue, this.landingValue);
    console.log(launchValue);
  }
  successfulLanding(landingValue) {
    if (landingValue === true) {
      this.landingClicked[0] = true;
      this.landingClicked[1] = false;
    } else {
      this.landingClicked[1] = true;
      this.landingClicked[0] = false;
    }
    this.landingValue = landingValue;
    this.filter(this.yearValue, this.launchValue, this.landingValue);
    console.log(landingValue);
  }
  filter(yearValue, launchValue, landingValue) {
    console.log(yearValue, launchValue, landingValue);
    if (yearValue && launchValue === null && landingValue === null) {
      console.log(yearValue);
      this.service.launchYear(yearValue).subscribe({
        next: (data) => {
          console.log(data),
            this.router.navigate(['/filteredList'], { state: { data } });
        },
        error: (err) => console.log(err),
      });
    } else if (
      (launchValue || launchValue === false) &&
      landingValue === null &&
      yearValue === null
    ) {
      this.service.launchSuccess(launchValue).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigate(['/filteredList'], { state: { data } });
        },
        error: (err) => console.log(err),
      });
    } else if (
      (landingValue || landingValue === false) &&
      launchValue === null &&
      yearValue === null
    ) {
      this.service.landingSuccess(landingValue).subscribe({
        next: (data) => {
          console.log(data),
            this.router.navigate(['/filteredList'], { state: { data } });
        },
        error: (err) => console.log(err),
      });
    } else if (
      (launchValue || launchValue === false) &&
      (landingValue || landingValue === false) &&
      yearValue === null
    ) {
      this.service.launchAndLandFiter(launchValue, landingValue).subscribe({
        next: (data) => {
          console.log(data);
          this.service.filteredLists = data;
          //  console.log(this.service.filteredLists);
          //  this.service.filteredLists=[];

          this.router.navigate(['/filteredList'], { state: { data } });
        },
        error: (err) => console.log(err),
      });
    } else if (
      yearValue &&
      (launchValue || launchValue === false) &&
      (landingValue || landingValue === false)
    ) {
      this.service.allFilter(yearValue, launchValue, landingValue).subscribe({
        next: (data) => {
          console.log(data);
          this.service.filteredLists = data;
          // console.log(this.service.filteredLists);
          //  this.service.filteredLists=[];
          this.router.navigate(['/filteredList'], { state: { data } });
        },
        error: (err) => console.log(err),
      });
    }
  }
}
