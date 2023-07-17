import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SqlComponentsModule } from 'sql-components';
import { SurveyFormComponent } from '../survey-form/survey-form.component'; 


@Component({
  selector: 'app-survey-table',
  standalone: true,
  imports: [CommonModule, SqlComponentsModule, SurveyFormComponent], 
  templateUrl: './survey-table.component.html',
  styleUrls: ['./survey-table.component.css']
})
export class SurveyTableComponent {
 
}


