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
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { QuestionPanelComponent } from '../question-panel/question-panel.component';

@Component({
  selector: 'app-section-background',
  standalone: true,
  imports: [ CommonModule, MaterialModule, MatRadioModule, FormsModule, QuestionPanelComponent],
  templateUrl: './section-background.component.html',
  styleUrls: ['./section-background.component.css']
})
export class SectionBackgroundComponent implements OnChanges, OnInit{

  @Input() data: any; 
  @Input() survey_id: any = '0';
  @Input() section_id: any = '0';
  @Input() document_id: any = '0';
  @Input() option_id: any = '0';
  @Input() asset_id: any = '0';
  document_name: any = '';
  dsc: any = '';
  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  ngOnChanges() {
console.log('XXChangesXX')
console.log(this.data)
  }

  ngOnInit(): void {
   this.postForm(); 
   console.log("Section ID " + this.section_id);
   console.log("Survey ID " + this.survey_id);
  }

  constructor(private _dataService: DataService) {}

  primaryCheckboxChange(ob: MatCheckboxChange, id: any) {
 //   let z = this.data.formData[id];
    let p = 'p'+id;
    console.log(p);
    if (ob.checked) {
      this.data.saaFormData[p]='Y';
    } else {
      this.data.saaFormData[p]='';
    }
    this.postChanges();
  }

  postChanges() {
    this._dataService.postForm("post-saa-option-change", this.data.saaFormData).subscribe((data:any)=>{
//      this.data=data;
     });
    }

    doReload() {
      location.reload();
    }

  postForm() {
//    let formData: any = {
//      survey_id: this.survey_id,
//      section_id: this.section_id
//    }
//    this._dataService.postForm("get-survey-saa-checkboxes", formData).subscribe((data:any)=>{
//      this.data=data;
//      console.log('HERE');
//      console.log(data);
//      console.log('THERE')
//     });
  }


}
