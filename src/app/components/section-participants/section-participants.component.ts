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
import { SectionBackgroundComponent } from 'src/app/components/section-background/section-background.component';

@Component({
  selector: 'app-section-participants',
  standalone: true,
  imports: [CommonModule, SectionBackgroundComponent, Ng2SearchPipeModule, MatRadioModule, NgxTablePaginationModule, RouterModule, FormsModule,  
    SqlComponentsModule, SqlMenuComponent, FileUploadModule, HttpClientModule],
  templateUrl: './section-participants.component.html',
  styleUrls: ['./section-participants.component.css']
})
export class SectionParticipantsComponent  {

  @Input() data: any; 
  @Input() survey_id: any = '0';
  @Input() section_id: any = '0';
  @Input() document_id: any = '0';
  @Input() option_id: any = '0';
  @Input() asset_id: any = '0';

  document_name: any = '';
  dsc: any = '';
  full_name: any = '';
  org_name: any = '';
  title: any = '';
  contact_phone: any = '';
  contact_email: any = '';
  bio: any = '';

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
        survey: this.survey_id,
        full_name: this.full_name,
        org_name: this.org_name,
        title: this.title,
        contact_email: this.contact_email,
        contact_phone: this.contact_phone,
        bio: this.bio
      }
      console.log(formData);
      this._dataService.postForm("post-participant", formData).subscribe((data:any)=>{
//        this.data=data;
          location.reload()
       });
    }

    toggleAdd() {
      if (this.adding=='Y') {
        this.adding='N';
      } else { 
        this.adding='Y';
        this.id='';
        this.bio='';
        this.full_name='';
        this.org_name='';
        this.title='';
        this.contact_phone='';
        this.contact_email='';
      }
    }

    edit(m : any) {
      this.adding='Y';
        this.id=m.id;
        this.full_name=m.full_name;
        this.survey_id=m.survey_id;
        this.org_name=m.org_name;
        this.title=m.title;
        this.contact_phone=m.contact_phone;
        this.contact_email=m.contact_email;
        this.bio=m.bio;
    }    

  }  