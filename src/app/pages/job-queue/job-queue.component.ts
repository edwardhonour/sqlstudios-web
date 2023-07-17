import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subject, takeUntil, Subscription, Observable, timer } from 'rxjs';
import { FormsModule,  FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxTablePaginationModule } from 'ngx-table-pagination';
import { SurveyTableComponent } from '../survey-table/survey-table.component';

import { MatRadioModule } from '@angular/material/radio';
import { VertSideNavComponent } from 'src/app/layout/panels/vert-side-nav/vert-side-nav.component'; 
import { DataService } from 'src/app/data.service';
import { SitebarWrapperComponent } from 'src/app/template/sitebar-wrapper/sitebar-wrapper.component';


@Component({
  selector: 'app-job-queue',
  standalone: true,
  imports: [CommonModule, VertSideNavComponent, SurveyTableComponent,
    Ng2SearchPipeModule, RouterModule, SitebarWrapperComponent,
    NgxTablePaginationModule, MatRadioModule,
    FormsModule],
  templateUrl: './job-queue.component.html',
  styleUrls: ['./job-queue.component.css']
})
export class JobQueueComponent implements OnInit, OnDestroy, OnChanges
{
  isScreenSmall: boolean = false;
  term: any;
  p: any;
  q: any;
  uploading: any;
  data: any;
  currentYear: any;
  email: any;
  user: any;
  isOpen: any = 'N';
  section: any ='N';
  edit: any = 'N';
  subscription: Subscription = Subscription.EMPTY;
  everyFiveSeconds: Observable<number> = timer(0,5000);

  private _unsubscribeAll: Subject<any> = new Subject<any>();


     constructor(
      private _activatedRoute: ActivatedRoute,
      private _dataService: DataService,
      private _router: Router,
      public http: HttpClient  // used by upload
  ) { }

  toggleSection() {
    if (this.section=='N') {
      this.section='Y';
    } else {
      this.section='N';
    }
  }

  postForm() {
    this._dataService.postForm("post-audio-clip", this.data.formData).subscribe((data:any)=>{
//        this.data=data;
    //  location.reload();
     });
  }

  getList() {
    this._dataService.postForm("job-queue", this.data.formData).subscribe((data:any)=>{
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
            }) 
            this.subscription = this.everyFiveSeconds.subscribe(() => {
              console.log('Every 5');
              this.getList();
            });
    }

    ngOnChanges(changes: SimpleChanges): void {
      
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

}
