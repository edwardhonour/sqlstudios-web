import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPopulationComponent } from './student-population.component';

describe('StudentPopulationComponent', () => {
  let component: StudentPopulationComponent;
  let fixture: ComponentFixture<StudentPopulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ StudentPopulationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentPopulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
