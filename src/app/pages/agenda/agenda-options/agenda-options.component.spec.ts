import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaOptionsComponent } from './agenda-options.component';

describe('AgendaOptionsComponent', () => {
  let component: AgendaOptionsComponent;
  let fixture: ComponentFixture<AgendaOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendaOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
