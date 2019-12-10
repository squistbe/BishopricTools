import { Pipe, PipeTransform } from '@angular/core';
import sortBy from 'lodash/sortBy';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(array: Array<any>, args?: any): any {
    return sortBy(array, [args]);
  }

}
