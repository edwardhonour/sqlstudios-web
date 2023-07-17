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
  selector: 'app-smart-upload',
  standalone: true,
  imports: [CommonModule, Ng2SearchPipeModule, MatRadioModule, NgxTablePaginationModule, RouterModule, FormsModule,  
    SqlComponentsModule, SqlMenuComponent, FileUploadModule, HttpClientModule],
  templateUrl: './smart-upload.component.html',
  styleUrls: ['./smart-upload.component.css']
})
export class SmartUploadComponent {

  @Output() onFileDropped = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();
  @HostListener('dragover', ['$event']) onDragOver(evt: any) { evt.preventDefault();  evt.stopPropagation(); }
  @HostListener('dragleave', ['$event']) public onDragLeave(evt: any) { evt.preventDefault(); evt.stopPropagation(); }
  @HostListener('drop', ['$event']) public ondrop(evt: any) { this.uploadFiles(); }
  
  @Input() workspace_id: any = '0';
  @Input() document_id: any = '0';
  
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router, 
    private _dataService: DataService,
    public http: HttpClient,
    private fileUploadService: DataService
  ) { }
  
  public uploadedFiles: Array<File> = [];
  data: any; 
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
  
  cancelUpload() {
    this.cancel.emit('Y');
    if (this.uploadedList!='') location.reload();
  }  
  
  uploadFiles() {
  for (const droppedFile of this.uploadedFiles) {
  
    if (localStorage.getItem('uid')===null) {
      this.uid="0";
    } else {
      this.uid=localStorage.getItem('uid')
    }
  
    let postData= {
      workspace_id: this.workspace_id,
      document_id: this.document_id,
      uid: this.uid
    }
  
    this.fileUploadService.upload(droppedFile, postData).subscribe((event: HttpEvent<any>) => {
      console.log(event.type)
      switch (event.type) {
      case HttpEventType.Sent:
        console.log('Request has been made!');
        break;
      case HttpEventType.ResponseHeader:
        console.log('Response header has been received!');
        setTimeout(() => {
          this.progress = 0;
   //       location.reload();
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
          this.uploadedList+=droppedFile.name+'<br>';
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
  