import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrimTestComponent } from './trim-test.component';

describe('TrimTestComponent', () => {
  let component: TrimTestComponent;
  let fixture: ComponentFixture<TrimTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TrimTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrimTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
