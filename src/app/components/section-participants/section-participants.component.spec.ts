import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionParticipantsComponent } from './section-participants.component';

describe('SectionParticipantsComponent', () => {
  let component: SectionParticipantsComponent;
  let fixture: ComponentFixture<SectionParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SectionParticipantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
