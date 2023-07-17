import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FormsModule,  FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { DataService } from 'src/app/data.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxTablePaginationModule } from 'ngx-table-pagination';

import { MaterialModule } from 'src/app/material/material.module'; 
import { MatRadioModule } from '@angular/material/radio';
import { QuestionPanelComponent } from '../question-panel/question-panel.component';
import { AssetQuestionPanelComponent } from '../asset-question-panel/asset-question-panel.component';
import { AddSaaFormComponent } from '../add-saa-form/add-saa-form.component';

@Component({
  selector: 'app-asset-section-panel',
  standalone: true,
  imports: [ CommonModule, MaterialModule, MatRadioModule, FormsModule, QuestionPanelComponent, AssetQuestionPanelComponent, AddSaaFormComponent],
  templateUrl: './asset-section-panel.component.html',
  styleUrls: ['./asset-section-panel.component.css']
})
export class AssetSectionPanelComponent implements OnChanges, OnInit{

  @Input() section_id: any;
  @Input() survey_id: any;
  @Input() asset_id: any = '0';
  @Input() data: any;
  showing: any = 'N';
  newsaa: any = 'N';

  ngOnChanges() {

  }

  hideSection() {
    this.showing='N';
  }

  showSection() {
    this.showing='Y';
  }

  showSAA(m: any) {
    m.showing='Y';
  }

  hideSAA(m: any) {
    m.showing='N';
  }

  showNew() {
     this.newsaa='Y';
  }

  hideNew() {
    this.newsaa='N';
 }

  ngOnInit(): void {
   this.postForm(); 
   console.log("Section ID " + this.section_id);
   console.log("Survey ID " + this.survey_id);
   console.log("Asset ID " + this.asset_id);
  }

  constructor(private _dataService: DataService) {}

  postForm() {
    let formData: any = {
      survey_id: this.survey_id,
      section_id: this.section_id,
      asset_id: this.asset_id
    }
    this._dataService.postForm("get-survey-asset-section", formData).subscribe((data:any)=>{
      this.data=data;
      console.log(data);
     });
  }

}
