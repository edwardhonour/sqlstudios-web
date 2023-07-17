import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadOptionDocumentComponent } from './upload-option-document.component';

describe('UploadOptionDocumentComponent', () => {
  let component: UploadOptionDocumentComponent;
  let fixture: ComponentFixture<UploadOptionDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ UploadOptionDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadOptionDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
