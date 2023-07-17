import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartUploadComponent } from './smart-upload.component';

describe('SmartUploadComponent', () => {
  let component: SmartUploadComponent;
  let fixture: ComponentFixture<SmartUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SmartUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
