import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SqlComponentsModule, SqlDataSelectComponent, SqlDeleteComponent, SqlSubmitComponent } from 'sql-components';
import {MatDialogModule} from '@angular/material/dialog';


@Component({
  selector: 'app-nua-user-form',
  standalone: true,
  imports: [CommonModule, SqlComponentsModule, SqlSubmitComponent, SqlDataSelectComponent, SqlDeleteComponent, MatDialogModule], 
  templateUrl: './nua-user-form.component.html',
  styleUrls: ['./nua-user-form.component.css']
 })
 export class NuaUserFormComponent {
 
}


