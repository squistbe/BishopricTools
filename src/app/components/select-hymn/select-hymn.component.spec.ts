import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectHymnComponent } from './select-hymn.component';

describe('SelectHymnComponent', () => {
  let component: SelectHymnComponent;
  let fixture: ComponentFixture<SelectHymnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectHymnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectHymnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
