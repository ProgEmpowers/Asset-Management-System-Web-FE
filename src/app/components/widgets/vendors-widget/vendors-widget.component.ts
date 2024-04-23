import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-vendors-widget',
  templateUrl: './vendors-widget.component.html',
  styleUrl: './vendors-widget.component.scss'
})
export class VendorsWidgetComponent {

  @Input ("vTotalCount") total:number = 0;
  @Input ("availableCount") available:number = 0;
  @Input ("inUseCount") inUse:number = 0;

  constructor(){
  }

}
