import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrgListComponent } from './admin-org-list.component';

describe('AdminOrgListComponent', () => {
  let component: AdminOrgListComponent;
  let fixture: ComponentFixture<AdminOrgListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AdminOrgListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminOrgListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
