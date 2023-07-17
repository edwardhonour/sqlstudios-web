import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from 'src/app/data.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent {

  myObs!: Subscription;
  data: any;
  counter: number = 0;

  constructor(private _dataService: DataService) { 
    this.myObs = this._dataService.locationSubject.subscribe(d => {
      this.data=d;
      this.counter++;
      console.log('page_header: ' + this.counter)
      console.log(d)
    })
  }

}
