import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSaaComponent } from './all-saa.component';

describe('AllSaaComponent', () => {
  let component: AllSaaComponent;
  let fixture: ComponentFixture<AllSaaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AllSaaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllSaaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
