import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, Input, Output, EventEmitter, HostBindingDecorator, HostListener, HostBinding } from '@angular/core';
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
  selector: 'app-add-saa-form',
  standalone: true,
  imports: [CommonModule, Ng2SearchPipeModule, MatRadioModule, NgxTablePaginationModule, RouterModule, FormsModule,  
    SqlComponentsModule, SqlMenuComponent, FileUploadModule, HttpClientModule],
  templateUrl: './add-saa-form.component.html',
  styleUrls: ['./add-saa-form.component.css']
})
export class AddSaaFormComponent  {

  saa_name: any = '';

  @Input() data: any; 
  @Input() survey_id: any = '0';
  @Input() section_id: any = '0';
  @Input() document_id: any = '0';
  @Input() option_id: any = '0';
  @Input() asset_id: any = '0';
  @Input() saa_type: any = '0';
  document_name: any = '';
  dsc: any = '';
  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  
  closeIt() {
   this.close.emit('N');
 }

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router, 
    private _dataService: DataService,
    public http: HttpClient
  ) { }
  
  public uploadedFiles: Array<File> = [];
  uploading: any = 'N';
  adding: any = 'N';
  version: any = 'N';
  k: any;
  uploadedList: any = '';
  public fileUploadControl = new FileUploadControl();
  progress: number = 0;
  uid: any;
  id: any = 0;
  text: any = '';
  comment_type: any = '';

  ngOnDestroy(): void
  {
   //--   this._unsubscribeAll.next(null);
   //--   this._unsubscribeAll.complete();
  }

  postForm() {
      let formData: any = {
        id: this.id, 
        survey_id: this.survey_id,
        section_id: this.section_id,
        option_id: this.option_id,
        asset_id: this.asset_id,
        text: this.text,
        saa_type: this.saa_type,
        saa_name: this.saa_name
      }
      console.log(formData);
      this._dataService.postForm("post-section-saa", formData).subscribe((data:any)=>{
//        this.data=data;
        location.reload();
       });
    }

    toggleAdd() {
      if (this.adding=='Y') {
        this.adding='N';
      } else { 
        this.adding='Y';
        this.id='';
        this.text='';
        this.comment_type=1;
      }
    }

    edit(m : any) {
      this.adding='Y';
        this.id=m.id;
        this.text=m.text;
        this.comment_type=m.comment_type;
    }    

  }  