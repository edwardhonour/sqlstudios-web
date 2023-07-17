import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadPhotoComponent } from 'src/app/components/upload-photo/upload-photo.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-section-photos',
  standalone: true,
  imports: [CommonModule, UploadPhotoComponent, FormsModule, RouterModule],
  templateUrl: './section-photos.component.html',
  styleUrls: ['./section-photos.component.css']
})
export class SectionPhotosComponent implements OnInit {
   @Input() survey_id: any = '';
   @Input() section_id: any = '';
   @Input() asset_id: any = 0;
   @Input() data: any;

   photo_type: any = '';
   dsc: any = '';
   photo_name: any = '';
   id: any = '';
   
   uploading: any = 'N';

   @Output() close: EventEmitter<any> = new EventEmitter<any>();
   
   toggleUpload() {
      if (this.uploading=='Y') {
        this.uploading='N';
      } else {
        this.uploading='Y';
      }
   }
   closeIt() {
    this.close.emit('N');
  }

  edit(m: any) {
    if (m.editing=='Y') {
      m.editing='N';
    } else { 
      m.editing='Y';
      this.id=m.id;
      this.dsc=m.text;
      this.photo_name=m.photo_name;
      this.photo_type=m.photo_type;
    }
  }
  constructor(
    private _dataService: DataService
  ) { }

  ngOnInit(): void {
      console.log('Section Photos') 
      console.log(this.data); 
  }

  postForm() {
    let formData: any = {
      id: this.id, 
      photo_name: this.photo_name,
      photo_type: this.photo_type,
      dsc: this.dsc
    }
    console.log(formData);
    this._dataService.postForm("post-update-photo", formData).subscribe((data:any)=>{
//        this.data=data;
        location.reload()
     });
  }

}
