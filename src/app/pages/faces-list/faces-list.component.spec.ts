import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacesListComponent } from './faces-list.component';

describe('FacesListComponent', () => {
  let component: FacesListComponent;
  let fixture: ComponentFixture<FacesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FacesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
