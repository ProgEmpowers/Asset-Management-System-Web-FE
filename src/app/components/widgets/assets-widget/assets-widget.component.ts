import { Component, OnInit } from '@angular/core';
import { WidgetService } from '../widget.service';

@Component({
  selector: 'app-assets-widget',
  templateUrl: './assets-widget.component.html',
  styleUrl: './assets-widget.component.scss'
})
export class AssetsWidgetComponent implements OnInit{

  public total!:number;
  public available!:number;
  public inUse!:number;

  constructor(){

  }

  ngOnInit(): void {
    this.total = 10;
    this.available = 5;
    this.inUse = 4;
  }
}
