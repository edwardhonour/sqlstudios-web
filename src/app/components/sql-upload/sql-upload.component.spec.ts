import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlUploadComponent } from './sql-upload.component';

describe('SqlUploadComponent', () => {
  let component: SqlUploadComponent;
  let fixture: ComponentFixture<SqlUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SqlUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SqlUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
