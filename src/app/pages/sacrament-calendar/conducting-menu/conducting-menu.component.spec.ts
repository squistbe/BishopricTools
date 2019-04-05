import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConductingMenuPage } from './conducting-menu.page';

describe('ConductingMenuPage', () => {
  let component: ConductingMenuPage;
  let fixture: ComponentFixture<ConductingMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConductingMenuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConductingMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
