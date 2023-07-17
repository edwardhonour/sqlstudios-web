import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-vert-side-nav',
  standalone: true,
  imports: [CommonModule, MatRadioModule, 
],
  templateUrl: './vert-side-nav.component.html',
  styleUrls: ['./vert-side-nav.component.css']
})
export class VertSideNavComponent implements OnInit, OnChanges {

  @Input() source: any = '';
  @Input() open: any = 'N'; 
  isScreenSmall!: boolean;

  constructor(private _dataService: DataService) {}

  user: any;

  ngOnInit(): void {
//    let w=window.innerWidth;
//    if (w<1600) {
//      this.isScreenSmall=true;      
//    } else {
//      this.isScreenSmall=false;
//    }
    
  }

  ngOnChanges(): void {
    let w=window.innerWidth;
    if (this.open=='Y') {
        this.isScreenSmall=false;
    } else {
      if (w<1600) {
        this.isScreenSmall=true;
      } else {
        this.isScreenSmall=false;
      }
    }
    console.log(this.isScreenSmall)
    this.postForm();
  }

  postForm() {
    this._dataService.getUser().subscribe((data:any)=>{
      this.user=data.user;
 //     this.navigation=data.navigation;
      console.log(data);
     });
  }
}
