import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyDocComponent } from './verify-doc.component';

describe('VerifyDocComponent', () => {
  let component: VerifyDocComponent;
  let fixture: ComponentFixture<VerifyDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ VerifyDocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
