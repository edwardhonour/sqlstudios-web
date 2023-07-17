import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionSaaComponent } from './section-saa.component';

describe('SectionSaaComponent', () => {
  let component: SectionSaaComponent;
  let fixture: ComponentFixture<SectionSaaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SectionSaaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionSaaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
