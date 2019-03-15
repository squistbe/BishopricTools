import { Pipe, PipeTransform } from '@angular/core';
import { Platform } from '@ionic/angular';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {
  constructor(private platform: Platform) {}

  transform(name: any, args?: any): any {
    let initials = name.match(/\b\w/g) || [];
    initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    return initials;
  }

}
