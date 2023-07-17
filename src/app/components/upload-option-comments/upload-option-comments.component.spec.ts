import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadOptionCommentsComponent } from './upload-option-comments.component';

describe('UploadOptionCommentsComponent', () => {
  let component: UploadOptionCommentsComponent;
  let fixture: ComponentFixture<UploadOptionCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ UploadOptionCommentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadOptionCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
