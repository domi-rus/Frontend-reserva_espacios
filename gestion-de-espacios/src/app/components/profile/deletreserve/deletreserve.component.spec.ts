import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletreserveComponent } from './deletreserve.component';

describe('DeletreserveComponent', () => {
  let component: DeletreserveComponent;
  let fixture: ComponentFixture<DeletreserveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletreserveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletreserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
