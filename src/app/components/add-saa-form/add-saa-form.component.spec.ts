import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSaaFormComponent } from './add-saa-form.component';

describe('AddSaaFormComponent', () => {
  let component: AddSaaFormComponent;
  let fixture: ComponentFixture<AddSaaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AddSaaFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSaaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
