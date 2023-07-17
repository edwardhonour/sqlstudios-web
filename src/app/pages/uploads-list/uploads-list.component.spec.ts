import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadsListComponent } from './uploads-list.component';

describe('UploadsListComponent', () => {
  let component: UploadsListComponent;
  let fixture: ComponentFixture<UploadsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ UploadsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
