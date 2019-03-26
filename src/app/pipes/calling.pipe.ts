import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calling'
})
export class CallingPipe implements PipeTransform {

  transform(items: any[], searchText: string): any {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      let givenNames = '';
      let familyName = '';
      if (it.member) {
        givenNames = it.member.givenNames;
        familyName = it.member.familyName;
      }
      return it.name.toLowerCase().includes(searchText) || givenNames.toLowerCase().includes(searchText) || familyName.toLowerCase().includes(searchText);
    });
  }

}
