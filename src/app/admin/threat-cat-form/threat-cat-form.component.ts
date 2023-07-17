import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FormsModule,  FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxTablePaginationModule } from 'ngx-table-pagination';

import { MatRadioModule } from '@angular/material/radio';
import { VertSideNavComponent } from 'src/app/layout/panels/vert-side-nav/vert-side-nav.component'; 
import { DataService } from 'src/app/data.service';
import { SitebarWrapperComponent } from 'src/app/template/sitebar-wrapper/sitebar-wrapper.component';

 import {MatDatepickerInputEvent} from '@angular/material/datepicker';
 import { MatInputModule } from '@angular/material/input';
 import { MatDatepickerModule } from '@angular/material/datepicker';
 import { MatFormFieldAppearance, MatFormFieldControl } from '@angular/material/form-field';
 import { MatIconModule  }  from '@angular/material/icon';
 import { MatFormFieldModule } from '@angular/material/form-field';
 import { MatNativeDateModule } from '@angular/material/core';
 import { MomentDateModule } from '@angular/material-moment-adapter';
 import { DatePipe } from '@angular/common';
 import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
 import {MomentDateAdapter} from '@angular/material-moment-adapter';
 import { Subscription } from 'rxjs';

@Component({
  selector: 'app-threat-cat-form',
  standalone: true,
  imports: [CommonModule, VertSideNavComponent, 
    Ng2SearchPipeModule, RouterModule, SitebarWrapperComponent,
    NgxTablePaginationModule, MatRadioModule,
    FormsModule, MatInputModule, MomentDateModule, 
      MatDatepickerModule, MatFormFieldModule, MatNativeDateModule],
  templateUrl: './threat-cat-form.component.html',
  styleUrls: ['./threat-cat-form.component.css']
})
export class ThreatCatFormComponent implements OnInit {

  @Input() col: string = '';
  @Input() data: any;
  @Input() class: any = '';
  @Input() style: any = '';
  @Input() hint: string = '';
  @Input() icon: string = '';
  @Input() label: string = 'Label not set';
  @Input() placeholder: any = '';
  appearance: MatFormFieldAppearance = 'outline';
  @Input() bs_row: any = 'Y';
  @Input() bs_col: any = 'col-12';
  @Input() top_label: any = 'N';
  counter: number = 0;
  @Output()
  change: EventEmitter<any> = new EventEmitter<any>();  
  error: any;

  start_date: any;
  complete_date: any;
  
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _dataService: DataService,
    private _router: Router,
    private datePipe: DatePipe,
    public http: HttpClient  // used by upload
) { }

ngOnInit(): void
{      
  let d = { name: 'home', link: '/', count: 0, isSmall: 'N', hideNav: 'N', hideHeader: 'N'};
  this._dataService.locationSubject.next(d);

        this._activatedRoute.data.subscribe(({ 
          data, menudata, userdata })=> { 
          this.data=data;
          if (this.data.user.force_logout>0) {
              localStorage.removeItem('uid');
              this._router.navigate(['/forced-off',this.data.user.force_logout]);
          }
        }) 
}

  handleStartDateChange() {
    this.data.formData['start_date']=this.datePipe.transform(this.start_date, 'yyyy-MM-dd');
 }

 handleCompleteDateChange() {
  this.data.formData['est_complete_date']=this.datePipe.transform(this.complete_date, 'yyyy-MM-dd');
}

 handleOrgNameChange() {
 }

 postForm() {
  this._dataService.postForm("post-add-survey", this.data.formData).subscribe((data:any)=>{
    if (data.error_code=="0") {
      localStorage.setItem('survey',data.id);
      this._router.navigate(['/survey/7']);
    } else {     
       this.error=data.error_message
    }
  });
}


}
