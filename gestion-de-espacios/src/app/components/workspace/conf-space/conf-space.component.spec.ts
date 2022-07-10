import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfSpaceComponent } from './conf-space.component';

describe('ConfSpaceComponent', () => {
  let component: ConfSpaceComponent;
  let fixture: ComponentFixture<ConfSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfSpaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
