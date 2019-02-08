import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConductingPage } from './conducting.page';

describe('ConductingPage', () => {
  let component: ConductingPage;
  let fixture: ComponentFixture<ConductingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConductingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConductingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
