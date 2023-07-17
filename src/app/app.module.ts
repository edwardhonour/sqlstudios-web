import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FileUploadModule } from '@iplab/ngx-file-upload';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { SqlComponentsModule } from 'sql-components';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxTablePaginationModule } from 'ngx-table-pagination';
import { SitebarWrapperComponent } from './template/sitebar-wrapper/sitebar-wrapper.component';
import { PageHeaderComponent } from './template/page-header/page-header.component';
import { PageFooterComponent } from './template/page-footer/page-footer.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SqlComponentsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxTablePaginationModule,
    SitebarWrapperComponent,
    PageHeaderComponent,
    PageFooterComponent,
    FileUploadModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy },
  { provide: 'WEBSERVER', useValue: 'https://cybersurvey.org/api/'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
