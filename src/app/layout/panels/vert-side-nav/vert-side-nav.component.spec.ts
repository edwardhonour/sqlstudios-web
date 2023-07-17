import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VertSideNavComponent } from './vert-side-nav.component';

describe('VertSideNavComponent', () => {
  let component: VertSideNavComponent;
  let fixture: ComponentFixture<VertSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ VertSideNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VertSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
