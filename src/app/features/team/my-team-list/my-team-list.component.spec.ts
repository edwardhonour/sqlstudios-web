import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTeamListComponent } from './my-team-list.component';

describe('MyTeamListComponent', () => {
  let component: MyTeamListComponent;
  let fixture: ComponentFixture<MyTeamListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MyTeamListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyTeamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
