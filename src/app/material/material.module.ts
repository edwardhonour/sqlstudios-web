import { NgModule } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio'
import { MatButtonModule } from '@angular/material/button'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatIconModule } from '@angular/material/icon'
import { MatBadgeModule } from '@angular/material/badge'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule }  from '@angular/material/toolbar';
import { MatSidenavModule }  from '@angular/material/sidenav';
import { MatMenuModule }  from '@angular/material/menu';
import { MatListModule }  from '@angular/material/list';
import { MatGridListModule }  from '@angular/material/grid-list';
import { MatExpansionModule }  from '@angular/material/expansion';
import { MatCardModule }  from '@angular/material/card';
import { MatStepperModule }  from '@angular/material/stepper';
import { MatFormFieldModule }  from '@angular/material/form-field';
import { MatInputModule }  from '@angular/material/input';
import { MatTabsModule }  from '@angular/material/tabs';
import { MatAutocompleteModule }  from '@angular/material/autocomplete';
import { MatDividerModule }  from '@angular/material/divider';
import { MatPaginatorModule }  from '@angular/material/paginator';
import { MatCheckboxModule }  from '@angular/material/checkbox';
import { MatSelectModule }  from '@angular/material/select';
import { MatDatepickerModule }  from '@angular/material/datepicker';
import { MatNativeDateModule }  from '@angular/material/core';



const MaterialComponents = [
  MatMenuModule, 
  MatListModule, 
  MatGridListModule, 
  MatExpansionModule, 
  MatCardModule, 
  MatStepperModule, 
  MatFormFieldModule,
  MatInputModule, 
  MatTabsModule, 
  MatAutocompleteModule, 
  MatDividerModule, 
  MatPaginatorModule, 
  MatCheckboxModule, 
  MatRadioModule, 
  MatSelectModule, 
  MatDatepickerModule, 
  MatNativeDateModule, 
  MatProgressSpinnerModule, 
  MatToolbarModule, 
  MatSidenavModule,
  MatButtonModule, 
  MatButtonToggleModule, 
  MatIconModule, 
  MatBadgeModule,
]

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
