import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SacramentCalendarPage } from './sacrament-calendar.page';

describe('SacramentCalendarPage', () => {
  let component: SacramentCalendarPage;
  let fixture: ComponentFixture<SacramentCalendarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SacramentCalendarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SacramentCalendarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
