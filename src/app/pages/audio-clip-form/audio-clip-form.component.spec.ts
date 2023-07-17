import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioClipFormComponent } from './audio-clip-form.component';

describe('AudioClipFormComponent', () => {
  let component: AudioClipFormComponent;
  let fixture: ComponentFixture<AudioClipFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AudioClipFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudioClipFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
