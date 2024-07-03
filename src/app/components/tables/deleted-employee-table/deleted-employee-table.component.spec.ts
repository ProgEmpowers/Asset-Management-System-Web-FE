import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedEmployeeTableComponent } from './deleted-employee-table.component';

describe('DeletedEmployeeTableComponent', () => {
  let component: DeletedEmployeeTableComponent;
  let fixture: ComponentFixture<DeletedEmployeeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeletedEmployeeTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeletedEmployeeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
