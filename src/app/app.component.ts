import { Component, HostListener, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public screenWidth: any;
  public screenHeight: any;
  contentStyle='width: 1600px!important; margin-left: 310px!important;';
  leftStyle='width: 300px!important';
  fontStyle="font-size: 16px;"
  data: any;
  myObs: Subscription;
  contentClass: any;
  leftClass: any = 'd-none d-sm-none d-lg-none d-xl-block col-2';

  setSizes() {
    if (this.data.name!=='sign-in') {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    if (this.screenWidth<=1746) {
      this.contentStyle='width: 1454px!important; margin-left: 290px!important;';
      this.leftStyle='width: 280px!important';
      this.fontStyle="font-size: 16px;"

      let j = this.screenWidth - 290;
      let s: string = 'width: '+j+'px!important; margin-left: 290px!important'; 
      this.contentStyle=s;

    }
    if (this.screenWidth<=1538) {
      this.contentStyle='width: 1264px!important; margin-left: 270px!important;';
      this.leftStyle='width: 260px!important';
      this.fontStyle="font-size: 14px;"

      let j = this.screenWidth - 270;
      let s: string = 'width: '+j+'px!important; margin-left: 270px!important'; 
      this.contentStyle=s;

    }   
    if (this.screenWidth<=1281) {
      this.contentStyle='width: 1027px!important; margin-left: 250px!important;';
      this.leftStyle='width: 240px!important';
      this.fontStyle="font-size: 14px;"

      let j = this.screenWidth - 250;
      let s: string = 'width: '+j+'px!important; margin-left: 250px!important'; 
      this.contentStyle=s;

    }            
    if (this.screenWidth < 1098) {
      this.contentStyle='margin-left: 5px!important;';
      this.leftStyle='width: 240px!important';
      this.contentClass="col-12";

      let j = this.screenWidth - 240;
      let s: string = 'width: '+j+'px!important; margin-left: 240px!important'; 
      this.contentStyle=s;

    }      
    if (this.screenWidth>1920) {
      let j = this.screenWidth - 330;
      let s: string = 'width: '+j+'px!important; margin-left: 330px!important'; 
      this.contentStyle=s;
     }    
    } else {
      this.leftClass='d-none';
      let j = this.screenWidth;
      let s: string = 'width: '+j+'px!important; margin-left: 0px!important'; 
      this.contentStyle=s;
    }
  }

  ngOnInit() {
       this.setSizes();
  }
  
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
      this.setSizes();  
  }

  constructor(private _dataService: DataService) { 
    this.myObs = this._dataService.locationSubject.subscribe(d => {
      this.data=d;
         this.setSizes();
 //     if (this.data.hideNav=='Y') {
   //     this.contentClass="col-12";
   //   } else {
    //    this.contentClass="col-10";
  //    }
   })
  }
}
