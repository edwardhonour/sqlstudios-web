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
  selector: 'app-upload-option-photo',
  standalone: true,
  imports: [CommonModule, Ng2SearchPipeModule, MatRadioModule, NgxTablePaginationModule, RouterModule, FormsModule,  
    SqlComponentsModule, SqlMenuComponent, FileUploadModule, HttpClientModule],
  templateUrl: './upload-option-photo.component.html',
  styleUrls: ['./upload-option-photo.component.css']
})
export class UploadOptionPhotoComponent   {

  @Output() onFileDropped = new EventEmitter<any>();
  @Output() close = new EventEmitter<any>();

  @HostListener('dragover', ['$event']) onDragOver(evt: any) { evt.preventDefault();  evt.stopPropagation(); }
  @HostListener('dragleave', ['$event']) public onDragLeave(evt: any) { evt.preventDefault(); evt.stopPropagation(); }
  @HostListener('drop', ['$event']) public ondrop(evt: any) { this.uploadFiles(); }
  
  @Input() workspace_id: any = '0';
  @Input() document_id: any = '0';
  
  @Input() survey_id: any = '0';
  @Input() section_id: any = '0';
  @Input() option_id: any = '0';
  @Input() asset_id: any = '0';
  @Input() data: any;
  
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router, 
    private _dataService: DataService,
    public http: HttpClient,
    private fileUploadService: DataService
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
  dsc: any;
  photo_name: any = '';
  photo_type: any = '';

  ngOnDestroy(): void
  {
   //--   this._unsubscribeAll.next(null);
   //--   this._unsubscribeAll.complete();
  }
  
  doClose() {
    this.close.emit('Y');
  }
  
  uploadFiles() {
  for (const droppedFile of this.uploadedFiles) {
  
    if (localStorage.getItem('uid')===null) {
      this.uid="0";
    } else {
      this.uid=localStorage.getItem('uid')
    }
  
    let postData= {
      survey_id: this.survey_id,
      section_id: this.section_id,
      option_id: this.option_id,
      asset_id: this.asset_id,
      photo_name: this.photo_name,
      photo_type: this.photo_type,
      dsc: this.dsc,
      uid: this.uid
    }
  
    this.fileUploadService.uploadPhoto(droppedFile, postData).subscribe((event: HttpEvent<any>) => {
      alert('huh')
    switch (event.type) {
      case HttpEventType.Sent:
        console.log('Request has been made!');
        break;
      case HttpEventType.ResponseHeader:
        console.log('Response header has been received!');
        setTimeout(() => {
          this.doClose();
//  location.reload();
        }, 1500);
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
  