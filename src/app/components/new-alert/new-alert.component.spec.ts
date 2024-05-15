import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAlertComponent } from './new-alert.component';

describe('NewAlertComponent', () => {
  let component: NewAlertComponent;
  let fixture: ComponentFixture<NewAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewAlertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
