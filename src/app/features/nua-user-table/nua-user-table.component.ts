import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SqlComponentsModule } from 'sql-components';
import { NuaUserFormComponent } from '../nua-user-form/nua-user-form.component'; 
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nua-user-table',
  standalone: true,
  imports: [CommonModule, SqlComponentsModule, NuaUserFormComponent, RouterModule], 
  templateUrl: './nua-user-table.component.html',
  styleUrls: ['./nua-user-table.component.css']
})
export class NuaUserTableComponent {
 
  @Output() button_click: EventEmitter<any> = new EventEmitter<any>();
  @Output() row_click: EventEmitter<any> = new EventEmitter<any>();


processButton(m: any) {
 this.button_click.emit(m);
}

processRow(m: any) {
 this.row_click.emit(m);
}

}
