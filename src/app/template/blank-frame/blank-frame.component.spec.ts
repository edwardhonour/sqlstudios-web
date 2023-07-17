import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankFrameComponent } from './blank-frame.component';

describe('BlankFrameComponent', () => {
  let component: BlankFrameComponent;
  let fixture: ComponentFixture<BlankFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ BlankFrameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlankFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
