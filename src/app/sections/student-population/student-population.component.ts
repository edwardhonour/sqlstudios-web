import { CommonModule } from '@angular/common';
import { SectionPanelComponent } from 'src/app/components/section-panel/section-panel.component';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { SectionCommentsComponent } from '../section-comments/section-comments.component';
import { SectionPhotosComponent } from '../section-photos/section-photos.component';
import { SectionSaaComponent } from '../section-saa/section-saa.component';
import { SectionDocumentsComponent } from '../section-documents/section-documents.component';

@Component({
  selector: 'app-student-population',
  standalone: true,
  imports: [CommonModule, SectionPanelComponent, SectionCommentsComponent, SectionPhotosComponent, SectionSaaComponent, SectionDocumentsComponent],
  templateUrl: './student-population.component.html',
  styleUrls: ['./student-population.component.css']
})
export class StudentPopulationComponent  implements OnInit {
  @Input() org_id: any='0';
  data: any;
  
  section_id: any=20;
  show_photos: any='N';
  show_documents: any='N';
  show_comments: any='N';
  show_saa: any='N';

  parameters: any = {
    survey_id: '',
    section_id: ''
  }

  togglePhotos() {
    if (this.show_photos=='Y') {
      this.show_photos='N';
    } else {
      this.show_photos='Y';
      this.show_comments='N';
      this.show_documents='N';
      this.show_saa='N';
    }
  }

  toggleComments() {
    if (this.show_comments=='Y') {
      this.show_comments='N';
    } else {
      this.show_photos='N';
      this.show_comments='Y';
      this.show_documents='N';
      this.show_saa='N';
    }
  }

  toggleDocuments() {
    if (this.show_documents=='Y') {
      this.show_documents='N';
    } else {
      this.show_photos='N';
      this.show_comments='N';
      this.show_documents='Y';
      this.show_saa='N';
    }
  }

  closeAll() {
    this.show_photos='N';
    this.show_comments='N';
    this.show_documents='N';
    this.show_saa='N';
  }

  toggleSaa() {
    if (this.show_saa=='Y') {
      this.show_saa='N';
    } else {
      this.show_photos='N';
      this.show_comments='N';
      this.show_documents='N';
      this.show_saa='Y';
    }
  }



  constructor(private _dataService: DataService) {

  }

  ngOnInit(): void {
    
        setTimeout(() => {
                  this.parameters.survey_id=this.org_id;
                  this.parameters.section_id=this.section_id;
                  this._dataService.postForm("get-survey-section-background", this.parameters).subscribe((data:any)=>{
                    this.data=data;
                  });
        }, 1000);
      }
}
