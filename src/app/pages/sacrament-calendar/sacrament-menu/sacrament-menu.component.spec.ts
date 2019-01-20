import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SacramentMenuComponent } from './sacrament-menu.component';

describe('SacramentMenuComponent', () => {
  let component: SacramentMenuComponent;
  let fixture: ComponentFixture<SacramentMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SacramentMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SacramentMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
