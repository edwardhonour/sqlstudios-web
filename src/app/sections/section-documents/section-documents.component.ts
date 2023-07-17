import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadDocumentComponent } from 'src/app/components/upload-document/upload-document.component';
import { FormsModule } from '@angular/forms';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-section-documents',
  standalone: true,
  imports: [CommonModule, UploadDocumentComponent, FormsModule],
  templateUrl: './section-documents.component.html',
  styleUrls: ['./section-documents.component.css']
})
export class SectionDocumentsComponent implements OnInit {
  @Input() survey_id: any = '';
  @Input() section_id: any = '';
  @Input() asset_id: any = 0;
  @Input() option_id: any = 0;
  @Input() data: any;
  adding: any = 'N';

  uploading: any = 'N';
  id: any;
  document_name: any;
  text: any;
  document_type: any;


  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  
  closeIt() {
   this.close.emit('N');
 }

 toggleUpload() {
  if (this.uploading=='Y') {
    this.uploading='N';
  } else {
    this.uploading='Y';
  }
}

constructor(
  private _dataService: DataService,
) { }

postForm() {
  let formData: any = {
    id: this.id, 
    document_name: this.document_name,
    text: this.text,
    document_type: this.document_type
  }
  console.log(formData);
  this._dataService.postForm("post-update-document", formData).subscribe((data:any)=>{
//        this.data=data;
location.reload()
   });
}

toggleAdd() {
  if (this.adding=='Y') {
    this.adding='N';
  } else { 
    this.adding='Y';
    this.id='';
    this.text='';
    this.document_type=1;
    this.document_name="";
  }
}


edit(m : any) {
  this.adding='Y';
    this.id=m.id;
    this.text=m.text;
    this.document_name=m.document_name;
    this.document_type=m.document_type;
}   

 ngOnInit(): void {
     console.log('Section Photos') 
     console.log(this.data); 
 }

}