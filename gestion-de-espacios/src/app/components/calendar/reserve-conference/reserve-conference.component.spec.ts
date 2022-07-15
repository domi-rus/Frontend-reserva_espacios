import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveConferenceComponent } from './reserve-conference.component';

describe('ReserveConferenceComponent', () => {
  let component: ReserveConferenceComponent;
  let fixture: ComponentFixture<ReserveConferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReserveConferenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveConferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
