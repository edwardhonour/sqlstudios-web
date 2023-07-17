import { Component, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from 'src/app/data.service';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sitebar-wrapper',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './sitebar-wrapper.component.html',
  styleUrls: ['./sitebar-wrapper.component.css']
})
export class SitebarWrapperComponent implements OnDestroy {

  public screenWidth: any;
  public screenHeight: any;
  data: any;
  class: any;
  myObs: Subscription;

  innerStyle: string = 'width: 240px!important';
  topStyle: string = 'width: 300px!important';
  fontStyle="font-size: 16px!important;"

  ngOnDestroy() {
      this.myObs.unsubscribe();
  }

  ngOnInit() {

  }
  

  constructor(private _dataService: DataService) { 
    this.myObs = this._dataService.locationSubject.subscribe(d => {
      this.data=d;
      if (this.data.hideNav=='Y') {
        this.class="";
      } else {
        this.class="";
      }
    })
  }

}
