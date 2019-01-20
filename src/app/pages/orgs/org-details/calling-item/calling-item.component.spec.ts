import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallingItemComponent } from './calling-item.component';

describe('CallingItemComponent', () => {
  let component: CallingItemComponent;
  let fixture: ComponentFixture<CallingItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallingItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
