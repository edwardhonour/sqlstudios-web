import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadOptionPhotoComponent } from './upload-option-photo.component';

describe('UploadOptionPhotoComponent', () => {
  let component: UploadOptionPhotoComponent;
  let fixture: ComponentFixture<UploadOptionPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ UploadOptionPhotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadOptionPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
