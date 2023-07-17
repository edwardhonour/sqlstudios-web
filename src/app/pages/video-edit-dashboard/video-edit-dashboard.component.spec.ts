import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoEditDashboardComponent } from './video-edit-dashboard.component';

describe('VideoEditDashboardComponent', () => {
  let component: VideoEditDashboardComponent;
  let fixture: ComponentFixture<VideoEditDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ VideoEditDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoEditDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
