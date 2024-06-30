import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntlTelInputModuleComponent } from './intl-tel-input-module.component';

describe('IntlTelInputModuleComponent', () => {
  let component: IntlTelInputModuleComponent;
  let fixture: ComponentFixture<IntlTelInputModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IntlTelInputModuleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntlTelInputModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
