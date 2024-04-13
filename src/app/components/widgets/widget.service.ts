import { Injectable } from '@angular/core';
import { Asset } from '../../Models/asset';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {

  public assetList:Asset[] = [
    {
      assetName: "13-inch MacBook Air with M1 chip",
      id: 4718050302178,
      year: "2018",
      assetType: "Apple MacBook Air",
      imageUrl: "assets/Laptop.png",
      status: "Operational",
      createdOn: "Sun May 24 2020 19:16:23"
    },
    {
      assetName: "Keyboard English Standard QWERTY",
      id: 2018050302178,
      assetType: "Apple MacBook Air",
      imageUrl: "assets/keyboard.png",
      status: "Not operational",
      createdOn: "Sun May 24 2020 19:16:23"
    },
    {
      assetName: "13-inch MacBook Air with M1 chip",
      id: 5008050302178,
      assetType: "Apple MacBook Air",
      imageUrl: "assets/Laptop.png",
      status: "Operational",
      createdOn: "Sun May 24 2020 19:16:23"
    },
    {
      assetName: "Keyboard English Standard QWERTY",
      id: 6008050302178,
      assetType: "Apple MacBook Air",
      imageUrl: "assets/keyboard.png",
      status: "Operational",
      createdOn: "Sun May 24 2020 19:16:23"
    },
    {
      assetName: "Keyboard English Standard QWERTY",
      id: 6008050302178,
      assetType: "Apple MacBook Air",
      imageUrl: "assets/keyboard.png",
      status: "Not operational",
      createdOn: "Sun May 24 2020 19:16:23"
    }
    ,
    {
      assetName: "13-inch MacBook Air with M1 chip",
      id: 6008050302178,
      assetType: "Apple MacBook Air",
      imageUrl: "assets/Laptop.png",
      status: "Operational",
      createdOn: "Sun May 24 2020 19:16:23"
    }
    ,
    {
      assetName: "Keyboard English Standard QWERTY",
      id: 6008050302178,
      assetType: "Apple MacBook Air",
      imageUrl: "assets/keyboard.png",
      status: "Operational",
      createdOn: "Sun May 24 2020 19:16:23"
    }
  ];

  constructor() { }



  public getTotalNoOfAssets(): number {
    return this.assetList.length;
  }

  public getAllAssets(): Asset[] {
    return this.assetList;
  }

  public getAssetById(id:number): Asset | undefined {
    for (let index = 0; index < this.assetList.length; index++) {
      const element = this.assetList[index];
      if(element.id == id) {
        return element;
      }
    }
    return undefined;
  }

}
