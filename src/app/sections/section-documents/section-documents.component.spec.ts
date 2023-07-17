import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionDocumentsComponent } from './section-documents.component';

describe('SectionDocumentsComponent', () => {
  let component: SectionDocumentsComponent;
  let fixture: ComponentFixture<SectionDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SectionDocumentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
