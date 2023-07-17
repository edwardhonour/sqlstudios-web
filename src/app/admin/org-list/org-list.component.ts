import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SqlComponentsModule } from 'sql-components';
import { DocWorkspaceFormComponent } from 'src/app/features/doc-workspace-form/doc-workspace-form.component'; 
import { SitebarWrapperComponent } from 'src/app/template/sitebar-wrapper/sitebar-wrapper.component';
import { OrgFormComponent } from '../org-form/org-form.component';


@Component({
  selector: 'app-org-list',
  standalone: true,
  imports: [CommonModule, SqlComponentsModule, DocWorkspaceFormComponent, RouterModule, SitebarWrapperComponent, OrgFormComponent], 
  templateUrl: './org-list.component.html',
  styleUrls: ['./org-list.component.css']
})
export class OrgListComponent {

  @Output() button_click: EventEmitter<any> = new EventEmitter<any>();
  @Output() row_click: EventEmitter<any> = new EventEmitter<any>();

  constructor (private _router: Router ) {}

processButton(m: any) {
 this.button_click.emit(m);
 this._router.navigate(['/org-dashboard',m.id]);
}

processRow(m: any) {
 this.row_click.emit(m);
}

}
