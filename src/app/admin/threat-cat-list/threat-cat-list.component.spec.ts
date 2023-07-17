import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreatCatListComponent } from './threat-cat-list.component';

describe('ThreatCatListComponent', () => {
  let component: ThreatCatListComponent;
  let fixture: ComponentFixture<ThreatCatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ThreatCatListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreatCatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
