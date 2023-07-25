import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, OnChanges, Output, EventEmitter, HostListener } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subject, takeUntil, Subscription, Observable, timer } from 'rxjs';
import { FormsModule,  FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxTablePaginationModule } from 'ngx-table-pagination';
import { SurveyTableComponent } from '../survey-table/survey-table.component';
import { FileUploadModule, FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';

import { MatRadioModule } from '@angular/material/radio';
import { VertSideNavComponent } from 'src/app/layout/panels/vert-side-nav/vert-side-nav.component'; 
import { DataService } from 'src/app/data.service';
import { SitebarWrapperComponent } from 'src/app/template/sitebar-wrapper/sitebar-wrapper.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-audio-list',
  standalone: true,
  imports: [CommonModule, VertSideNavComponent, SurveyTableComponent,
    Ng2SearchPipeModule, RouterModule, SitebarWrapperComponent, FileUploadModule,
    NgxTablePaginationModule, MatRadioModule,
    FormsModule],
  templateUrl: './audio-list.component.html',
  styleUrls: ['./audio-list.component.css']
})
export class AudioListComponent implements OnInit, OnDestroy, OnChanges
{
  uploadedFiles: Array<File> = [];

  @Output() onFileDropped = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();
  @HostListener('dragover', ['$event']) onDragOver(evt: any) { evt.preventDefault();  evt.stopPropagation(); }
  @HostListener('dragleave', ['$event']) public onDragLeave(evt: any) { evt.preventDefault(); evt.stopPropagation(); }
  @HostListener('drop', ['$event']) public ondrop(evt: any) { this.uploadFiles(); }

  data: any; 
  uploading: any = 'N';
  adding: any = 'N';
  edit: any = 'N';
  version: any = 'N';
  k: any;
  uploadedList: any = '';
  public fileUploadControl = new FileUploadControl();
  progress: number = 0;

  isScreenSmall: boolean = false;
  term: any;
  p: any;
  q: any;
  currentYear: any;
  email: any;
  user: any;
  isOpen: any = 'N';
  section: any ='N';
  upload: any = 'N';
  subscription: Subscription = Subscription.EMPTY;
  everyFiveSeconds: Observable<number> = timer(0,5000);

  private _unsubscribeAll: Subject<any> = new Subject<any>();


     constructor(
      private _activatedRoute: ActivatedRoute,
      private _dataService: DataService,
      private _router: Router,
      public http: HttpClient,
      private fileUploadService: DataService
  ) { }

  toggleSection() {
    if (this.section=='N') {
      this.section='Y';
    } else {
      this.section='N';
    }
  }
  ngOnChanges(): void {
    
  }

  postForm() {
    this._dataService.postForm("post-audio-clip", this.data.formData).subscribe((data:any)=>{
//        this.data=data;
      location.reload();
     });
  }

  getList() {
    this._dataService.postForm("text-to-audio", this.data.formData).subscribe((data:any)=>{
          console.log("Run Building")
          this.data=data;
     });
  }

  postFace() {
    this._dataService.postForm("post-audio-to-face", this.data.faceData).subscribe((data:any)=>{
//        this.data=data;
  //    location.reload();
        this._router.navigate(['/job-queue']);
     });
  }

  toggleEdit() {
    if (this.edit=='N') {
      this.edit='Y';
    } else {
      this.edit='N';
    }
  }

  toggleUpload() {
    if (this.upload=='N') {
      this.upload='Y';
    } else {
      this.upload='N';
    }
  }

  toggleE(m: any) {
    if (m.edit==='Y') {
      m.edit='N';
    } else {
      m.edit='Y';
      this.data.formData['id']=m.id;
      this.data.formData['voice_id']=m.voice_id;
      this.data.formData['script']=m.script;
    }
  }

  toggleS(m: any) {
    if (m.speed==='Y') {
      m.speed='N';
    } else {
      m.speed='Y';
      this.data.speedData['id']=m.id;
      this.data.speedData['rate']=m.voice_id;
    }

  }

  toggleV(m: any) {
    if (m.video==='Y') {
      m.video='N';
    } else {
      m.video='Y';
      this.data.faceData['audio_id']=m.id;
      this.data.faceData['face_id']="";
      this.data.faceData['output_type']="0";
      this.data.faceData['positon']="0";
    }
  }

  selectFace(k: any) {
    this.data['faceData']['face_id']=k.id;
  }

    ngOnInit(): void
    {      
      let d = { name: 'home', link: '/', count: 0, isSmall: 'N', hideNav: 'N', hideHeader: 'N'};
      this._dataService.locationSubject.next(d);

            this._activatedRoute.data.subscribe(({ 
              data, menudata, userdata })=> { 
              this.data=data;
//              this.navigation=menudata
              this.user=userdata
              this.uploading='N'
              if (this.data.user.force_logout>0) {
                  localStorage.removeItem('uid');
                  this._router.navigate(['/forced-off',this.data.user.force_logout]);
              }
              this.subscription = this.everyFiveSeconds.subscribe(() => {
                console.log('Five Seconds')
         //       this.getList();
              });
            }) 
    }

    ngOnDestroy(): void
    {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    gotoSheet() {
      location.href="https://cybersurvey.org/upcyber.html";
    }

    gotoAssessment(id: any) {
      localStorage.setItem('survey',id);
      this._router.navigate(['/survey','7']);
    }

    getSheet(section: any, asset:any) {
      location.href="https://cybersurvey.org/get_section_sheet.php?section="+section+"&asset="+asset;
    }

    getData(section: any, asset:any) {
      location.href="https://cybersurvey.org/get_section_data.php?section="+section+"&asset="+asset;
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
    this.fileUploadService.uploadAudio(droppedFile, this.data.formData).subscribe((event: HttpEvent<any>) => {
    switch (event.type) {
      case HttpEventType.Sent:
        console.log('Request has been made!');
        break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          setTimeout(() => {
            this.progress = 0;
            location.reload();
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
