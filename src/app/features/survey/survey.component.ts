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
import { SectionPanelComponent } from 'src/app/components/section-panel/section-panel.component';
import { GeneralDescriptionComponent } from 'src/app/sections/general-description/general-description.component';
import { StudentPopulationComponent } from 'src/app/sections/student-population/student-population.component';
import { SectionTemplateComponent } from 'src/app/sections/section-template/section-template.component';
import { AssessmentMenuComponent } from 'src/app/sections/assessment-menu/assessment-menu.component';

@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [CommonModule, Ng2SearchPipeModule, MatRadioModule, NgxTablePaginationModule, RouterModule, 
    FormsModule, SqlUploadComponent, SmartUploadComponent, SectionPanelComponent,
    SqlComponentsModule, SqlMenuComponent, FileUploadModule, HttpClientModule, 
    GeneralDescriptionComponent, AssessmentMenuComponent,
    StudentPopulationComponent, SectionTemplateComponent,
    AddDocumentFormComponent, SitebarWrapperComponent],
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent  {

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
  inviting: any = 'N';
  sharing: any = 'N';
  managing: any = 'N';
  section_code: any = '';
  org_id: any = 0;


  version: any = 'N';
  k: any;
  uploadedList: any = '';
  public fileUploadControl = new FileUploadControl();
  progress: number = 0;
  uid: any = 0;
  doc_id: any = 0;

  a1: any = '';
  a2: any = '';
  a3: any = '';
  a4: any = '';
  a5: any = '';
  a6: any = '';
  a7: any = '';
  a8: any = '';
  a9: any = '';
  a10: any = '';

  general: any = 'Y';
  population: any = 'N';
  perimeter: any = 'N';
  approach: any = 'N';
  outdoor: any = 'N';
  envelope: any = 'N';
  entrycontrol: any = 'N';
  srp: any = 'N';
  response: any = 'N';
  staffing: any = 'N';
  incidents: any = 'N';
  threat: any = 'N';
  ess: any = 'N';
  cyber: any = 'N';
  utilities: any = 'N';
  transportation: any = 'N';
  emergency: any = 'N';


  b1: any;
  b2: any;

  formData: any = {
    org_id: 0,
    full_name: '',
    custom_msg: '',
    email: '',
    default_role: '0'
  }

  ngOnInit(): void {      
          this._activatedRoute.data.subscribe(({ 
            data, menudata, userdata })=> { 
            this.data=data;
            this.general='N'; 
            this.population='N'; 
            this.transportation='N'; 
            this.perimeter='N'; 
            this.approach='N'; 
            this.outdoor='N'; 
            this.envelope='N'; 
            this.entrycontrol='N'; 
            this.srp='N'; 
            this.response='N'; 
            this.staffing='N'; 
            this.incidents='N'; 
            this.threat='N'; 
            this.ess='N'; 
            this.cyber='N'; 
            this.utilities='N'; 
            this.emergency='N';      
            if (this.data.section_id=='10') { 
                 this.section_code='10';
                 this.general='Y';
            }
            if (this.data.section_id=='20') { 
              this.section_code='20';
              this.population='Y';
            }
           if (this.data.section_id=='30') { 
               this.section_code='30';
               this.transportation='Y';
           }
           if (this.data.section_id=='40') { 
              this.section_code='40';
              this.perimeter='Y';
          }
         if (this.data.section_id=='50') { 
              this.section_code='50';
              this.approach='Y';
        }
        if (this.data.section_id=='60') { 
              this.section_code='60';
              this.outdoor='Y';
        }
        if (this.data.section_id=='70') { 
              this.section_code='70';
              this.envelope='Y';
        }
        if (this.data.section_id=='80') { 
              this.section_code='80';
              this.entrycontrol='Y';
        }
        if (this.data.section_id=='90') { 
              this.section_code='90';
              this.srp='Y';
        }
        if (this.data.section_id=='100') { 
              this.section_code='100';
              this.response='Y';
        }
        if (this.data.section_id=='110') { 
              this.section_code='110';
              this.staffing='Y';
        }
        if (this.data.section_id=='120') { 
              this.section_code='120';
              this.incidents='Y';
        }
        if (this.data.section_id=='130') { 
              this.section_code='120';
              this.threat='Y';
        }
        if (this.data.section_id=='140') { 
            this.section_code='140';
            this.ess='Y';
        }          
        if (this.data.section_id=='150') { 
            this.section_code='150';
            this.cyber='Y';
        }                
            console.log(this.data);
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

    this._router.navigate(['/survey',this.formData.org_id,m.id]);
    this.general='N'; 
    this.population='N'; 
    this.transportation='N'; 
    this.perimeter='N'; 
    this.approach='N'; 
    this.outdoor='N'; 
    this.envelope='N'; 
    this.entrycontrol='N'; 
    this.srp='N'; 
    this.response='N'; 
    this.staffing='N'; 
    this.incidents='N'; 
    this.threat='N'; 
    this.ess='N'; 
    this.cyber='N'; 
    this.utilities='N'; 
    this.emergency='N';

    if (m.id=='10') { this.general='Y'; }
    if (m.id=='20') { 
      this.population='Y'; 

    }
    if (m.id=='30') { this.transportation='Y'; }
    if (m.id=='40') { this.perimeter='Y'; }
    if (m.id=='50') { this.approach='Y'; }
    if (m.id=='60') { this.outdoor='Y'; }
    if (m.id=='70') { this.envelope='Y'; }
    if (m.id=='80') { this.entrycontrol='Y'; }
    if (m.id=='90') { this.srp='Y'; }
    if (m.id=='100') { this.response='Y'; }
    if (m.id=='110') { this.staffing='Y'; }
    if (m.id=='120') { this.incidents='Y'; }
    if (m.id=='130') { this.threat='Y'; }
    if (m.id=='140') { this.ess='Y'; }
    if (m.id=='150') { this.cyber='Y'; }
    if (m.id=='160') { this.utilities='Y'; }

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
