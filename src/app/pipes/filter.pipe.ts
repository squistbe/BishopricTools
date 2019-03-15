import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, key?: string, items?: any[], returnProp?: string): any {
    if (!value) {
      return;
    }
    if (!items || !key || !returnProp) {
      return value;
    }
    return items.find(item => item[key] === value)[returnProp];
  }

}
