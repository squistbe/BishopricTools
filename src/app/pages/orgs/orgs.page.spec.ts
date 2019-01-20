import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgsPage } from './orgs.page';

describe('OrgsPage', () => {
  let component: OrgsPage;
  let fixture: ComponentFixture<OrgsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
