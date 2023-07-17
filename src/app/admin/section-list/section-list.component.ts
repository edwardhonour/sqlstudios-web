import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FormsModule,  FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxTablePaginationModule } from 'ngx-table-pagination';

import { MatRadioModule } from '@angular/material/radio';
import { VertSideNavComponent } from 'src/app/layout/panels/vert-side-nav/vert-side-nav.component'; 
import { DataService } from 'src/app/data.service';
import { SitebarWrapperComponent } from 'src/app/template/sitebar-wrapper/sitebar-wrapper.component';


@Component({
  selector: 'app-section-list',
  standalone: true,
  imports: [CommonModule, VertSideNavComponent, 
    Ng2SearchPipeModule, RouterModule, SitebarWrapperComponent,
    NgxTablePaginationModule, MatRadioModule,
    FormsModule],
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.css']
})
export class SectionListComponent implements OnInit, OnDestroy
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

  toggleEdit() {
    if (this.edit=='N') {
      this.edit='Y';
    } else {
      this.edit='N';
    }
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

    gotoData() {
      location.href="https://cybersurvey.org/updata.html";
    }

    getSheet(section: any, asset:any) {
      location.href="https://cybersurvey.org/get_section_sheet.php?section="+section+"&asset="+asset;
    }

    getData(section: any, asset:any) {
      location.href="https://cybersurvey.org/get_section_data.php?section="+section+"&asset="+asset;
    }

}
