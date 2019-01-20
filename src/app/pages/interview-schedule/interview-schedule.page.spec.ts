import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewSchedulePage } from './interview-schedule.page';

describe('InterviewSchedulePage', () => {
  let component: InterviewSchedulePage;
  let fixture: ComponentFixture<InterviewSchedulePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewSchedulePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewSchedulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
