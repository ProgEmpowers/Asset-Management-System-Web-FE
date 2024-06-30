import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterText: string) {
    filterText = filterText.toLowerCase();
    if (value.length == 0 || filterText == "") {
      return value;
    }
    const result = [];
    for(const item of value) {
      if (item['name'].toLowerCase().includes(filterText) || item['assetType'].toLowerCase().includes(filterText) ||
      item['description'].toLowerCase().includes(filterText)
    ) {
        result.push(item);
      }
    }

    return result;
  }

}
