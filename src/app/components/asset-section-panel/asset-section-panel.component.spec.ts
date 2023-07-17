import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetSectionPanelComponent } from './asset-section-panel.component';

describe('AssetSectionPanelComponent', () => {
  let component: AssetSectionPanelComponent;
  let fixture: ComponentFixture<AssetSectionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AssetSectionPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetSectionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
