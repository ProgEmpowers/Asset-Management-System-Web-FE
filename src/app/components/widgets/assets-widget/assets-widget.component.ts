import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-assets-widget',
  templateUrl: './assets-widget.component.html',
  styleUrl: './assets-widget.component.scss'
})
export class AssetsWidgetComponent{

  @Input("totalCount") total:number = 0;
  @Input("availableCount") available:number = 0;
  @Input("inUseCount") inUse:number = 0;

  constructor(){
  }

}
