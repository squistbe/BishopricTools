import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SacramentAttendancePage } from './sacrament-attendance.page';

describe('SacramentAttendancePage', () => {
  let component: SacramentAttendancePage;
  let fixture: ComponentFixture<SacramentAttendancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SacramentAttendancePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SacramentAttendancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
