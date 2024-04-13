import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeWidgetComponent } from './employee-widget.component';

describe('EmployeeWidgetComponent', () => {
  let component: EmployeeWidgetComponent;
  let fixture: ComponentFixture<EmployeeWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeWidgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
