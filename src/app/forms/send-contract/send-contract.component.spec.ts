import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendContractComponent } from './send-contract.component';

describe('SendContractComponent', () => {
  let component: SendContractComponent;
  let fixture: ComponentFixture<SendContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SendContractComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SendContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
