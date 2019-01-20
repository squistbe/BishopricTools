import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallingFormComponent } from './calling-form.component';

describe('CallingFormComponent', () => {
  let component: CallingFormComponent;
  let fixture: ComponentFixture<CallingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
