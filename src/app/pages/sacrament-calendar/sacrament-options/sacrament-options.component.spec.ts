import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SacramentOptionsComponent } from './sacrament-options.component';

describe('SacramentOptionsComponent', () => {
  let component: SacramentOptionsComponent;
  let fixture: ComponentFixture<SacramentOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SacramentOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SacramentOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
