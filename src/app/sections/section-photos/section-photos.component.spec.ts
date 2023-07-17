import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionPhotosComponent } from './section-photos.component';

describe('SectionPhotosComponent', () => {
  let component: SectionPhotosComponent;
  let fixture: ComponentFixture<SectionPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SectionPhotosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
