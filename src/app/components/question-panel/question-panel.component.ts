import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FormsModule,  FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { DataService } from 'src/app/data.service'; 
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxTablePaginationModule } from 'ngx-table-pagination';

import { MatRadioModule } from '@angular/material/radio';
import { MaterialModule } from 'src/app/material/material.module';
import { UploadOptionPhotoComponent } from '../upload-option-photo/upload-option-photo.component';
import { SectionCommentsComponent } from 'src/app/sections/section-comments/section-comments.component';
import { UploadOptionCommentsComponent } from '../upload-option-comments/upload-option-comments.component';
import { UploadOptionDocumentComponent } from '../upload-option-document/upload-option-document.component';
@Component({
  selector: 'app-question-panel',
  standalone: true,
  imports: [ CommonModule, MaterialModule, MatRadioModule, FormsModule, UploadOptionPhotoComponent, SectionCommentsComponent, UploadOptionCommentsComponent, UploadOptionDocumentComponent],
  templateUrl: './question-panel.component.html',
  styleUrls: ['./question-panel.component.css']
})
export class QuestionPanelComponent implements OnChanges, OnInit {
 
  @Input() survey_id: any;
  @Input() question_id: any;
  @Input() level: number = 0;
  @Output() show: EventEmitter<string> = new EventEmitter<string>();
  data: any;
  panel_open: any = 'N';
  primary_value: any;
  showingphotos: any = 'N';
  showingcomments: any = 'N';

  ngOnInit(): void {
    this.level++;
  }

  ngOnChanges(): void {
    this.postForm();
  }

  constructor(private _dataService: DataService) {}

  postForm() {
    let formData: any = {
      survey_id: this.survey_id,
      question_id: this.question_id
    }
    console.log(formData);
    this._dataService.postForm("get-survey-question", formData).subscribe((data:any)=>{
      this.data=data;
     });
  }

  postChanges() {
    this._dataService.postForm("post-survey-change", this.data).subscribe((data:any)=>{
      this.data=data;
     });
  }

  clearOtherRadioButtons(id: any) {

  }

  showPhotos() {
      this.showingphotos='Y';
  }

  hidePhotos() {
    this.showingphotos='N';
}

showComments() {
  this.showingcomments='Y';
}

hideComments() {
    this.showingcomments='N';
}


  updateItem(inputArray: any, item: any){
  
  }

  primaryCheckboxChange(ob: MatCheckboxChange, id: any) {
    console.log(id);
 //   let z = this.data.formData[id];
    let p = 'p'+id;
    console.log(p);
    if (ob.checked) {
      this.data.formData[p]='Y';
      this.data.conditionals[p]='Y';
    } else {
      this.data.formData[p]='N';
      this.data.conditionals[p]='N';
    }
    this.postChanges();
  }

  primaryRadioChange(id: any) {
    console.log(this.data.formData);
    let spaghettiProperties = Object.keys(this.data.conditionals);
    for (let prop of spaghettiProperties ) { 
      if (prop!='survey_id'&&prop!='question_id') {
        this.data.conditionals[prop]='N'
      }
    }
    let z = this.data.formData[this.data.question.model];
    let p = 'p'+z;
    console.log(p);
    this.data.formData[p]='Y';
    this.data.conditionals[p]='Y';
    console.log(this.data.conditionals)
    this.postChanges();
  }

}
