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
  selector: 'app-upload-option-document',
  standalone: true,
  imports: [CommonModule, Ng2SearchPipeModule, MatRadioModule, NgxTablePaginationModule, RouterModule, FormsModule,  
    SqlComponentsModule, SqlMenuComponent, FileUploadModule, HttpClientModule],
  templateUrl: './upload-option-document.component.html',
  styleUrls: ['./upload-option-document.component.css']
})
export class UploadOptionDocumentComponent  {

  @Output() onFileDropped = new EventEmitter<any>();
  @HostListener('dragover', ['$event']) onDragOver(evt: any) { evt.preventDefault();  evt.stopPropagation(); }
  @HostListener('dragleave', ['$event']) public onDragLeave(evt: any) { evt.preventDefault(); evt.stopPropagation(); }
  @HostListener('drop', ['$event']) public ondrop(evt: any) { this.uploadFiles(); }


  @Input() survey_id: any = '0';
  @Input() section_id: any = '0';
  @Input() document_id: any = '0';
  @Input() option_id: any = '0';
  @Input() asset_id: any = '0';
  @Input()  data: any; 
  
  document_name: any = '';
  document_type: any = '';

  dsc: any = '';
  
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router, 
    private _dataService: DataService,
    public http: HttpClient,
    private fileUploadService: DataService
  ) { }
  
  public uploadedFiles: Array<File> = [];

  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  uploading: any = 'N';
  adding: any = 'N';
  version: any = 'N';
  k: any;
  uploadedList: any = '';
  public fileUploadControl = new FileUploadControl();
  progress: number = 0;
  uid: any;
  
  ngOnDestroy(): void
  {
   //--   this._unsubscribeAll.next(null);
   //--   this._unsubscribeAll.complete();
  }
  
  closeIt() {
    this.close.emit('N');
  }
  
  uploadFiles() {
  for (const droppedFile of this.uploadedFiles) {
  
    if (localStorage.getItem('uid')===null) {
      this.uid="0";
    } else {
      this.uid=localStorage.getItem('uid')
    }
  
    let postData= {
      uid: this.uid,
      survey_id: this.survey_id,
      section_id: this.section_id,
      option_id: this.option_id,
      asset_id: this.asset_id,
      document_type: this.document_type,
      document_name: this.document_name,
      dsc: this.dsc
    }
  
    this.fileUploadService.uploadDocument(droppedFile, postData).subscribe((event: HttpEvent<any>) => {
    switch (event.type) {
      case HttpEventType.Sent:
        console.log('Request has been made!');
        break;
      case HttpEventType.ResponseHeader:
        console.log('Response header has been received!');
        setTimeout(() => {
            location.reload();
        }, 500);
        break;
      case HttpEventType.UploadProgress:
        this.progress = Math.round(event.loaded / event.total! * 100);
        console.log('Uploaded! ' + this.progress);
        break;
      case HttpEventType.Response:
        console.log('User successfully created!', event.body);
        setTimeout(() => {
          this.progress = 0;
          this.uploadedList+=droppedFile.name;
        }, 1500);
    }
  })
  }
  }
  
  drop() {
  alert('dropped')
  }
  
  public clear(): void {
  this.uploadedFiles = [];
  }
  
  }
  