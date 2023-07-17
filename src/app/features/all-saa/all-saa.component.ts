import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, Output, EventEmitter, HostBindingDecorator, HostListener, HostBinding } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FormsModule,  FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { DataService } from 'src/app/data.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxTablePaginationModule } from 'ngx-table-pagination';
import { MatRadioModule } from '@angular/material/radio';
import { SqlComponentsModule, SqlMenuComponent } from 'sql-components';
import { FileUploadModule, FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-all-saa',
  standalone: true,
  imports: [CommonModule, Ng2SearchPipeModule, MatRadioModule, NgxTablePaginationModule, RouterModule, 
    FormsModule, SqlComponentsModule, SqlMenuComponent, FileUploadModule, HttpClientModule],
  templateUrl: './all-saa.component.html',
  styleUrls: ['./all-saa.component.css']
})
export class AllSaaComponent  implements OnInit
{

  data: any;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router, 
    private _dataService: DataService,
    public http: HttpClient,
    private fileUploadService: DataService
) { }

ngOnInit(): void
{      
  let d = { name: 'home', link: '/', count: 0, isSmall: 'N', hideNav: 'N', hideHeader: 'N'};
  this._dataService.locationSubject.next(d);

        this._activatedRoute.data.subscribe(({ 
          data, menudata, userdata })=> { 
          this.data=data;
//              this.navigation=menudata
          if (this.data.user.force_logout>0) {
              localStorage.removeItem('uid');
              this._router.navigate(['/forced-off',this.data.user.force_logout]);
          }
        }) 
}

}
