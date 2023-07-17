import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SqlComponentsModule, SqlDataSelectComponent, SqlDeleteComponent, SqlSubmitComponent } from 'sql-components';
import {MatDialogModule} from '@angular/material/dialog';


@Component({
  selector: 'app-survey-form',
  standalone: true,
  imports: [CommonModule, SqlComponentsModule, SqlSubmitComponent, SqlDataSelectComponent, SqlDeleteComponent, MatDialogModule], 
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.css']
 })
 export class SurveyFormComponent {
 
}


