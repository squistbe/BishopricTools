import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgOptionsComponent } from './org-options.component';

describe('OrgOptionsComponent', () => {
  let component: OrgOptionsComponent;
  let fixture: ComponentFixture<OrgOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
