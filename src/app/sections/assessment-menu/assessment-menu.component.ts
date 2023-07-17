import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionPanelComponent } from 'src/app/components/section-panel/section-panel.component';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { SectionCommentsComponent } from '../section-comments/section-comments.component';
import { SectionPhotosComponent } from '../section-photos/section-photos.component';
import { SectionSaaComponent } from '../section-saa/section-saa.component';
import { SectionDocumentsComponent } from '../section-documents/section-documents.component';
import { UploadPhotoComponent } from 'src/app/components/upload-photo/upload-photo.component';
import { UploadDocumentComponent } from 'src/app/components/upload-document/upload-document.component';
import { SectionBackgroundComponent } from 'src/app/components/section-background/section-background.component';

@Component({
  selector: 'app-assessment-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assessment-menu.component.html',
  styleUrls: ['./assessment-menu.component.css']
})
export class AssessmentMenuComponent implements OnInit {

  @Input() active: number=0;
  @Output() menuClick = new EventEmitter<any>();

  data: any;
  show_photos: any='N';
  show_documents: any='N';
  show_comments: any='N';
  show_saa: any='N';

  parameters: any = {
    survey_id: '',
    section_id: ''
  }

  processClick(m: any) {
    this.data.list.forEach(function (value: any) {
      if (value.id==m.id) {
        value.active='Y';
      } else {
        value.active='N';
      }
    });
    this.menuClick.emit(m);
  }

  constructor(private _dataService: DataService) {

  }

  ngOnInit(): void {    
        setTimeout(() => {
                  this.parameters.template_id='0';
                  this._dataService.postForm("get-survey-main-menu", this.parameters).subscribe((data:any)=>{
                    this.data=data;
                  });
        }, 100);
      }
}
