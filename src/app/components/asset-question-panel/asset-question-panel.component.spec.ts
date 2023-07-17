import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetQuestionPanelComponent } from './asset-question-panel.component';

describe('AssetQuestionPanelComponent', () => {
  let component: AssetQuestionPanelComponent;
  let fixture: ComponentFixture<AssetQuestionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AssetQuestionPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetQuestionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
