import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitebarWrapperComponent } from './sitebar-wrapper.component';

describe('SitebarWrapperComponent', () => {
  let component: SitebarWrapperComponent;
  let fixture: ComponentFixture<SitebarWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SitebarWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SitebarWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
