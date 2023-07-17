import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SqlComponentsModule, SqlDataSelectComponent, SqlDeleteComponent, SqlSubmitComponent } from 'sql-components';
import {MatDialogModule} from '@angular/material/dialog';


@Component({
  selector: 'app-add-document-form',
  standalone: true,
  imports: [CommonModule, SqlComponentsModule, SqlSubmitComponent, SqlDataSelectComponent, SqlDeleteComponent, MatDialogModule], 
  templateUrl: './add-document-form.component.html',
  styleUrls: ['./add-document-form.component.css']
})
export class AddDocumentFormComponent implements OnInit {
  @Input() workspace_id: any = ''; 
  @Input() user_id: any = ''; 
  @Output() cancel = new EventEmitter<any>();

  ngOnInit(): void {
    
  }
  cancelUpload() {
    this.cancel.emit('Y');
  }  
}
