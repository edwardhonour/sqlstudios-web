import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SqlComponentsModule } from 'sql-components';
import { DocWorkspaceFormComponent } from '../doc-workspace-form/doc-workspace-form.component';
import { SitebarWrapperComponent } from 'src/app/template/sitebar-wrapper/sitebar-wrapper.component';


@Component({
  selector: 'app-doc-workspace-table',
  standalone: true,
  imports: [CommonModule, SqlComponentsModule, DocWorkspaceFormComponent, RouterModule, SitebarWrapperComponent], 
  templateUrl: './doc-workspace-list.component.html',
  styleUrls: ['./doc-workspace-list.component.css']
})
export class DocWorkspaceListComponent {
 
  @Output() button_click: EventEmitter<any> = new EventEmitter<any>();
  @Output() row_click: EventEmitter<any> = new EventEmitter<any>();

  constructor (private _router: Router ) {}

processButton(m: any) {
 this.button_click.emit(m);
 this._router.navigate(['/workspace-dashboard',m.id]);
}

processRow(m: any) {
 this.row_click.emit(m);
}

}
