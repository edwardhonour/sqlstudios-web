import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceListComponent } from './voice-list.component';

describe('VoiceListComponent', () => {
  let component: VoiceListComponent;
  let fixture: ComponentFixture<VoiceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ VoiceListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
