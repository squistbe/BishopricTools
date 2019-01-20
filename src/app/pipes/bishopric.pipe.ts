import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bishopric'
})
export class BishopricPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }

    return items.filter(it => {
      return it.calling && it.calling.startsWith('bishopric');
    });
   }

}
