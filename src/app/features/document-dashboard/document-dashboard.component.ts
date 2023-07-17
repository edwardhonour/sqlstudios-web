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
import { AddDocumentFormComponent } from 'src/app/components/add-document-form/add-document-form.component';
import { SqlUploadComponent } from 'src/app/components/sql-upload/sql-upload.component';
import { SmartUploadComponent } from 'src/app/components/smart-upload/smart-upload.component';
import { SitebarWrapperComponent } from 'src/app/template/sitebar-wrapper/sitebar-wrapper.component';

@Component({
  selector: 'app-document-dashboard',
  standalone: true,
  imports: [CommonModule, Ng2SearchPipeModule, MatRadioModule, NgxTablePaginationModule, RouterModule, FormsModule, SqlUploadComponent, SmartUploadComponent,
    SqlComponentsModule, SqlMenuComponent, FileUploadModule, HttpClientModule, AddDocumentFormComponent, SitebarWrapperComponent],
  templateUrl: './document-dashboard.component.html',
  styleUrls: ['./document-dashboard.component.css']
})
export class DocumentDashboardComponent {

@Output() onFileDropped = new EventEmitter<any>();

@HostListener('dragover', ['$event']) onDragOver(evt: any) {
  evt.preventDefault();
  evt.stopPropagation();
}
//Dragleave listener, when something is dragged away from our host element
@HostListener('dragleave', ['$event']) public onDragLeave(evt: any) {
  evt.preventDefault();
  evt.stopPropagation();
}

@HostListener('drop', ['$event']) public ondrop(evt: any) {
//    evt.preventDefault();
//    evt.stopPropagation();
//    let files = evt.dataTransfer.files;
//    if (files.length > 0) {
//      this.onFileDropped.emit(files)
//    }
this.uploadFiles();
}

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
sharing: any = 'N';
emailing: any = 'N';
inviting: any = 'N';

k: any;
uploadedList: any = '';
public fileUploadControl = new FileUploadControl();
progress: number = 0;
uid: any = 0;
doc_id: any = 0;
share_name: any = '';

formData: any = {
  org_id: 0,
  full_name: '',
  custom_msg: '',
  email: '',
  default_role: '0',
  share_url: ''
}

metaData: any = {
  doc_id: 0,
  doc_name: '',
  doc_dsc: ''
}

ngOnInit(): void {      
        this._activatedRoute.data.subscribe(({ 
          data, menudata, userdata })=> { 
          this.data=data;
          this.metaData.id=this.data.formData.id;
          this.metaData.doc_dsc=this.data.formData.document_dsc;
          this.metaData.doc_name=this.data.formData.document_name;
          if (this.data.user.force_logout>0) {
              localStorage.removeItem('uid');
              this._router.navigate(['/sign-in']);

          } else {
            this.uploading='N'
            this.uid=localStorage.getItem('uid');
          }
        }) 
}

toggleUpload() {
  if (this.uploading=='Y') {
    this.uploading='N';
  } else {
    this.uploading='Y';
    this.adding='N';
  }
}

toggleShare() {
  if (this.sharing=='Y') {
    this.sharing='N';
  } else {
    this.sharing='Y';
  }
}

toggleEmail() {
  if (this.emailing=='Y') {
    this.emailing='N';
  } else {
    this.emailing='Y';
  }
}

closeInvite() {
  this.inviting='N';
}

toggleAdd() {
  if (this.adding=='Y') {
    this.adding='N';
  } else {
    this.adding='Y';
    this.uploading='N';
  }
}

toggleInviteT() {
  if (this.emailing=='Y') {
    this.emailing='N';
  } else {
    this.emailing='Y';
  }
}

toggleVersion(m: any) {
  this.k=m;
  this.doc_id=m.id;
  if (this.version=='Y') {
    this.version='N';
  } else {
    this.version='Y';
  }
}

processClick(m: any) {

  if (m.id=='UPLOAD') { 
    this.adding='N'; 
    this.uploading='Y';
    this.sharing='N';
    this.emailing='N';
    this.inviting='N';
  }
  if (m.id=='EDIT') { 
    this.adding='Y'; 
    this.uploading='N';
    this.sharing='N';
    this.emailing='N';
    this.inviting='N';
  }
  if (m.id=='SHARE') { 
    this.adding='N'; 
    this.uploading='N';
    this.sharing='Y';
    this.emailing='N';
    this.inviting='N';
  }
  if (m.id=='EMAIL') { 
    this.adding='N'; 
    this.uploading='N';
    this.sharing='N';
    this.emailing='Y';
    this.inviting='N';
  }
  if (m.id=='TEAM') { 
    this.adding='N'; 
    this.uploading='N';
    this.sharing='N';
    this.emailing='N';
    this.inviting='Y';
  }
}

ngOnDestroy(): void
{
 //--   this._unsubscribeAll.next(null);
 //--   this._unsubscribeAll.complete();
}

previewVersion(m: any) {

}

downloadFile(version: any, m:any) {
  location.href="https://protectivesecurity.org/down.php?id=" + m.storage_key + "&q=" + version;
}

uploadFiles() {
for (const droppedFile of this.uploadedFiles) {
  console.log(droppedFile.name);
  console.log(droppedFile.size);
  console.log(droppedFile.type);
  let postData= {
    one: 'one',
    two: 'two'
  }
  this.fileUploadService.upload(droppedFile, postData).subscribe((event: HttpEvent<any>) => {
  switch (event.type) {
    case HttpEventType.Sent:
      console.log('Request has been made!');
      break;
    case HttpEventType.ResponseHeader:
      console.log('Response header has been received!');
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

sendInviteT() {
  this.formData.org_id = this.data.formData.id;
  this._dataService.postAuth("invite-team-member", this.formData).subscribe((data:any)=>{
    location.reload();  
  });
}

sendLink() {
  this.formData.org_id = this.data.formData.id;
  this._dataService.postAuth("send-email-link", this.formData).subscribe((data:any)=>{
    location.reload();  
  });
}

postMeta() {
  this._dataService.postForm("update-doc-metadata", this.metaData).subscribe((data:any)=>{
    location.reload();  
  });
}

}
