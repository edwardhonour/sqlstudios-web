import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FormsModule,  FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { DataService } from 'src/app/data.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxTablePaginationModule } from 'ngx-table-pagination';
import { SitebarWrapperComponent } from 'src/app/template/sitebar-wrapper/sitebar-wrapper.component';
import { OrgFormComponent } from 'src/app/admin/org-form/org-form.component';


@Component({
  selector: 'app-admin-org-list',
  standalone: true,
  imports: [CommonModule, 
    RouterModule, 
    Ng2SearchPipeModule, SitebarWrapperComponent, OrgFormComponent,
    NgxTablePaginationModule,
    FormsModule],
  templateUrl: './admin-org-list.component.html',
  styleUrls: ['./admin-org-list.component.css']
})
export class AdminOrgListComponent  implements OnInit, OnDestroy
{
  term: any;
  p: any;
  q: any;
  uploading: any;
  data: any;
  currentYear: any;
  email: any;
  user: any;
  adding: any = 'N';

  private _unsubscribeAll: Subject<any> = new Subject<any>();


     constructor(
      private _activatedRoute: ActivatedRoute,
      private _router: Router,
      private _dataService: DataService,
      public http: HttpClient  // used by upload
  ) { }

    ngOnInit(): void {      
            this._activatedRoute.data.subscribe(({ 
              data, menudata, userdata })=> { 
              this.data=data;
              this.uploading='N'
     //         if (this.data.user.force_logout>0) {
     //             localStorage.removeItem('uid');
     //             this._router.navigate(['/forced-off',this.data.user.force_logout]);
     //         }
            })    
    }

    toggleAdd() {
      if (this.adding=='Y') {
          this.adding='N';
      } else {
          this.adding='Y';
      }
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

}
