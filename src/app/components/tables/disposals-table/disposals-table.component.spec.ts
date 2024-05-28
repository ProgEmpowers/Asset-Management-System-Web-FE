import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisposalsTableComponent } from './disposals-table.component';

describe('DisposalsTableComponent', () => {
  let component: DisposalsTableComponent;
  let fixture: ComponentFixture<DisposalsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisposalsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisposalsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
