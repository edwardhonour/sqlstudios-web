import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaaListComponent } from './saa-list.component';

describe('SaaListComponent', () => {
  let component: SaaListComponent;
  let fixture: ComponentFixture<SaaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SaaListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
