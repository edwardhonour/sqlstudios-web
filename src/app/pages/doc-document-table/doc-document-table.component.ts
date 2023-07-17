import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SqlComponentsModule } from 'sql-components';
import { DocDocumentFormComponent } from '../doc-document-form/doc-document-form.component'; 
import { RouterModule } from '@angular/router';
import { SitebarWrapperComponent } from 'src/app/template/sitebar-wrapper/sitebar-wrapper.component';


@Component({
  selector: 'app-doc-document-table',
  standalone: true,
  imports: [CommonModule, SqlComponentsModule, DocDocumentFormComponent, RouterModule, SitebarWrapperComponent], 
  templateUrl: './doc-document-table.component.html',
  styleUrls: ['./doc-document-table.component.css']
})
export class DocDocumentTableComponent {
 
  @Output() button_click: EventEmitter<any> = new EventEmitter<any>();
  @Output() row_click: EventEmitter<any> = new EventEmitter<any>();


processButton(m: any) {
 this.button_click.emit(m);
}

processRow(m: any) {
 this.row_click.emit(m);
}

}
