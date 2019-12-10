import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimbursementListPage } from './reimbursement-list.page';

describe('ReimbursementListPage', () => {
  let component: ReimbursementListPage;
  let fixture: ComponentFixture<ReimbursementListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReimbursementListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimbursementListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
