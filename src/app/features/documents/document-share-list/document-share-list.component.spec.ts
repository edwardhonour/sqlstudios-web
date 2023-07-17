import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentShareListComponent } from './document-share-list.component';

describe('DocumentShareListComponent', () => {
  let component: DocumentShareListComponent;
  let fixture: ComponentFixture<DocumentShareListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DocumentShareListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentShareListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
