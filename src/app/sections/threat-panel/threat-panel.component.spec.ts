import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreatPanelComponent } from './threat-panel.component';

describe('ThreatPanelComponent', () => {
  let component: ThreatPanelComponent;
  let fixture: ComponentFixture<ThreatPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ThreatPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreatPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
