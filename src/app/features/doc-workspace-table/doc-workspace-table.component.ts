import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SqlComponentsModule } from 'sql-components';
import { DocWorkspaceFormComponent } from '../doc-workspace-form/doc-workspace-form.component';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doc-workspace-table',
  standalone: true,
  imports: [CommonModule, SqlComponentsModule, DocWorkspaceFormComponent, FormsModule, RouterModule], 
  templateUrl: './doc-workspace-table.component.html',
  styleUrls: ['./doc-workspace-table.component.css']
})
export class DocWorkspaceTableComponent {
 
  @Output() button_click: EventEmitter<any> = new EventEmitter<any>();
  @Output() row_click: EventEmitter<any> = new EventEmitter<any>();

  constructor (private _router: Router ) {}


processButton(m: any) {
 this.button_click.emit(m);
 this._router.navigate(['/something',m.id]);
}

processRow(m: any) {
 this.row_click.emit(m);
}

}
