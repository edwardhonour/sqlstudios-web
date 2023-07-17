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
import { AssetSectionPanelComponent } from '../asset-section-panel/asset-section-panel.component';


@Component({
  selector: 'app-section-panel',
  standalone: true,
  imports: [ CommonModule, MaterialModule, MatRadioModule, FormsModule, QuestionPanelComponent, AssetSectionPanelComponent],
  templateUrl: './section-panel.component.html',
  styleUrls: ['./section-panel.component.css']
})
export class SectionPanelComponent implements OnChanges, OnInit{

  @Input() section_id: any;
  @Input() survey_id: any;
  @Input() data: any;
  showing: any = 'N';

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


  ngOnInit(): void {
   this.postForm(); 
   console.log("Section ID " + this.section_id);
   console.log("Survey ID " + this.survey_id);
  }

  constructor(private _dataService: DataService) {}

  postForm() {
    let formData: any = {
      survey_id: this.survey_id,
      section_id: this.section_id
    }
    this._dataService.postForm("get-survey-section", formData).subscribe((data:any)=>{
      this.data=data;
      console.log(data);
     });
  }


}
