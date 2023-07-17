import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SqlDataPreview2Component, SqlDataPreview3Component, SqlDataPreviewComponent, SQLDataService, SqlEditPreviewComponent, SqlFormComponent, SqlInputComponent, SqlPanelComponent } from 'sql-components';


@Component({
  selector: 'app-test-page',
  standalone: true,
  imports: [CommonModule, 
      RouterModule,
      SqlDataPreviewComponent, SqlDataPreview3Component,
      SqlDataPreview2Component, SqlEditPreviewComponent,
            SqlPanelComponent, SqlFormComponent, SqlInputComponent],
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css']
})
export class TestPageComponent implements OnInit {

      data: any;

     constructor(
      private _activatedRoute: ActivatedRoute,
      private _sqlDataService: SQLDataService,
      private _router: Router
  ) { } 

  ngOnInit(): void {
        this._activatedRoute.data.subscribe(({ 
        parameters })=> { 
              console.log('results')
              console.log(parameters)
              let params = { page: '', id: parameters.id, id2: parameters.id2, id3: parameters.id3 }
              this._sqlDataService.paramSubject.next(params);
        })   
        this._sqlDataService.pageSubject.subscribe((data: any) => {
            console.log('page Subject');
            this.data=data;
        })
  }

}
