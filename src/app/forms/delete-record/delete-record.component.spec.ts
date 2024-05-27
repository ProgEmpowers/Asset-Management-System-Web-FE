import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRecordComponent } from './delete-record.component';

describe('DeleteRecordComponent', () => {
  let component: DeleteRecordComponent;
  let fixture: ComponentFixture<DeleteRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteRecordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
