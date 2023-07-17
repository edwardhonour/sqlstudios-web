import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentMenuComponent } from './assessment-menu.component';

describe('AssessmentMenuComponent', () => {
  let component: AssessmentMenuComponent;
  let fixture: ComponentFixture<AssessmentMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AssessmentMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
