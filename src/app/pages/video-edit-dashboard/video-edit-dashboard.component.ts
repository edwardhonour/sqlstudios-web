import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, Output, EventEmitter, HostBindingDecorator, HostListener, HostBinding, ViewChild } from '@angular/core';
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
  selector: 'app-video-edit-dashboard',
  standalone: true,
  imports: [CommonModule, Ng2SearchPipeModule, MatRadioModule, NgxTablePaginationModule, RouterModule, FormsModule, SqlUploadComponent, SmartUploadComponent,
    SqlComponentsModule, SqlMenuComponent, FileUploadModule, HttpClientModule, AddDocumentFormComponent, SitebarWrapperComponent],
  templateUrl: './video-edit-dashboard.component.html',
  styleUrls: ['./video-edit-dashboard.component.css']
})
export class VideoEditDashboardComponent  {

  @Output() onFileDropped = new EventEmitter<any>();
  @ViewChild("videoPlayer") videoplayer!: HTMLVideoElement;

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
) { 

}
  public uploadedFiles: Array<File> = [];
  data: any; 


  button_visible: any = 'N';

  uploading: any = 'N';
  adding: any = 'N';
  inviting: any = 'N';
  sharing: any = 'N';
  managing: any = 'N';
  show_import: any = 'N';
  show_upload: any = 'N';
  media_type: any = '';
  section: any='BACKGROUN';

  version: any = 'N';
  k: any;
  uploadedList: any = '';
  public fileUploadControl = new FileUploadControl();
  progress: number = 0;
  uid: any = 0;
  doc_id: any = 0;
  rendering: any = 'N';

  formData: any = {
    org_id: 0,
    full_name: '',
    custom_msg: '',
    email: '',
    default_role: '0'
  }

  currentTime: number=0;;


  setCurrentTime(data: any) {
     this.currentTime = data.target.currentTime;
     console.log(this.currentTime);
    }

    render() {

      this.rendering='Y';
      this._dataService.postForm("render", this.data.backData).subscribe((data:any)=>{
            this.rendering='C';
      });

    }

  setBeginning() {
    this.data.backData['start_time']=0;
  }

  setStart() {
    this.data.backData['start_time']=this.currentTime;
  }

  doReload() {
      location.reload();
  }

  setEnd() {
    this.data.backData['end_time']=this.currentTime;
  }

  setLong() {
    this.data.backData['end_time']=this.data.formData['duration'];
  }

  ngOnInit(): void {      
          this._activatedRoute.data.subscribe(({ 
            data, menudata, userdata })=> { 
            this.data=data;
            if (this.data.user.force_logout>0) {
                localStorage.removeItem('uid');
                this._router.navigate(['/sign-in']);

            } else {
              this.uploading='N'
              this.uid=localStorage.getItem('uid');
            }
          }) 
  }

  getTime() {
    console.log(this.videoplayer);
  }

  addVideo(m:any) {
    this.data.importData['import_id']=m.id;
    this.data.importData['import_type']='video';
    this.postImport();
  }

  addAudio(m:any) {
    this.data.importData['import_id']=m.id;
    this.data.importData['import_type']='audio';
    this.postImport();
  }
selectBack(m:any) {
  this.data.backData['image_id']=m.id;
}

selectPosition(m:any) {
  this.data.backData['image_id']=m;
}
postBackgroundChange() {
  this._dataService.postForm("post-background-change", this.data.backData).subscribe((data:any)=>{
        this.data=data;
  });
}
postPositionChange() {
  this._dataService.postForm("post-position-change", this.data.backData).subscribe((data:any)=>{
        this.data=data;
  });
}
postOverlay() {
  this._dataService.postForm("post-overlay", this.data.overData).subscribe((data:any)=>{
        this.data=data;
  });
}

postCopy() {
  this._dataService.postForm("post-copy", this.data.copyData).subscribe((data:any)=>{
        this.data=data;
  });
}

postDelete() {
  this._dataService.postForm("post-delete", this.data.backData).subscribe((data:any)=>{
        this.data=data;
  });
}

postTrim() {
  this._dataService.postForm("post-trim",   this.data.backData).subscribe((data:any)=>{
        this.data=data;
  });
}

postRestore() {
  this._dataService.postForm("post-background-change", this.data.backData).subscribe((data:any)=>{
        this.data=data;
  });
}

postAddAudio() {
  this._dataService.postForm("post-background-change", this.data.backData).subscribe((data:any)=>{
        this.data=data;
  });
}
postText() {
  this._dataService.postForm("post-text", this.data.overData).subscribe((data:any)=>{
        this.data=data;
  });
}


  postImport() {
    this._dataService.postForm("post-import", this.data.importData).subscribe((data:any)=>{
    //    this.data=data;
        location.reload();
    //    this._router.navigate(['/job-queue']);
     });
  }

  toggleUpload() {
    if (this.uploading=='Y') {
      this.uploading='N';
    } else {
      this.uploading='Y';
    }
  }

  toggleImport() {
    if (this.show_import=='Y') {
      this.show_import='N';
    } else {
      this.show_import='Y';
    }
  }


closeUpload() {
  this.uploading='N';
}
  toggleAdd() {
    if (this.adding=='Y') {
      this.adding='N';
    } else {
      this.adding='Y';
    }
  }

  toggleInviteT() {
    if (this.inviting=='Y') {
      this.inviting='N';
    } else {
      this.inviting='Y';
    }
  }

  sendInviteT() {
    this.formData.org_id = this.data.formData.id;
    this._dataService.postAuth("invite-team-member", this.formData).subscribe((data:any)=>{
      location.reload();  
    });
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
    this.section=m.id;
  }



  closeManage() {
    this.managing='N';
  }

  ngOnDestroy(): void
  {
   //--   this._unsubscribeAll.next(null);
   //--   this._unsubscribeAll.complete();
  }

  downloadZip() {
    location.href="https://protectivesecurity.org/zip.php?id=" + this.data.formData.id;
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

}
