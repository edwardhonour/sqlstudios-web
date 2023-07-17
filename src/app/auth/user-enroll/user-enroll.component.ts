import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DataService } from '/Users/user/sql-components-site/src/app/data.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { VertSideNavComponent } from 'src/app/layout/panels/vert-side-nav/vert-side-nav.component';

@Component({
  selector: 'app-user-enroll',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatDatepickerModule, VertSideNavComponent,
    MatFormFieldModule, MatInputModule, MomentDateModule, DatePipe, RouterModule],
  templateUrl: './user-enroll.component.html',
  styleUrls: ['./user-enroll.component.css']
})
export class UserEnrollComponent implements OnChanges, OnInit {
    
  animations?: any[];
  datepipe: DatePipe = new DatePipe('en-US')

  adding: any = 'N';
  formData: any = {
    id: '',
    email: '',
    company_name: '',
    user_name: '',
    role: '',
    address: '',
    address_2: '',
    city: '',
    state: '',
    zip: ''
  };
 
  ngOnChanges() {

  }

  addFacilityTenant() {
    this.adding='Y'
}

  addFacilityManager() {
      this.adding='Y'
  }

  addSecurityForce() {
    this.adding='Y'
  }

  addTenant() {
    this.adding='Y'
  }

  addPSA() {
    this.adding='Y'
  }

    ngOnInit(): void
    {      

    }

    constructor(
      private _dataService: DataService,
  ) { }

postUpdate() {
  console.log(this.formData);
  this._dataService.postForm("post-enroll-form", this.formData).subscribe((data:any)=>{
  this.adding="N";
});
}

}

