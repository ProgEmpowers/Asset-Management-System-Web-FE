import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-employee-widget',
  templateUrl: './employee-widget.component.html',
  styleUrl: './employee-widget.component.scss'
})
export class EmployeeWidgetComponent {

  
  @Input ("EmployeeTotalCount") total:number = 0;
  @Input ("availableCount") available:number = 0;
  @Input ("inUseCount") inUse:number = 0;

}
