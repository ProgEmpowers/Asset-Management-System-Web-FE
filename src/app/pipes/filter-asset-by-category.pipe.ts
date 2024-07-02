import { Pipe, PipeTransform } from '@angular/core';
import { Asset } from '../Models/asset';

@Pipe({
  name: 'filterAssetByCategory'
})
export class FilterAssetByCategoryPipe implements PipeTransform {

  transform(value: Asset[], category: string) {

    if (value == undefined) {
      return value;
    }

    if (value.length == 0 || category=="") {
      return value;
    }

    let result = [];
    for(let item of value) {
      if (item.assetType == category) {
        result.push(item);
      }
    }

    return result;
  }

}
