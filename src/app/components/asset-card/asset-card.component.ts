import { Component, Input, Output } from '@angular/core';
import { Asset } from '../../Models/asset';

@Component({
  selector: 'app-asset-card',
  templateUrl: './asset-card.component.html',
  styleUrl: './asset-card.component.scss'
})
export class AssetCardComponent {
  @Input("id") id!:number | undefined;
  @Input("name") name!:string | undefined;
  @Input("model") model!:string | undefined;
  @Input("year") year!:string | undefined;
  @Input("imgUrl") imgUrl!:string | undefined;

  public asset!:Asset;
  public toggleSideBar:boolean = true;

  constructor(){
  }

  public viewAssetInfo() {
    this.toggleSideBar = !this.toggleSideBar;
  }

  @Output("isToggled") isToggled:boolean = this.toggleSideBar;
}
