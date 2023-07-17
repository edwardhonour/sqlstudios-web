import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreatCatFormComponent } from './threat-cat-form.component';

describe('ThreatCatFormComponent', () => {
  let component: ThreatCatFormComponent;
  let fixture: ComponentFixture<ThreatCatFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ThreatCatFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreatCatFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
