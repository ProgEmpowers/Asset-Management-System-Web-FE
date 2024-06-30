import { Pipe, PipeTransform } from '@angular/core';
import { Asset } from '../Models/asset';
import { AssetStatusEnum } from '../Models/AssetStatusEnum';

@Pipe({
  name: 'filterAssetByStatus',
})
export class FilterAssetByStatusPipe implements PipeTransform {
  transform(value: Asset[], status: string) {
    if (value.length == 0 || status == "") {
      return value;
    }
    const result = [];
    for (let item of value) {
      if (item.assetStatus == this.getStatus(status)) {
        result.push(item);
      }
    }

    return result;
  }

  getStatus(status: string) {
    switch (status) {
      case '1':
        return 1;
      case '2':
        return 2;
      case '3':
        return 3;
      case '4':
        return 4;
      case '5':
        return 5;
      default:
        return;
    }
  }
}
