import { Component, Input, OnInit } from '@angular/core';
import { Asset } from '../../Models/asset';
import { AssetStockService } from '../../services/asset-stock.service';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrl: './asset-list.component.scss'
})
export class AssetListComponent implements OnInit{

  @Input('assetList') assetList!:Asset[];
  public page = 1;
  public pageSize = 6;
  public collectionSize = 0;

  constructor(private assetService:AssetStockService){

  }
  ngOnInit(): void {
    this.collectionSize = this.assetList.length;
  }

}
